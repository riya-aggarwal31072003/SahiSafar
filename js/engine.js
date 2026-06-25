// ============================================================
// SahiSafar — Smart Route Engine
// Dijkstra with interchange penalty for shortest real journey
// ============================================================

function buildGraph() {
  var graph = {};

  // Step 1 — Add all stations
  for (var lineKey in LINES) {
    var sts = LINES[lineKey].stations;
    for (var i = 0; i < sts.length; i++) {
      if (!graph[sts[i]]) graph[sts[i]] = [];
    }
  }

  // Step 2 — Connect stations within each line
  // cost = 1 per stop (about 2.5 min each)
  for (var lineKey in LINES) {
    var sts = LINES[lineKey].stations;
    for (var i = 0; i < sts.length; i++) {
      if (i > 0) {
        var a = sts[i-1], b = sts[i];
        graph[a].push({to:b, line:lineKey, cost:1});
        graph[b].push({to:a, line:lineKey, cost:1});
      }
    }
  }

  // Step 3 — Connect interchange stations across lines
  // cost = 5 per interchange (penalty = ~5 stops worth)
  // This forces algorithm to PREFER fewer interchanges naturally
  for (var station in INTERCHANGES) {
    var linesList = INTERCHANGES[station];
    if (!graph[station]) graph[station] = [];
    for (var i = 0; i < linesList.length; i++) {
      for (var j = 0; j < linesList.length; j++) {
        if (i !== j) {
          graph[station].push({to:station, line:linesList[j], cost:5});
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
    var u = null, minD = Infinity;
    for (var i = 0; i < nodes.length; i++) {
      if (!visited[nodes[i]] && dist[nodes[i]] < minD) {
        minD = dist[nodes[i]];
        u = nodes[i];
      }
    }
    if (u === null || u === to) break;
    visited[u] = true;

    var neighbors = graph[u] || [];
    for (var i = 0; i < neighbors.length; i++) {
      var nb = neighbors[i];
      var alt = dist[u] + nb.cost;
      if (alt < dist[nb.to]) {
        dist[nb.to] = alt;
        prev[nb.to] = {from:u, line:nb.line};
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
    cur = prev[cur] ? prev[cur].from : null;
    safety++;
  }

  return {path:path, dist:dist[to]};
}

function getLineForSegment(a, b) {
  for (var lk in LINES) {
    var sts = LINES[lk].stations;
    var ai = sts.indexOf(a), bi = sts.indexOf(b);
    if (ai !== -1 && bi !== -1 && Math.abs(ai-bi) === 1) return lk;
  }
  return null;
}

function buildSegments(path) {
  if (!path || path.length < 2) return [];

  var segs = [];
  var curLine = null;
  var segStart = 0;

  for (var i = 1; i < path.length; i++) {
    var line = getLineForSegment(path[i-1], path[i]);
    if (line !== null) {
      if (curLine === null) {
        curLine = line;
        segStart = i-1;
      } else if (line !== curLine) {
        segs.push({line:curLine, stations:path.slice(segStart, i)});
        curLine = line;
        segStart = i-1;
      }
    }
  }

  if (curLine !== null) {
    segs.push({line:curLine, stations:path.slice(segStart)});
  }

  // Fallback
  if (segs.length === 0 && path.length >= 2) {
    for (var lk in LINES) {
      if (LINES[lk].stations.indexOf(path[0]) !== -1 &&
          LINES[lk].stations.indexOf(path[path.length-1]) !== -1) {
        segs.push({line:lk, stations:path});
        break;
      }
    }
  }

  return segs;
}

function getCrowdLevel() {
  var now = new Date();
  var hour = now.getHours();
  var isWeekend = now.getDay() === 0 || now.getDay() === 6;
  return {
    level: CROWD_SCHEDULE[isWeekend?'weekend':'weekday'][hour],
    hour: hour,
    isWeekend: isWeekend
  };
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

  // Total fare across all segments
  var totalFare = 0;
  var fareBreakdown = [];
  for (var fi = 0; fi < segments.length; fi++) {
    var sf = calculateFare(segments[fi].stations.length - 1, segments[fi].line);
    totalFare += sf.fare;
    fareBreakdown.push(LINES[segments[fi].line].shortName + ' ₹' + sf.fare);
  }

  // Journey summary tip
  if (interchangeCount === 0) {
    tips.push({icon:'✅', color:'success',
      text:'Direct journey on <strong>' + LINES[segments[0].line].name + '</strong> — no interchange needed! Sit back and relax.'});
  } else {
    var changePoints = [];
    for (var i = 0; i < segments.length-1; i++) {
      var seg = segments[i];
      changePoints.push('<strong>' + seg.stations[seg.stations.length-1] + '</strong>');
    }
    tips.push({icon:'🔄', color:'info',
      text:'Change trains ' + interchangeCount + ' time' + (interchangeCount>1?'s':'') + ' at: ' + changePoints.join(', ') + '. Follow the overhead signs on platform for the connecting line.'});
  }

  // Time tip
  tips.push({icon:'⏱', color:'warning',
    text:'Estimated travel time: <strong>~' + totalMins + ' minutes</strong>. Add 5-10 min for waiting on platform. Total budget: ~' + (totalMins+10) + ' min.'});

  // Fare tip
  if (fareBreakdown.length > 1) {
    tips.push({icon:'💰', color:'success',
      text:'Total fare: <strong>₹' + totalFare + '</strong> (' + fareBreakdown.join(' + ') + '). Buy separate tickets at each network counter.'});
  } else {
    tips.push({icon:'💰', color:'success',
      text:'Approximate fare: <strong>₹' + totalFare + '</strong>. Buy at station counter, TVM machine, or use DMRC/RRTS app.'});
  }

  // Crowd tip
  var crowdLevel = CROWD_SCHEDULE[crowd.isWeekend?'weekend':'weekday'][crowd.hour];
  if (crowdLevel >= 3) {
    tips.push({icon:'🚨', color:'danger',
      text:'<strong>Very crowded right now!</strong> Peak hour traffic. Board from the first or last coach for less rush. Consider delaying 20-30 min if not urgent.'});
  } else if (crowdLevel >= 2) {
    tips.push({icon:'🟠', color:'warning',
      text:'Moderate crowd expected. Keep belongings close. Ladies coaches are at both ends of every train.'});
  } else {
    tips.push({icon:'🟢', color:'success',
      text:'Great time to travel — low crowd expected. Trains are comfortable right now!'});
  }

  // Special line tips
  if (isAirport) {
    tips.push({icon:'✈️', color:'info',
      text:'Airport Express (Orange Line) has <strong>separate ticketing</strong>. Fare ~₹60 full route. Runs every 10-15 min. Fastest way to airport from New Delhi in 20 min.'});
  }
  if (isRRTS) {
    tips.push({icon:'🚄', color:'info',
      text:'Namo Bharat RRTS has <strong>separate RRTS Card or QR ticket</strong>. Speed ~100 km/h — much faster than metro! Min fare ₹20, max ₹210. Buy at RRTS counter or RapidX Connect app.'});
  }
  if (isMeerut) {
    tips.push({icon:'🚇', color:'info',
      text:'Meerut Metro connects Meerut South to Modipuram. Opened 22 Feb 2026. Interchange with RRTS at Meerut South, Shatabdi Nagar, Begumpul and Modipuram stations.'});
  }
  if (isMagenta) {
    tips.push({icon:'🛫', color:'info',
      text:'Magenta Line serves <strong>Terminal 1 IGI Airport</strong> (domestic flights). For Terminal 3 international use Airport Express Orange Line from New Delhi station.'});
  }

  // Hindi names
  var hindiFrom = HINDI_NAMES[fromStation];
  var hindiTo = HINDI_NAMES[toStation];
  if (hindiFrom || hindiTo) {
    tips.push({icon:'🇮🇳', color:'warning',
      text:'Hindi station names — From: <strong>' + (hindiFrom||fromStation) + '</strong> → To: <strong>' + (hindiTo||toStation) + '</strong>. Show this to anyone on the street for directions.'});
  }

  // Safety tips
  tips.push({icon:'♿', color:'info',
    text:'All stations have <strong>lifts and ramps</strong>. Press the Help button near the entry gate for assistance. Priority seating available in every coach.'});
  tips.push({icon:'🛡', color:'success',
    text:'Emergency helpline: <strong>155370</strong> (DMRC) | <strong>1800-180-0188</strong> (RRTS). Save these numbers before you travel!'});

  return tips;
}