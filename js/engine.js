function buildGraph() {
  var graph = {};

  // Add all stations
  for (var lineKey in LINES) {
    var sts = LINES[lineKey].stations;
    for (var i = 0; i < sts.length; i++) {
      if (!graph[sts[i]]) graph[sts[i]] = [];
    }
  }

  // Connect stations within each line
  for (var lineKey in LINES) {
    var sts = LINES[lineKey].stations;
    for (var i = 0; i < sts.length; i++) {
      if (i > 0) {
        var a = sts[i - 1];
        var b = sts[i];
        graph[a].push({ to: b, line: lineKey, cost: 1 });
        graph[b].push({ to: a, line: lineKey, cost: 1 });
      }
    }
  }

  // Connect interchange stations across lines
  for (var station in INTERCHANGES) {
    var linesList = INTERCHANGES[station];
    if (!graph[station]) graph[station] = [];
    for (var i = 0; i < linesList.length; i++) {
      for (var j = 0; j < linesList.length; j++) {
        if (i !== j) {
          graph[station].push({ to: station, line: linesList[j], cost: 0 });
        }
      }
    }
  }

  return graph;
}

function dijkstra(graph, from, to) {
  if (!graph[from] || !graph[to]) return null;

  var dist = {};
  var prev = {};
  var visited = {};

  for (var n in graph) dist[n] = Infinity;
  dist[from] = 0;

  var nodes = Object.keys(graph);

  for (var iter = 0; iter < nodes.length; iter++) {
    // Find unvisited node with smallest distance
    var u = null;
    var minD = Infinity;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!visited[node] && dist[node] < minD) {
        minD = dist[node];
        u = node;
      }
    }

    if (u === null) break;
    if (u === to) break;
    visited[u] = true;

    var neighbors = graph[u] || [];
    for (var i = 0; i < neighbors.length; i++) {
      var nb = neighbors[i];
      var alt = dist[u] + nb.cost;
      if (alt < dist[nb.to]) {
        dist[nb.to] = alt;
        prev[nb.to] = { from: u, line: nb.line };
      }
    }
  }

  if (dist[to] === Infinity) return null;

  // Rebuild path
  var path = [];
  var cur = to;
  var safety = 0;
  while (cur && safety < 500) {
    path.unshift(cur);
    if (prev[cur]) {
      cur = prev[cur].from;
    } else {
      break;
    }
    safety++;
  }

  return { path: path, dist: dist[to] };
}

function getLineForSegment(a, b) {
  for (var lk in LINES) {
    var sts = LINES[lk].stations;
    var ai = sts.indexOf(a);
    var bi = sts.indexOf(b);
    if (ai !== -1 && bi !== -1 && Math.abs(ai - bi) === 1) return lk;
  }
  return null;
}

function buildSegments(path) {
  if (!path || path.length < 2) return [];

  var segs = [];
  var curLine = null;
  var segStart = 0;

  // Find first valid line
  for (var i = 1; i < path.length; i++) {
    var line = getLineForSegment(path[i - 1], path[i]);
    if (line !== null) {
      if (curLine === null) {
        curLine = line;
        segStart = i - 1;
      } else if (line !== curLine) {
        segs.push({ line: curLine, stations: path.slice(segStart, i) });
        curLine = line;
        segStart = i - 1;
      }
    }
  }

  // Push last segment
  if (curLine !== null) {
    segs.push({ line: curLine, stations: path.slice(segStart) });
  }

  // Fallback - if no segments found try direct
  if (segs.length === 0 && path.length >= 2) {
    var fallbackLine = null;
    for (var lk in LINES) {
      if (LINES[lk].stations.indexOf(path[0]) !== -1 && LINES[lk].stations.indexOf(path[path.length - 1]) !== -1) {
        fallbackLine = lk;
        break;
      }
    }
    if (fallbackLine) {
      segs.push({ line: fallbackLine, stations: path });
    }
  }

  return segs;
}

function getCrowdLevel() {
  var now = new Date();
  var hour = now.getHours();
  var isWeekend = now.getDay() === 0 || now.getDay() === 6;
  return { level: CROWD_SCHEDULE[isWeekend ? 'weekend' : 'weekday'][hour], hour: hour, isWeekend: isWeekend };
}

function generateAITips(segments, path, fromStation, toStation) {
  var tips = [];
  var interchangeCount = segments.length - 1;
  var totalStops = path.length - 1;
  var crowd = getCrowdLevel();
  var isRRTS = false, isAirport = false, isMagenta = false, isMeerut = false;

  for (var i = 0; i < segments.length; i++) {
    if (segments[i].line === 'RRTS') isRRTS = true;
    if (segments[i].line === 'Orange') isAirport = true;
    if (segments[i].line === 'Magenta') isMagenta = true;
    if (segments[i].line === 'MeerutMetro') isMeerut = true;
  }

  var totalMins = Math.round(totalStops * 2.5 + interchangeCount * 5);
  var fareObj = calculateFare(totalStops);

  if (interchangeCount === 0) {
    tips.push({ icon: '✅', color: 'success', text: 'Direct journey on <strong>' + LINES[segments[0].line].name + '</strong> — no interchange needed!' });
  } else {
    var changePoints = [];
    for (var i = 0; i < segments.length - 1; i++) {
      var seg = segments[i];
      changePoints.push('<strong>' + seg.stations[seg.stations.length - 1] + '</strong>');
    }
    tips.push({ icon: '🔄', color: 'info', text: 'Change trains ' + interchangeCount + ' time' + (interchangeCount > 1 ? 's' : '') + ' at: ' + changePoints.join(', ') + '. Follow overhead signs.' });
  }

  tips.push({ icon: '⏱', color: 'warning', text: 'Estimated travel time: <strong>~' + totalMins + ' minutes</strong>. Add 5-10 min for waiting. Total budget: ~' + (totalMins + 10) + ' min.' });
  tips.push({ icon: '💰', color: 'success', text: 'Token fare: <strong>₹' + fareObj.token + '</strong> &nbsp;|&nbsp; Smart Card: <strong>₹' + fareObj.smart + '</strong> (10% off) &nbsp;|&nbsp; Distance: ~' + fareObj.km + ' km.' });

  var crowdLevel = CROWD_SCHEDULE[crowd.isWeekend ? 'weekend' : 'weekday'][crowd.hour];
  if (crowdLevel >= 3) {
    tips.push({ icon: '🚨', color: 'danger', text: '<strong>High crowd right now!</strong> Peak hour. Board from first or last coach for less rush.' });
  } else if (crowdLevel >= 2) {
    tips.push({ icon: '🟠', color: 'warning', text: 'Moderate crowd expected. Keep belongings close. Ladies coaches at both ends of train.' });
  } else {
    tips.push({ icon: '🟢', color: 'success', text: 'Good time to travel — low crowd expected. Trains are comfortable right now.' });
  }

  if (isAirport) {
    tips.push({ icon: '✈️', color: 'info', text: 'Airport Express needs a <strong>separate token or card</strong>. Fare ~₹60. Runs every 10-15 min.' });
  }
  if (isRRTS) {
    tips.push({ icon: '🚄', color: 'info', text: 'Namo Bharat RRTS needs a <strong>separate RRTS Card</strong>. Speed ~100 km/h. Board at Anand Vihar ISBT.' });
  }
  if (isMeerut) {
    tips.push({ icon: '🚇', color: 'info', text: 'Meerut Metro runs on same RRTS tracks from Meerut South to Modipuram. Opened 22 February 2026.' });
  }
  if (isMagenta) {
    tips.push({ icon: '🛫', color: 'info', text: 'Magenta Line connects to Terminal 1 IGI Airport (domestic). Terminal 3 is on Airport Express Orange Line.' });
  }

  var hindiFrom = HINDI_NAMES[fromStation];
  var hindiTo = HINDI_NAMES[toStation];
  if (hindiFrom || hindiTo) {
    tips.push({ icon: '🇮🇳', color: 'warning', text: 'Hindi names — From: <strong>' + (hindiFrom || fromStation) + '</strong> → To: <strong>' + (hindiTo || toStation) + '</strong>. Show this to anyone for directions.' });
  }

  tips.push({ icon: '♿', color: 'info', text: 'All stations have <strong>lifts and ramps</strong>. Press Help button near gate for assistance.' });
  tips.push({ icon: '🛡', color: 'success', text: 'Emergency helpline: <strong>155370</strong>. Save this number before you travel!' });

  return tips;
}