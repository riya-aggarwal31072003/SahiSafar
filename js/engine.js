function buildGraph(){
  const graph={};
  for(const[lineKey,lineData]of Object.entries(LINES)){
    for(let i=0;i<lineData.stations.length;i++){
      const s=lineData.stations[i];
      if(!graph[s])graph[s]=[];
      if(i>0){
        const prev=lineData.stations[i-1];
        if(!graph[prev])graph[prev]=[];
        graph[s].push({to:prev,line:lineKey,cost:1});
        graph[prev].push({to:s,line:lineKey,cost:1});
      }
    }
  }
  return graph;
}

function dijkstra(graph,from,to){
  const dist={},prev={},unvisited=new Set(Object.keys(graph));
  for(const n of unvisited)dist[n]=Infinity;
  dist[from]=0;
  while(unvisited.size){
    let u=null,minD=Infinity;
    for(const n of unvisited){if(dist[n]<minD){minD=dist[n];u=n;}}
    if(!u||u===to)break;
    unvisited.delete(u);
    if(!graph[u])continue;
    for(const{to:v,cost}of graph[u]){
      const alt=dist[u]+cost;
      if(alt<dist[v]){dist[v]=alt;prev[v]={from:u,cost};}
    }
  }
  if(dist[to]===Infinity)return null;
  const path=[];let cur=to;
  while(cur){path.unshift(cur);cur=prev[cur]?.from;}
  return{path,dist:dist[to]};
}

function getLineForSegment(a,b){
  for(const[lk,ld]of Object.entries(LINES)){
    const ai=ld.stations.indexOf(a),bi=ld.stations.indexOf(b);
    if(ai!==-1&&bi!==-1&&Math.abs(ai-bi)===1)return lk;
  }
  return null;
}

function buildSegments(path){
  if(path.length<2)return[];
  const segs=[];
  let curLine=getLineForSegment(path[0],path[1]);
  let segStart=0;
  for(let i=2;i<=path.length-1;i++){
    const line=getLineForSegment(path[i-1],path[i]);
    if(line!==curLine){
      segs.push({line:curLine,stations:path.slice(segStart,i)});
      curLine=line;segStart=i-1;
    }
  }
  segs.push({line:curLine,stations:path.slice(segStart)});
  return segs;
}

function getCrowdLevel(){
  const now=new Date();
  const hour=now.getHours();
  const isWeekend=now.getDay()===0||now.getDay()===6;
  return{level:CROWD_SCHEDULE[isWeekend?'weekend':'weekday'][hour],hour,isWeekend};
}

function generateAITips(segments,path,fromStation,toStation){
  const tips=[];
  const interchangeCount=segments.length-1;
  const totalStops=path.length-1;
  const crowd=getCrowdLevel();
  const isRRTS=segments.some(s=>s.line==="RRTS");
  const isAirport=segments.some(s=>s.line==="Orange");
  const isMagenta=segments.some(s=>s.line==="Magenta");
  const totalMins=Math.round(totalStops*2.5+interchangeCount*5);
  const fare=calculateFare(totalStops);

  if(interchangeCount===0){
    tips.push({icon:"✅",color:"success",text:`Direct journey on <strong>${LINES[segments[0].line].name}</strong> — no interchange needed!`});
  }else{
    const changePoints=segments.slice(0,-1).map(s=>`<strong>${s.stations[s.stations.length-1]}</strong>`).join(", ");
    tips.push({icon:"🔄",color:"info",text:`Change trains ${interchangeCount} time${interchangeCount>1?'s':''} at: ${changePoints}. Follow overhead signs.`});
  }

  tips.push({icon:"⏱",color:"warning",text:`Estimated travel time: <strong>~${totalMins} minutes</strong>. Add 5–10 min for waiting. Total budget: ~${totalMins+10} min.`});
  tips.push({icon:"💰",color:"success",text:`Approximate fare: <strong>₹${fare}</strong>. Smart Card gives 10% discount. Buy at any station counter.`});

  const crowdLevel=CROWD_SCHEDULE[crowd.isWeekend?'weekend':'weekday'][crowd.hour];
  if(crowdLevel>=3){
    tips.push({icon:"🚨",color:"danger",text:`<strong>High crowd right now!</strong> Peak hour. Board from first or last coach for less rush.`});
  }else if(crowdLevel>=2){
    tips.push({icon:"🟠",color:"warning",text:`Moderate crowd expected. Keep belongings close. Ladies coaches at both ends of train.`});
  }else{
    tips.push({icon:"🟢",color:"success",text:`Good time to travel — low crowd expected. Trains are comfortable right now.`});
  }

  if(isAirport){
    tips.push({icon:"✈️",color:"info",text:`Airport Express needs a <strong>separate token/card</strong>. Fare ~₹60. Runs every 10–15 min.`});
  }
  if(isRRTS){
    tips.push({icon:"🚄",color:"info",text:`Namo Bharat RRTS needs a <strong>separate RRTS Card</strong>. Average speed ~100 km/h — much faster than metro!`});
  }
  if(isMagenta){
    tips.push({icon:"🛫",color:"info",text:`Magenta Line connects to Terminal 1 IGI Airport (domestic). Terminal 3 is on Airport Express (Orange Line).`});
  }

  const hindiFrom=HINDI_NAMES[fromStation],hindiTo=HINDI_NAMES[toStation];
  if(hindiFrom||hindiTo){
    tips.push({icon:"🇮🇳",color:"warning",text:`Hindi names — From: <strong>${hindiFrom||fromStation}</strong> → To: <strong>${hindiTo||toStation}</strong>. Show this to anyone for directions.`});
  }

  tips.push({icon:"♿",color:"info",text:`All stations have <strong>lifts and ramps</strong>. Press Help button near gate for assistance.`});
  tips.push({icon:"🛡",color:"success",text:`Emergency helpline: <strong>155370</strong>. Save this number before you travel!`});

  return tips;
}