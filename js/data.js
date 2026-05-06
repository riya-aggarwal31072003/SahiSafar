const LINES = {
  Yellow:{color:"#F9A825",textColor:"#5D4037",shortName:"Yellow",name:"Yellow Line (Line 2)",route:"Samaypur Badli ↔ Huda City Centre",stations:["Samaypur Badli","Rohini Sector 18-19","Haiderpur Badli Mor","Jahangirpuri","Adarsh Nagar","Azadpur","Model Town","GTB Nagar","Vishwavidyalaya","Vidhan Sabha","Civil Lines","Kashmere Gate","Chandni Chowk","Chawri Bazar","New Delhi","Rajiv Chowk","Patel Chowk","Central Secretariat","Udyog Bhawan","Lok Kalyan Marg","Jor Bagh","INA","AIIMS","Green Park","Hauz Khas","Malviya Nagar","Saket","Qutab Minar","Chhatarpur","Sultanpur","Ghitorni","Arjangarh","Guru Dronacharya","Sikanderpur","MG Road","IFFCO Chowk","Huda City Centre"]},
  Blue:{color:"#1565C0",textColor:"#fff",shortName:"Blue",name:"Blue Line (Line 3/4)",route:"Dwarka Sec-21 ↔ Noida Electronic City",stations:["Dwarka Sec-21","Dwarka Sec-22","Dwarka Sec-23","Dwarka Sec-24","Dwarka Sector 10","Dwarka Sector 11","Dwarka Sector 12","Dwarka Sector 13","Dwarka Sector 14","Dwarka","Dwarka Mor","Nawada","Uttam Nagar West","Uttam Nagar East","Janakpuri West","Janakpuri East","Tilak Nagar","Subhash Nagar","Tagore Garden","Rajouri Garden","Ramesh Nagar","Moti Nagar","Kirti Nagar","Shadipur","Patel Nagar","Rajendra Place","Karol Bagh","Jhandewalan","Ramakrishna Ashram Marg","Rajiv Chowk","Barakhamba Road","Mandi House","Pragati Maidan","Indraprastha","Yamuna Bank","Akshardham","Mayur Vihar Phase-1","Mayur Vihar Extension","New Ashok Nagar","Noida Sector 15","Noida Sector 16","Noida Sector 18","Botanical Garden","Noida City Centre","Golf Course","Noida Sector 34","Noida Sector 52","Noida Sector 61","Noida Sector 59","Noida Sector 62","Noida Electronic City"]},
  Red:{color:"#C62828",textColor:"#fff",shortName:"Red",name:"Red Line (Line 1)",route:"Rithala ↔ Vaishali",stations:["Rithala","Rohini West","Rohini East","Pitampura","Kohat Enclave","Netaji Subhash Place","Keshav Puram","Kanhaiya Nagar","Inderlok","Shastri Nagar","Pratap Nagar","Pulbangash","Tis Hazari","Kashmere Gate","Shastri Park","Seelampur","Welcome","Shahdara","Mansarovar Park","Jhilmil","Dilshad Garden","Shaheed Nagar","Raj Bagh","Vivek Vihar","Anand Vihar ISBT","Kaushambi","Vaishali"]},
  Green:{color:"#2E7D32",textColor:"#fff",shortName:"Green",name:"Green Line (Line 5)",route:"Inderlok ↔ Brigadier Hoshiyar Singh",stations:["Inderlok","Ashok Park Main","Punjabi Bagh West","ESI Hospital","Rajouri Garden","Madipur","Paschim Vihar East","Paschim Vihar West","Peeragarhi","Udyog Nagar","Surajmal Stadium","Nangloi Railway Station","Nangloi","Rajdhani Park","Mundka Industrial Area","Mundka","Bahadurgarh City Park","Brigadier Hoshiyar Singh"]},
  Violet:{color:"#6A1B9A",textColor:"#fff",shortName:"Violet",name:"Violet Line (Line 6)",route:"Kashmere Gate ↔ Escorts Mujesar",stations:["Kashmere Gate","Lal Quila","Jama Masjid","Delhi Gate","ITO","Mandi House","Janpath","Central Secretariat","Khan Market","Jawaharlal Nehru Stadium","Jangpura","Lajpat Nagar","Moolchand","Kailash Colony","Nehru Place","Kalkaji Mandir","Govind Puri","Harkesh Nagar Okhla","Jasola Apollo","Sarita Vihar","Mohan Estate","Tughlakabad","Badarpur Border","Sarai","NHPC Chowk","Mewala Maharajpur","Sector 28","Badkal Mor","Old Faridabad","Neelam Chowk Ajronda","Bata Chowk","Escorts Mujesar"]},
  Pink:{color:"#AD1457",textColor:"#fff",shortName:"Pink",name:"Pink Line (Line 7)",route:"Majlis Park ↔ Shiv Vihar",stations:["Majlis Park","Azadpur","Shalimar Bagh","Shakurpur","Punjabi Bagh East","ESI Hospital","Rajouri Garden","Mayapuri","Naraina Vihar","Delhi Cantt","Durgabai Deshmukh South Campus","Sir M Visvesvaraya Moti Bagh","Bhikaji Cama Place","Sarojini Nagar","INA","South Extension","Lajpat Nagar","Vinobapuri","Ashram","Hazrat Nizamuddin","Mayur Vihar Phase-1","Mayur Vihar Pocket 1","Trilokpuri Sanjay Lake","East Vinod Nagar","Mandawali West Vinod Nagar","IP Extension","Anand Vihar ISBT","Karkarduma","Karkarduma Court","Krishna Nagar","East Azad Nagar","Welcome","Jaffrabad","Maujpur-Babarpur","Gokulpuri","Johri Enclave","Shiv Vihar"]},
  Magenta:{color:"#880E4F",textColor:"#fff",shortName:"Magenta",name:"Magenta Line (Line 8)",route:"Janakpuri West ↔ Botanical Garden",stations:["Janakpuri West","Dabri Mor-Janakpuri South","Dashrathpuri","Palam","Sadar Bazar Cantonment","Terminal 1 IGI Airport","Shankar Vihar","Vasant Vihar","Munirka","RK Puram","IIT","Hauz Khas","Panchsheel Park","Chirag Delhi","Greater Kailash","Nehru Enclave","Kalkaji Mandir","Okhla NSIC","Sukhdev Vihar","Jamia Millia Islamia","Okhla Vihar","Jasola Vihar Shaheen Bagh","Kalindi Kunj","Okhla Bird Sanctuary","Botanical Garden"]},
  Orange:{color:"#E65100",textColor:"#fff",shortName:"Airport",name:"Airport Express (Orange Line)",route:"New Delhi ↔ Dwarka Sec-21",stations:["New Delhi","Shivaji Stadium","Dhaula Kuan","Delhi Aerocity","IGI Airport Terminal 3","Dwarka Sec-21"]},
  Aqua:{color:"#00897B",textColor:"#fff",shortName:"Aqua",name:"Aqua Line",route:"Botanical Garden ↔ Depot Station",stations:["Botanical Garden","Sector 101","Sector 81","Sector 83","Sector 85","Sector 137","Sector 142","Sector 143","Sector 144","Sector 145","Sector 146","Sector 147","Sector 148","Pari Chowk","Alpha 1","Delta 1","GNIDA Office","Depot Station"]},
  RRTS:{color:"#006064",textColor:"#fff",shortName:"RRTS",name:"Namo Bharat RRTS",route:"Anand Vihar ISBT ↔ Modipuram (Meerut)",stations:["Anand Vihar ISBT","Sahibabad","Ghaziabad","Guldhar","Duhai","Duhai Depot","Muradnagar","Modi Nagar South","Modi Nagar North","Meerut South","Partapur","Rithani","Shatabdi Nagar","Begumpul","Modipuram"]}
};

const INTERCHANGES={
  "Rajiv Chowk":["Yellow","Blue"],
  "Kashmere Gate":["Yellow","Red","Violet"],
  "Inderlok":["Red","Green"],
  "INA":["Yellow","Pink"],
  "Central Secretariat":["Yellow","Violet"],
  "Mandi House":["Blue","Violet"],
  "Lajpat Nagar":["Violet","Pink"],
  "Kalkaji Mandir":["Violet","Magenta"],
  "Botanical Garden":["Blue","Magenta","Aqua"],
  "Mayur Vihar Phase-1":["Blue","Pink"],
  "Janakpuri West":["Blue","Magenta"],
  "Rajouri Garden":["Blue","Green"],
  "Hauz Khas":["Yellow","Magenta"],
  "Azadpur":["Yellow","Pink"],
  "Anand Vihar ISBT":["Red","Pink","RRTS"],
  "New Delhi":["Yellow","Orange"],
  "Dwarka Sec-21":["Blue","Orange"],
  "ESI Hospital":["Green","Pink"],
  "Welcome":["Red","Pink"],
  "Netaji Subhash Place":["Red","Pink"],
  "New Ashok Nagar":["Blue","Aqua"]
};

const LANDMARKS={
  "connaught place":"Rajiv Chowk","cp":"Rajiv Chowk",
  "india gate":"Central Secretariat","rajpath":"Central Secretariat",
  "red fort":"Lal Quila","lal quila":"Lal Quila",
  "qutub minar":"Qutab Minar","lotus temple":"Kalkaji Mandir",
  "akshardham":"Akshardham","humayun tomb":"Hazrat Nizamuddin",
  "airport":"IGI Airport Terminal 3","igi airport":"IGI Airport Terminal 3",
  "terminal 3":"IGI Airport Terminal 3","new delhi railway":"New Delhi",
  "ndls":"New Delhi","aiims":"AIIMS","aiims hospital":"AIIMS",
  "iit delhi":"IIT","iit":"IIT","jnu":"Hauz Khas",
  "jawaharlal nehru university":"Hauz Khas",
  "delhi university":"Vishwavidyalaya","du north campus":"Vishwavidyalaya",
  "pragati maidan":"Pragati Maidan","karol bagh market":"Karol Bagh",
  "chandni chowk market":"Chandni Chowk","sarojini nagar market":"Sarojini Nagar",
  "lajpat nagar market":"Lajpat Nagar","nehru place market":"Nehru Place",
  "dlf mall noida":"Noida Sector 18","great india place":"Noida Sector 18",
  "meerut":"Meerut South","meerut city":"Meerut South",
  "anand vihar railway":"Anand Vihar ISBT",
  "ghaziabad railway":"Ghaziabad","gzb":"Ghaziabad"
};

const HINDI_NAMES={
  "Rajiv Chowk":"राजीव चौक","Kashmere Gate":"कश्मीरी गेट","New Delhi":"नई दिल्ली",
  "Chandni Chowk":"चाँदनी चौक","Central Secretariat":"केंद्रीय सचिवालय",
  "AIIMS":"एम्स","Hauz Khas":"हौज़ खास","Lajpat Nagar":"लाजपत नगर",
  "Karol Bagh":"करोल बाग","INA":"आई.एन.ए.","Saket":"साकेत",
  "Huda City Centre":"हुडा सिटी सेंटर","Dwarka Sec-21":"द्वारका सेक्टर-21",
  "Botanical Garden":"बोटैनिकल गार्डन","Anand Vihar ISBT":"आनंद विहार",
  "Vaishali":"वैशाली","Noida City Centre":"नोएडा सिटी सेंटर",
  "IGI Airport Terminal 3":"एयरपोर्ट टर्मिनल 3","Mandi House":"मण्डी हाउस",
  "ITO":"आई.टी.ओ.","Azadpur":"आज़ादपुर","Vishwavidyalaya":"विश्वविद्यालय",
  "Rajouri Garden":"राजौरी गार्डन","Pitampura":"पीतमपुरा",
  "Meerut South":"मेरठ साउथ","Ghaziabad":"ग़ाज़ियाबाद",
  "Adarsh Nagar":"आदर्श नगर","Sahibabad":"साहिबाबाद",
  "Modipuram":"मोदीपुरम","Begumpul":"बेगमपुल",
  "Shatabdi Nagar":"शताब्दी नगर","Rithani":"रिठानी",
  "Partapur":"पार्तापुर","Muradnagar":"मुरादनगर",
  "Duhai":"दुहाई","Guldhar":"गुलधर"
};

const CROWD_SCHEDULE={
  weekday:[0,0,0,0,0,1,2,4,4,3,2,2,2,2,2,2,3,4,4,3,2,1,1,0],
  weekend:[0,0,0,0,0,0,1,1,2,2,3,3,3,3,3,2,2,2,2,2,1,1,1,0]
};

const CROWD_LABELS=["Empty","Light","Moderate","Heavy","Very Heavy"];
const CROWD_COLORS=["#4CAF50","#8BC34A","#FF9800","#F44336","#B71C1C"];
const CROWD_EMOJIS=["🟢","🟡","🟠","🔴","🔴"];

function calculateFare(stops){
  if(stops<=2)return 10;
  if(stops<=5)return 20;
  if(stops<=12)return 30;
  if(stops<=21)return 40;
  if(stops<=32)return 50;
  return 60;
}

function resolveLandmark(input){
  return LANDMARKS[input.toLowerCase().trim()]||null;
}