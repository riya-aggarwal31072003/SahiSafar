function buildGraph(){
  const graph={};

  // Step 1 - add all stations from all lines
  for(var lineKey in LINES){
    var sts=LINES[lineKey].stations;
    for(var i=0;i<sts.length;i++){
      if(!graph[sts[i]])graph[sts[i]]=[];
    }
  }

  // Step 2 - connect stations within each line
  for(var lineKey in LINES){
    var sts=LINES[lineKey].stations;
    for(var i=0;i<sts.length;i++){
      if(i>0){
        var a=sts[i-1],b=sts[i];
        graph[a].push({to:b,line:lineKey,cost:1});
        graph[b].push({to:a,line:lineKey,cost:1});
      }
    }
  }

  // Step 3 - connect interchange stations across lines (cost 0 = free transfer)
  for(var station in INTERCHANGES){
    var linesList=INTERCHANGES[station];
    for(var i=0;i<linesList.length;i++){
      for(var j=0;j<linesList.length;j++){
        if(i!==j){
          if(!graph[station])graph[station]=[];
          graph[station].push({to:station,line:linesList[j],cost:0});
        }
      }
    }
  }

  return graph;
}

function dijkstra(graph,from,to){
  if(!graph[from]||!graph[to])return null;
  var dist={},prev={},visited={};
  for(var n in graph)dist[n]=Infinity;
  dist[from]=0;
  var queue=Object.keys(graph);

  while(queue.length>0){
    // find unvisited node with smallest distance
    var u=null,minD=Infinity;
    for(var i=0;i<queue.length;i++){
      var node=queue[i];
      if(!visited[node]&&dist[node]<minD){
        minD=dist[node];u=node;
      }
    }
    if(u===null||u===to)break;
    visited[u]=true;
    queue.splice(queue.indexOf(u),1);

    var neighbors=graph[u]||[];
    for(var i=0;i<neighbors.length;i++){
      var nb=neighbors[i];
      var alt=dist[u]+nb.cost;
      if(alt<dist[nb.to]){
        dist[nb.to]=alt;
        prev[nb.to]={from:u,cost:nb.cost,line:nb.line};
      }
    }
  }

  if(dist[to]===Infinity)return null;
  var path=[],cur=to;
  while(cur){
    path.unshift(cur);
    cur=prev[cur]?prev[cur].from:null;
  }
  return{path:path,dist:dist[to]};
}

function getLineForSegment(a,b){
  for(var lk in LINES){
    var sts=LINES[lk].stations;
    var ai=sts.indexOf(a),bi=sts.indexOf(b);
    if(ai!==-1&&bi!==-1&&Math.abs(ai-bi)===1)return lk;
  }
  return null;
}

function buildSegments(path){
  if(!path||path.length<2)return[];
  var segs=[],curLine=null,segStart=0;

  for(var i=1;i<path.length;i++){
    var line=getLineForSegment(path[i-1],path[i]);
    if(line===null)continue; // interchange step, skip
    if(curLine===null){curLine=line;segStart=i-1;}
    if(line!==curLine){
      segs.push({line:curLine,stations:path.slice(segStart,i)});
      curLine=line;segStart=i-1;
    }
  }
  if(curLine!==null){
    segs.push({line:curLine,stations:path.slice(segStart)});
  }
  return segs;
}

function getCrowdLevel(){
  var now=new Date();
  var hour=now.getHours();
  var isWeekend=now.getDay()===0||now.getDay()===6;
  return{level:CROWD_SCHEDULE[isWeekend?'weekend':'weekday'][hour],hour:hour,isWeekend:isWeekend};
}

function generateAITips(segments,path,fromStation,toStation){
  var tips=[];
  var interchangeCount=segments.length-1;
  var totalStops=path.length-1;
  var crowd=getCrowdLevel();
  var isRRTS=false,isAirport=false,isMagenta=false;
  for(var i=0;i<segments.length;i++){
    if(segments[i].line==="RRTS")isRRTS=true;
    if(segments[i].line==="Orange")isAirport=true;
    if(segments[i].line==="Magenta")isMagenta=true;
  }
  var totalMins=Math.round(totalStops*2.5+interchangeCount*5);
  var fareObj=calculateFare(totalStops);

  if(interchangeCount===0){
    tips.push({icon:"✅",color:"success",text:"Direct journey on <strong>"+LINES[segments[0].line].name+"</strong> — no interchange needed!"});
  }else{
    var changePoints=[];
    for(var i=0;i<segments.length-1;i++){
      var seg=segments[i];
      changePoints.push("<strong>"+seg.stations[seg.stations.length-1]+"</strong>");
    }
    tips.push({icon:"🔄",color:"info",text:"Change trains "+interchangeCount+" time"+(interchangeCount>1?"s":"")+" at: "+changePoints.join(", ")+". Follow overhead signs on platform."});
  }

  tips.push({icon:"⏱",color:"warning",text:"Estimated travel time: <strong>~"+totalMins+" minutes</strong>. Add 5-10 min for waiting. Total budget: ~"+(totalMins+10)+" min."});
  tips.push({icon:"💰",color:"success",text:"Token fare: <strong>₹"+fareObj.token+"</strong> &nbsp;|&nbsp; Smart Card: <strong>₹"any station counter."});

  var crowdLevel=CROWD_SCHEDULE[crowd.isWeekend?'weekend':'weekday'][crowd.hour];
  if(crowdLevel>=3){
    tips.push({icon:"🚨",color:"danger",text:"<strong>High crowd right now!</strong> Peak hour. Board from first or last coach for less rush."});
  }else if(crowdLevel>=2){
    tips.push({icon:"🟠",color:"warning",text:"Moderate crowd expected. Keep belongings close. Ladies coaches at both ends of train."});
  }else{
    tips.push({icon:"🟢",color:"success",text:"Good time to travel — low crowd expected. Trains are comfortable right now."});
  }

  if(isAirport){
    tips.push({icon:"✈️",color:"info",text:"Airport Express needs a <strong>separate token or card</strong>. Fare ~₹60. Runs every 10-15 min."});
  }
  if(isRRTS){
    tips.push({icon:"🚄",color:"info",text:"Namo Bharat RRTS needs a <strong>separate RRTS Card</strong>. Average speed ~100 km/h — much faster than metro! Board at Anand Vihar ISBT."});
  }
  if(isMagenta){
    tips.push({icon:"🛫",color:"info",text:"Magenta Line connects to Terminal 1 IGI Airport (domestic). Terminal 3 is on Airport Express Orange Line."});
  }

  var hindiFrom=HINDI_NAMES[fromStation],hindiTo=HINDI_NAMES[toStation];
  if(hindiFrom||hindiTo){
    tips.push({icon:"🇮🇳",color:"warning",text:"Hindi names — From: <strong>"+(hindiFrom||fromStation)+"</strong> → To: <strong>"+(hindiTo||toStation)+"</strong>. Show this to anyone for directions."});
  }

  tips.push({icon:"♿",color:"info",text:"All stations have <strong>lifts and ramps</strong>. Press Help button near gate for assistance."});
  tips.push({icon:"🛡",color:"success",text:"Emergency helpline: <strong>155370</strong>. Save this number before you travel!"});

  return tips;
}