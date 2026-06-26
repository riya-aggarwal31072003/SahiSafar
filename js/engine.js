// ============================================================
// SahiSafar — Route Engine v5
// Pre-computed line map + proper shortest path
// ============================================================

// Cache: station -> array of lines it belongs to
var STATION_LINES = null;

function buildStationLines() {
  if (STATION_LINES) return STATION_LINES;
  STATION_LINES = {};
  for (var lk in LINES) {
    var sts = LINES[lk].stations;
    for (var i = 0; i < sts.length; i++) {
      if (!STATION_LINES[sts[i]]) STATION_LINES[sts[i]] = [];
      STATION_LINES[sts[i]].push(lk);
    }
  }
  return STATION_LINES;
}

// Get position of station on a specific line (-1 if not on line)
function posOnLine(station, lineKey) {
  return LINES[lineKey].stations.indexOf(station);
}

// Get all stations between two points on same line
function stationsBetween(from, to, lineKey) {
  var sts = LINES[lineKey].stations;
  var ai = sts.indexOf(from);
  var bi = sts.indexOf(to);
  if (ai === -1 || bi === -1) return null;
  if (ai <= bi) return sts.slice(ai, bi+1);
  return sts.slice(bi, ai+1).reverse();
}

function buildGraph() {
  var graph = {};
  for (var lk in LINES) {
    var sts = LINES[lk].stations;
    for (var i = 0; i < sts.length; i++) {
      if (!graph[sts[i]]) graph[sts[i]] = [];
      if (i > 0) {
        graph[sts[i]].push({to:sts[i-1], line:lk, cost:1});
        graph[sts[i-1]].push({to:sts[i], line:lk, cost:1});
      }
    }
  }
  for (var st in INTERCHANGES) {
    var ll = INTERCHANGES[st];
    if (!graph[st]) graph[st] = [];
    for (var i = 0; i < ll.length; i++)
      for (var j = 0; j < ll.length; j++)
        if (i !== j) graph[st].push({to:st, line:ll[j], cost:8});
  }
  return graph;
}

// ── MAIN ROUTE FINDER ─────────────────────────────────────
// Strategy: find all possible 0,1,2,3 interchange routes
// Pick the one with fewest interchanges, then fewest stops
function dijkstra(graph, from, to) {
  buildStationLines();
  if (!from || !to || from === to) return null;
  if (!STATION_LINES[from] || !STATION_LINES[to]) return null;

  var fromLines = STATION_LINES[from];
  var toLines = STATION_LINES[to];

  // Try 0 interchanges first (same line)
  for (var i = 0; i < fromLines.length; i++) {
    for (var j = 0; j < toLines.length; j++) {
      if (fromLines[i] === toLines[j]) {
        var seg = stationsBetween(from, to, fromLines[i]);
        if (seg) return {path: seg, dist: seg.length-1, changes: 0};
      }
    }
  }

  // Try 1 interchange
  // Find all interchange stations
  var best1 = null;
  for (var ic in INTERCHANGES) {
    var icLines = INTERCHANGES[ic];
    // Check if from station can reach ic on same line
    // AND ic can reach to station on same line
    for (var i = 0; i < fromLines.length; i++) {
      // Can we go from -> ic on fromLines[i]?
      var seg1 = stationsBetween(from, ic, fromLines[i]);
      if (!seg1) continue;

      for (var j = 0; j < toLines.length; j++) {
        // Can we go ic -> to on toLines[j]?
        if (fromLines[i] === toLines[j]) continue; // same line = no change needed
        var seg2 = stationsBetween(ic, to, toLines[j]);
        if (!seg2) continue;

        // Check ic is on toLines[j]
        var icOnToLine = posOnLine(ic, toLines[j]);
        if (icOnToLine === -1) continue;

        var totalStops = (seg1.length-1) + (seg2.length-1);
        if (!best1 || totalStops < best1.stops) {
          // Combine paths removing duplicate ic station
          var fullPath = seg1.concat(seg2.slice(1));
          best1 = {path: fullPath, stops: totalStops, dist: totalStops, changes: 1};
        }
      }
    }
  }
  if (best1) return best1;

  // Try 2 interchanges
  var best2 = null;
  var icList = Object.keys(INTERCHANGES);

  for (var a = 0; a < icList.length; a++) {
    var ic1 = icList[a];
    var ic1Lines = INTERCHANGES[ic1];

    for (var b = 0; b < icList.length; b++) {
      if (a === b) continue;
      var ic2 = icList[b];
      var ic2Lines = INTERCHANGES[ic2];

      for (var i = 0; i < fromLines.length; i++) {
        var seg1 = stationsBetween(from, ic1, fromLines[i]);
        if (!seg1) continue;

        // from ic1 to ic2 on a connecting line
        for (var m = 0; m < ic1Lines.length; m++) {
          if (ic1Lines[m] === fromLines[i]) continue;
          var seg2 = stationsBetween(ic1, ic2, ic1Lines[m]);
          if (!seg2) continue;

          for (var j = 0; j < toLines.length; j++) {
            if (toLines[j] === ic1Lines[m]) continue;
            if (toLines[j] === fromLines[i]) continue;
            var seg3 = stationsBetween(ic2, to, toLines[j]);
            if (!seg3) continue;

            var icOnLine = posOnLine(ic2, toLines[j]);
            if (icOnLine === -1) continue;

            var totalStops = (seg1.length-1) + (seg2.length-1) + (seg3.length-1);
            if (!best2 || totalStops < best2.stops) {
              var fullPath = seg1.concat(seg2.slice(1)).concat(seg3.slice(1));
              best2 = {path: fullPath, stops: totalStops, dist: totalStops, changes: 2};
            }
          }
        }
      }
    }
  }
  if (best2) return best2;

  // Fallback: standard Dijkstra
  var dist = {}, prev = {}, visited = {};
  for (var n in graph) dist[n] = Infinity;
  dist[from] = 0;
  var nodes = Object.keys(graph);
  for (var iter = 0; iter < nodes.length; iter++) {
    var u = null, minD = Infinity;
    for (var i = 0; i < nodes.length; i++) {
      if (!visited[nodes[i]] && dist[nodes[i]] < minD) { minD=dist[nodes[i]]; u=nodes[i]; }
    }
    if (!u || u===to) break;
    visited[u] = true;
    var nb = graph[u]||[];
    for (var i=0; i<nb.length; i++) {
      var alt = dist[u]+nb[i].cost;
      if (alt < dist[nb[i].to]) { dist[nb[i].to]=alt; prev[nb[i].to]={from:u}; }
    }
  }
  if (dist[to]===Infinity) return null;
  var path=[], cur=to, s=0;
  while (cur&&s<500) { path.unshift(cur); cur=prev[cur]?prev[cur].from:null; s++; }
  var clean=[path[0]];
  for (var i=1;i<path.length;i++) if(path[i]!==clean[clean.length-1]) clean.push(path[i]);
  return {path:clean, dist:dist[to], changes:3};
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
  var segs=[], curLine=null, segStart=0;
  for (var i=1; i<path.length; i++) {
    var line = getLineForSegment(path[i-1], path[i]);
    if (line !== null) {
      if (curLine===null) { curLine=line; segStart=i-1; }
      else if (line!==curLine) {
        segs.push({line:curLine, stations:path.slice(segStart,i)});
        curLine=line; segStart=i-1;
      }
    }
  }
  if (curLine!==null) segs.push({line:curLine, stations:path.slice(segStart)});
  if (segs.length===0&&path.length>=2) {
    for (var lk in LINES) {
      if (LINES[lk].stations.indexOf(path[0])!==-1&&LINES[lk].stations.indexOf(path[path.length-1])!==-1) {
        segs.push({line:lk,stations:path}); break;
      }
    }
  }
  return segs;
}

function getCrowdLevel() {
  var now=new Date(), hour=now.getHours();
  var isWeekend=now.getDay()===0||now.getDay()===6;
  return {level:CROWD_SCHEDULE[isWeekend?'weekend':'weekday'][hour],hour:hour,isWeekend:isWeekend};
}

function generateAITips(segments, path, fromStation, toStation) {
  var tips=[], interchangeCount=segments.length-1, totalStops=path.length-1;
  var crowd=getCrowdLevel();
  var isRRTS=false,isAirport=false,isMagenta=false,isMeerut=false;
  for (var i=0;i<segments.length;i++) {
    if(segments[i].line==='RRTS') isRRTS=true;
    if(segments[i].line==='Orange') isAirport=true;
    if(segments[i].line==='Magenta') isMagenta=true;
    if(segments[i].line==='MeerutMetro') isMeerut=true;
  }
  var totalMins=Math.round(totalStops*2.5+interchangeCount*5);
  var totalFare=0, fareBreakdown=[];
  for (var fi=0;fi<segments.length;fi++) {
    var sf=calculateFare(segments[fi].stations.length-1,segments[fi].line);
    totalFare+=sf.fare;
    fareBreakdown.push(LINES[segments[fi].line].shortName+' ₹'+sf.fare);
  }
  if (interchangeCount===0) {
    tips.push({icon:'✅',color:'success',text:'Direct journey on <strong>'+LINES[segments[0].line].name+'</strong> — no interchange needed!'});
  } else {
    var pts=[];
    for (var i=0;i<segments.length-1;i++) { var s=segments[i]; pts.push('<strong>'+s.stations[s.stations.length-1]+'</strong>'); }
    tips.push({icon:'🔄',color:'info',text:'Change trains '+interchangeCount+' time'+(interchangeCount>1?'s':'')+' at: '+pts.join(', ')+'. Follow overhead signs.'});
  }
  tips.push({icon:'⏱',color:'warning',text:'Estimated: <strong>~'+totalMins+' min</strong>. Add 5-10 min waiting. Total ~'+(totalMins+10)+' min.'});
  if (fareBreakdown.length>1) {
    tips.push({icon:'💰',color:'success',text:'Total fare: <strong>₹'+totalFare+'</strong> ('+fareBreakdown.join(' + ')+'). Buy separate tickets at each counter.'});
  } else {
    tips.push({icon:'💰',color:'success',text:'Approximate fare: <strong>₹'+totalFare+'</strong>. Buy at counter or TVM machine.'});
  }
  var cl=CROWD_SCHEDULE[crowd.isWeekend?'weekend':'weekday'][crowd.hour];
  if(cl>=3) tips.push({icon:'🚨',color:'danger',text:'<strong>Very crowded!</strong> Board first or last coach. Delay 20-30 min if possible.'});
  else if(cl>=2) tips.push({icon:'🟠',color:'warning',text:'Moderate crowd. Keep belongings close. Ladies coaches at both ends.'});
  else tips.push({icon:'🟢',color:'success',text:'Low crowd right now — great time to travel!'});
  if(isAirport) tips.push({icon:'✈️',color:'info',text:'Airport Express: separate ticket ~₹60. Every 10-15 min. 20 min to airport from New Delhi.'});
  if(isRRTS) tips.push({icon:'🚄',color:'info',text:'Namo Bharat RRTS: separate RRTS Card. ~100 km/h. ₹20-₹210. Buy at RRTS counter or RapidX app.'});
  if(isMeerut) tips.push({icon:'🚇',color:'info',text:'Meerut Metro: Meerut South to Modipuram. Opened 22 Feb 2026.'});
  if(isMagenta) tips.push({icon:'🛫',color:'info',text:'Magenta Line → Terminal 1 IGI (domestic). Terminal 3: use Airport Express from New Delhi.'});
  var hf=HINDI_NAMES[fromStation],ht=HINDI_NAMES[toStation];
  if(hf||ht) tips.push({icon:'🇮🇳',color:'warning',text:'Hindi — From: <strong>'+(hf||fromStation)+'</strong> → To: <strong>'+(ht||toStation)+'</strong>.'});
  tips.push({icon:'♿',color:'info',text:'All stations have <strong>lifts & ramps</strong>. Press Help button for assistance.'});
  tips.push({icon:'🛡',color:'success',text:'Emergency: <strong>155370</strong> (DMRC) | <strong>1800-180-0188</strong> (RRTS).'});
  return tips;
}