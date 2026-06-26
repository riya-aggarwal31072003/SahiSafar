// ============================================================
// SahiSafar — Line-Aware Dijkstra Engine
// State = (station, currentLine) to find true shortest path
// ============================================================

function buildGraph() {
  var graph = {};

  for (var lineKey in LINES) {
    var sts = LINES[lineKey].stations;
    for (var i = 0; i < sts.length; i++) {
      if (!graph[sts[i]]) graph[sts[i]] = [];
    }
  }

  // Connect stations within each line cost=1
  for (var lineKey in LINES) {
    var sts = LINES[lineKey].stations;
    for (var i = 0; i < sts.length; i++) {
      if (i > 0) {
        var a = sts[i-1], b = sts[i];
        graph[a].push({to:b, line:lineKey, cost:1, type:'ride'});
        graph[b].push({to:a, line:lineKey, cost:1, type:'ride'});
      }
    }
  }

  // Connect interchange stations cost=4 (penalty for changing)
  for (var station in INTERCHANGES) {
    var linesList = INTERCHANGES[station];
    if (!graph[station]) graph[station] = [];
    for (var i = 0; i < linesList.length; i++) {
      for (var j = 0; j < linesList.length; j++) {
        if (i !== j) {
          graph[station].push({to:station, line:linesList[j], cost:4, type:'change', fromLine:linesList[i]});
        }
      }
    }
  }

  return graph;
}

function dijkstra(graph, from, to) {
  if (!graph[from] || !graph[to]) return null;

  // State-based Dijkstra: node = station+line combination
  // This ensures we track which line we are on at every step
  var dist = {};
  var prev = {};
  var visited = {};

  // Initialize all station+line states
  for (var st in graph) {
    dist[st + '|ANY'] = Infinity;
    for (var lk in LINES) {
      dist[st + '|' + lk] = Infinity;
    }
  }

  dist[from + '|ANY'] = 0;

  // Priority queue simulation using array
  var queue = [{node: from + '|ANY', station: from, line: 'ANY', cost: 0}];

  var iterations = 0;
  while (queue.length > 0 && iterations < 50000) {
    iterations++;

    // Find minimum cost node
    var minIdx = 0;
    for (var i = 1; i < queue.length; i++) {
      if (queue[i].cost < queue[minIdx].cost) minIdx = i;
    }
    var current = queue[minIdx];
    queue.splice(minIdx, 1);

    var stateKey = current.station + '|' + current.line;
    if (visited[stateKey]) continue;
    visited[stateKey] = true;

    if (current.station === to) break;

    var neighbors = graph[current.station] || [];
    for (var i = 0; i < neighbors.length; i++) {
      var nb = neighbors[i];

      // Skip change edges if we are already on correct line
      if (nb.type === 'change') {
        // Only allow change if current line matches fromLine or ANY
        if (current.line !== 'ANY' && current.line !== nb.fromLine) continue;
      }

      var newLine = nb.line;
      var newCost = current.cost + nb.cost;
      var newKey = nb.to + '|' + newLine;

      if (newCost < (dist[newKey] || Infinity)) {
        dist[newKey] = newCost;
        prev[newKey] = {station: current.station, line: current.line, stateKey: stateKey};
        queue.push({node: newKey, station: nb.to, line: newLine, cost: newCost});
      }
    }
  }

  // Find best arrival state at destination
  var bestCost = Infinity;
  var bestKey = null;
  for (var lk in LINES) {
    var k = to + '|' + lk;
    if ((dist[k] || Infinity) < bestCost) {
      bestCost = dist[k] || Infinity;
      bestKey = k;
    }
  }
  if (to + '|ANY' < bestCost) {
    bestKey = to + '|ANY';
    bestCost = dist[to + '|ANY'] || Infinity;
  }

  if (bestCost === Infinity || !bestKey) return null;

  // Rebuild path from states
  var path = [];
  var curKey = bestKey;
  var safety = 0;
  while (curKey && safety < 1000) {
    var parts = curKey.split('|');
    path.unshift(parts[0]);
    var p = prev[curKey];
    if (!p) break;
    curKey = p.stateKey;
    safety++;
  }

  // Remove duplicate consecutive stations
  var cleanPath = [path[0]];
  for (var i = 1; i < path.length; i++) {
    if (path[i] !== cleanPath[cleanPath.length-1]) {
      cleanPath.push(path[i]);
    }
  }

  return {path: cleanPath, dist: bestCost};
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

  // Total fare
  var totalFare = 0;
  var fareBreakdown = [];
  for (var fi = 0; fi < segments.length; fi++) {
    var sf = calculateFare(segments[fi].stations.length - 1, segments[fi].line);
    totalFare += sf.fare;
    fareBreakdown.push(LINES[segments[fi].line].shortName + ' ₹' + sf.fare);
  }

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
      text:'Change trains ' + interchangeCount + ' time' + (interchangeCount>1?'s':'') + ' at: ' + changePoints.join(', ') + '. Follow the overhead signs on platform.'});
  }

  tips.push({icon:'⏱', color:'warning',
    text:'Estimated travel time: <strong>~' + totalMins + ' minutes</strong>. Add 5-10 min for waiting. Total budget: ~' + (totalMins+10) + ' min.'});

  if (fareBreakdown.length > 1) {
    tips.push({icon:'💰', color:'success',
      text:'Total fare: <strong>₹' + totalFare + '</strong> (' + fareBreakdown.join(' + ') + '). Buy separate tickets at each network counter.'});
  } else {
    tips.push({icon:'💰', color:'success',
      text:'Approximate fare: <strong>₹' + totalFare + '</strong>. Buy at counter, TVM machine or DMRC app.'});
  }

  var crowdLevel = CROWD_SCHEDULE[crowd.isWeekend?'weekend':'weekday'][crowd.hour];
  if (crowdLevel >= 3) {
    tips.push({icon:'🚨', color:'danger',
      text:'<strong>Very crowded right now!</strong> Peak hour. Board from first or last coach. Consider delaying 20-30 min if not urgent.'});
  } else if (crowdLevel >= 2) {
    tips.push({icon:'🟠', color:'warning',
      text:'Moderate crowd expected. Keep belongings close. Ladies coaches at both ends of train.'});
  } else {
    tips.push({icon:'🟢', color:'success',
      text:'Great time to travel — low crowd. Trains are comfortable right now!'});
  }

  if (isAirport) {
    tips.push({icon:'✈️', color:'info',
      text:'Airport Express needs <strong>separate ticket</strong>. Fare ~₹60. Runs every 10-15 min. Reaches airport in 20 min from New Delhi.'});
  }
  if (isRRTS) {
    tips.push({icon:'🚄', color:'info',
      text:'Namo Bharat RRTS needs <strong>separate RRTS Card</strong>. Speed ~100 km/h. Min ₹20, max ₹210. Buy at RRTS counter or RapidX Connect app.'});
  }
  if (isMeerut) {
    tips.push({icon:'🚇', color:'info',
      text:'Meerut Metro runs Meerut South to Modipuram. Opened 22 Feb 2026. Interchange with RRTS at Meerut South, Shatabdi Nagar, Begumpul and Modipuram.'});
  }
  if (isMagenta) {
    tips.push({icon:'🛫', color:'info',
      text:'Magenta Line serves Terminal 1 IGI Airport (domestic). For Terminal 3 use Airport Express Orange Line from New Delhi.'});
  }

  var hindiFrom = HINDI_NAMES[fromStation];
  var hindiTo = HINDI_NAMES[toStation];
  if (hindiFrom || hindiTo) {
    tips.push({icon:'🇮🇳', color:'warning',
      text:'Hindi names — From: <strong>' + (hindiFrom||fromStation) + '</strong> → To: <strong>' + (hindiTo||toStation) + '</strong>. Show to anyone for directions.'});
  }

  tips.push({icon:'♿', color:'info',
    text:'All stations have <strong>lifts and ramps</strong>. Press Help button near entry gate for assistance.'});
  tips.push({icon:'🛡', color:'success',
    text:'Emergency: <strong>155370</strong> (DMRC) | <strong>1800-180-0188</strong> (RRTS). Save before you travel!'});

  return tips;
}