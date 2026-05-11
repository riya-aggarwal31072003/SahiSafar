const LINES = {
  Yellow:{color:"#F9A825",textColor:"#5D4037",shortName:"Yellow",name:"Yellow Line (Line 2)",route:"Samaypur Badli ↔ Huda City Centre",stations:["Samaypur Badli","Rohini Sector 18-19","Haiderpur Badli Mor","Jahangirpuri","Adarsh Nagar","Azadpur","Model Town","GTB Nagar","Vishwavidyalaya","Vidhan Sabha","Civil Lines","Kashmere Gate","Chandni Chowk","Chawri Bazar","New Delhi","Rajiv Chowk","Patel Chowk","Central Secretariat","Udyog Bhawan","Lok Kalyan Marg","Jor Bagh","INA","AIIMS","Green Park","Hauz Khas","Malviya Nagar","Saket","Qutab Minar","Chhatarpur","Sultanpur","Ghitorni","Arjangarh","Guru Dronacharya","Sikanderpur","MG Road","IFFCO Chowk","Huda City Centre"]},

  Blue:{color:"#1565C0",textColor:"#fff",shortName:"Blue",name:"Blue Line (Line 3/4)",route:"Dwarka Sec-21 ↔ Noida Electronic City",stations:["Dwarka Sec-21","Dwarka Sec-22","Dwarka Sec-23","Dwarka Sec-24","Dwarka Sector 10","Dwarka Sector 11","Dwarka Sector 12","Dwarka Sector 13","Dwarka Sector 14","Dwarka","Dwarka Mor","Nawada","Uttam Nagar West","Uttam Nagar East","Janakpuri West","Janakpuri East","Tilak Nagar","Subhash Nagar","Tagore Garden","Rajouri Garden","Ramesh Nagar","Moti Nagar","Kirti Nagar","Shadipur","Patel Nagar","Rajendra Place","Karol Bagh","Jhandewalan","Ramakrishna Ashram Marg","Rajiv Chowk","Barakhamba Road","Mandi House","Pragati Maidan","Indraprastha","Yamuna Bank","Akshardham","Mayur Vihar Phase-1","Mayur Vihar Extension","New Ashok Nagar","Noida Sector 15","Noida Sector 16","Noida Sector 18","Botanical Garden","Noida City Centre","Golf Course","Noida Sector 34","Noida Sector 52","Noida Sector 61","Noida Sector 59","Noida Sector 62","Noida Electronic City"]},

  BlueVaishali:{color:"#1565C0",textColor:"#fff",shortName:"Blue",name:"Blue Line Branch (Vaishali)",route:"Yamuna Bank ↔ Vaishali",stations:["Yamuna Bank","Kaushambi","Vaishali"]},

  Red:{color:"#C62828",textColor:"#fff",shortName:"Red",name:"Red Line (Line 1)",route:"Rithala ↔ Vaishali",stations:["Rithala","Rohini West","Rohini East","Pitampura","Kohat Enclave","Netaji Subhash Place","Keshav Puram","Kanhaiya Nagar","Inderlok","Shastri Nagar","Pratap Nagar","Pulbangash","Tis Hazari","Kashmere Gate","Shastri Park","Seelampur","Welcome","Shahdara","Mansarovar Park","Jhilmil","Dilshad Garden","Shaheed Nagar","Raj Bagh","Vivek Vihar","Anand Vihar ISBT","Kaushambi","Vaishali"]},

  Green:{color:"#2E7D32",textColor:"#fff",shortName:"Green",name:"Green Line (Line 5)",route:"Inderlok ↔ Brigadier Hoshiyar Singh",stations:["Inderlok","Ashok Park Main","Punjabi Bagh West","ESI Hospital","Rajouri Garden","Madipur","Paschim Vihar East","Paschim Vihar West","Peeragarhi","Udyog Nagar","Surajmal Stadium","Nangloi Railway Station","Nangloi","Rajdhani Park","Mundka Industrial Area","Mundka","Bahadurgarh City Park","Brigadier Hoshiyar Singh"]},

  Violet:{color:"#6A1B9A",textColor:"#fff",shortName:"Violet",name:"Violet Line (Line 6)",route:"Kashmere Gate ↔ Escorts Mujesar",stations:["Kashmere Gate","Lal Quila","Jama Masjid","Delhi Gate","ITO","Mandi House","Janpath","Central Secretariat","Khan Market","Jawaharlal Nehru Stadium","Jangpura","Lajpat Nagar","Moolchand","Kailash Colony","Nehru Place","Kalkaji Mandir","Govind Puri","Harkesh Nagar Okhla","Jasola Apollo","Sarita Vihar","Mohan Estate","Tughlakabad","Badarpur Border","Sarai","NHPC Chowk","Mewala Maharajpur","Sector 28","Badkal Mor","Old Faridabad","Neelam Chowk Ajronda","Bata Chowk","Escorts Mujesar"]},

  Pink:{color:"#AD1457",textColor:"#fff",shortName:"Pink",name:"Pink Line (Line 7)",route:"Majlis Park ↔ Shiv Vihar",stations:["Majlis Park","Azadpur","Shalimar Bagh","Shakurpur","Punjabi Bagh East","ESI Hospital","Rajouri Garden","Mayapuri","Naraina Vihar","Delhi Cantt","Durgabai Deshmukh South Campus","Sir M Visvesvaraya Moti Bagh","Bhikaji Cama Place","Sarojini Nagar","INA","South Extension","Lajpat Nagar","Vinobapuri","Ashram","Hazrat Nizamuddin","Mayur Vihar Phase-1","Mayur Vihar Pocket 1","Trilokpuri Sanjay Lake","East Vinod Nagar","Mandawali West Vinod Nagar","IP Extension","Anand Vihar ISBT","Karkarduma","Karkarduma Court","Krishna Nagar","East Azad Nagar","Welcome","Jaffrabad","Maujpur-Babarpur","Gokulpuri","Johri Enclave","Shiv Vihar"]},

  Magenta:{color:"#880E4F",textColor:"#fff",shortName:"Magenta",name:"Magenta Line (Line 8)",route:"Janakpuri West ↔ Botanical Garden",stations:["Janakpuri West","Dabri Mor-Janakpuri South","Dashrathpuri","Palam","Sadar Bazar Cantonment","Terminal 1 IGI Airport","Shankar Vihar","Vasant Vihar","Munirka","RK Puram","IIT","Hauz Khas","Panchsheel Park","Chirag Delhi","Greater Kailash","Nehru Enclave","Kalkaji Mandir","Okhla NSIC","Sukhdev Vihar","Jamia Millia Islamia","Okhla Vihar","Jasola Vihar Shaheen Bagh","Kalindi Kunj","Okhla Bird Sanctuary","Botanical Garden"]},

  Orange:{color:"#E65100",textColor:"#fff",shortName:"Airport",name:"Airport Express (Orange Line)",route:"New Delhi ↔ Dwarka Sec-21",stations:["New Delhi","Shivaji Stadium","Dhaula Kuan","Delhi Aerocity","IGI Airport Terminal 3","Dwarka Sec-21"]},

  Aqua:{color:"#00897B",textColor:"#fff",shortName:"Aqua",name:"Aqua Line (Noida-Greater Noida)",route:"Botanical Garden ↔ Depot Station",stations:["Botanical Garden","Sector 101","Sector 81","Sector 83","Sector 85","Sector 137","Sector 142","Sector 143","Sector 144","Sector 145","Sector 146","Sector 147","Sector 148","Pari Chowk","Alpha 1","Delta 1","GNIDA Office","Depot Station"]},

  Grey:{color:"#607D8B",textColor:"#fff",shortName:"Grey",name:"Grey Line (Line 9)",route:"Dwarka ↔ Dhansa Bus Stand",stations:["Dwarka","Nangli","Najafgarh","Dhansa Bus Stand"]},

  RRTS:{color:"#006064",textColor:"#fff",shortName:"RRTS",name:"Namo Bharat RRTS",route:"Sarai Kale Khan ↔ Modipuram (Meerut)",stations:["Sarai Kale Khan","Jangpura RRTS","New Ashok Nagar","Anand Vihar ISBT","Sahibabad","Ghaziabad","Guldhar","Duhai","Duhai Depot","Muradnagar","Modi Nagar South","Modi Nagar North","Meerut South"]},

  MeerutMetro:{color:"#00838F",textColor:"#fff",shortName:"Meerut",name:"Meerut Metro",route:"Meerut South ↔ Modipuram",stations:["Meerut South","Partapur","Rithani","Shatabdi Nagar","Brahampuri","Meerut Central","Bhaisali","Begumpul","MES Colony","Daurli","Meerut North","Modipuram Depot","Modipuram"]}
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
  "Dwarka":["Blue","Grey"],
  "ESI Hospital":["Green","Pink"],
  "Welcome":["Red","Pink"],
  "Netaji Subhash Place":["Red","Pink"],
  "New Ashok Nagar":["Blue","RRTS"],
  "Yamuna Bank":["Blue","BlueVaishali"],
  "Vaishali":["Red","BlueVaishali"],
  "Meerut South":["RRTS","MeerutMetro"],
  "Shatabdi Nagar":["RRTS","MeerutMetro"],
  "Begumpul":["RRTS","MeerutMetro"],
  "Modipuram":["RRTS","MeerutMetro"]
};

const LANDMARKS={
  "connaught place":"Rajiv Chowk","cp":"Rajiv Chowk",
  "india gate":"Central Secretariat","rajpath":"Central Secretariat",
  "kartavya path":"Central Secretariat",
  "red fort":"Lal Quila","lal quila":"Lal Quila",
  "jama masjid":"Jama Masjid",
  "qutub minar":"Qutab Minar","qutab minar":"Qutab Minar",
  "lotus temple":"Kalkaji Mandir","bahai temple":"Kalkaji Mandir",
  "akshardham":"Akshardham","akshardham temple":"Akshardham",
  "humayun tomb":"Hazrat Nizamuddin","nizamuddin dargah":"Hazrat Nizamuddin",
  "airport":"IGI Airport Terminal 3","igi airport":"IGI Airport Terminal 3",
  "terminal 3":"IGI Airport Terminal 3","t3":"IGI Airport Terminal 3",
  "terminal 1":"Terminal 1 IGI Airport","t1":"Terminal 1 IGI Airport",
  "new delhi railway":"New Delhi","ndls":"New Delhi","new delhi station":"New Delhi",
  "aiims":"AIIMS","aiims hospital":"AIIMS",
  "iit delhi":"IIT","iit":"IIT",
  "jnu":"Hauz Khas","jawaharlal nehru university":"Hauz Khas",
  "delhi university":"Vishwavidyalaya","du":"Vishwavidyalaya",
  "pragati maidan":"Pragati Maidan","bharat mandapam":"Pragati Maidan",
  "karol bagh":"Karol Bagh","karol bagh market":"Karol Bagh",
  "chandni chowk":"Chandni Chowk","chandni chowk market":"Chandni Chowk",
  "sarojini nagar":"Sarojini Nagar","sarojini nagar market":"Sarojini Nagar",
  "lajpat nagar":"Lajpat Nagar","lajpat nagar market":"Lajpat Nagar",
  "nehru place":"Nehru Place","nehru place market":"Nehru Place",
  "dlf mall noida":"Noida Sector 18","great india place":"Noida Sector 18",
  "meerut":"Meerut South","meerut city":"Meerut South",
  "meerut central":"Meerut Central","meerut central station":"Meerut Central",
  "meerut north":"Meerut North","modipuram":"Modipuram",
  "anand vihar":"Anand Vihar ISBT","anand vihar isbt":"Anand Vihar ISBT",
  "anand vihar railway":"Anand Vihar ISBT",
  "ghaziabad":"Ghaziabad","gzb":"Ghaziabad","ghaziabad railway":"Ghaziabad",
  "sahibabad":"Sahibabad","sarai kale khan":"Sarai Kale Khan",
  "hazrat nizamuddin":"Hazrat Nizamuddin","nizamuddin":"Hazrat Nizamuddin",
  "saket mall":"Saket","select citywalk":"Saket",
  "cyber city":"New Ashok Nagar","cyberhub":"New Ashok Nagar",
  "mg road":"MG Road","mg road gurgaon":"MG Road",
  "huda city centre":"Huda City Centre",
  "faridabad":"Escorts Mujesar","old faridabad":"Old Faridabad",
  "vaishali":"Vaishali","kaushambi":"Kaushambi",
  "botanical garden":"Botanical Garden",
  "greater noida":"Depot Station","pari chowk":"Pari Chowk",
  "najafgarh":"Najafgarh","dwarka":"Dwarka",
  "rohini":"Rohini West","pitampura":"Pitampura",
  "janakpuri":"Janakpuri West","dwarka mor":"Dwarka Mor",
  "uttam nagar":"Uttam Nagar East","tagore garden":"Tagore Garden",
  "rajouri garden":"Rajouri Garden","kirti nagar":"Kirti Nagar",
  "brahampuri":"Brahampuri","bhaisali":"Bhaisali",
  "mes colony":"MES Colony","daurli":"Daurli",
  "partapur":"Partapur","rithani":"Rithani"
};

const HINDI_NAMES={
  "Rajiv Chowk":"राजीव चौक",
  "Kashmere Gate":"कश्मीरी गेट",
  "New Delhi":"नई दिल्ली",
  "Chandni Chowk":"चाँदनी चौक",
  "Central Secretariat":"केंद्रीय सचिवालय",
  "AIIMS":"एम्स",
  "Hauz Khas":"हौज़ खास",
  "Lajpat Nagar":"लाजपत नगर",
  "Karol Bagh":"करोल बाग",
  "INA":"आई.एन.ए.",
  "Saket":"साकेत",
  "Huda City Centre":"हुडा सिटी सेंटर",
  "Dwarka Sec-21":"द्वारका सेक्टर-21",
  "Dwarka":"द्वारका",
  "Botanical Garden":"बोटैनिकल गार्डन",
  "Anand Vihar ISBT":"आनंद विहार आई.एस.बी.टी.",
  "Vaishali":"वैशाली",
  "Kaushambi":"कौशाम्बी",
  "Noida City Centre":"नोएडा सिटी सेंटर",
  "IGI Airport Terminal 3":"आई.जी.आई. एयरपोर्ट टर्मिनल 3",
  "Terminal 1 IGI Airport":"टर्मिनल 1 एयरपोर्ट",
  "Mandi House":"मण्डी हाउस",
  "ITO":"आई.टी.ओ.",
  "Azadpur":"आज़ादपुर",
  "Vishwavidyalaya":"विश्वविद्यालय",
  "Rajouri Garden":"राजौरी गार्डन",
  "Pitampura":"पीतमपुरा",
  "Rohini West":"रोहिणी वेस्ट",
  "Rohini East":"रोहिणी ईस्ट",
  "Meerut South":"मेरठ साउथ",
  "Meerut Central":"मेरठ सेंट्रल",
  "Meerut North":"मेरठ नॉर्थ",
  "Modipuram":"मोदीपुरम",
  "Modipuram Depot":"मोदीपुरम डिपो",
  "Ghaziabad":"ग़ाज़ियाबाद",
  "Sahibabad":"साहिबाबाद",
  "Sarai Kale Khan":"सराय काले खान",
  "Adarsh Nagar":"आदर्श नगर",
  "Jahangirpuri":"जहाँगीरपुरी",
  "Samaypur Badli":"समयपुर बादली",
  "Lal Quila":"लाल किला",
  "Jama Masjid":"जामा मस्जिद",
  "Begumpul":"बेगमपुल",
  "Shatabdi Nagar":"शताब्दी नगर",
  "Rithani":"रिठानी",
  "Partapur":"पार्तापुर",
  "Brahampuri":"ब्रह्मपुरी",
  "Bhaisali":"भैसाली",
  "MES Colony":"एम.ई.एस. कॉलोनी",
  "Daurli":"दौरली",
  "Muradnagar":"मुरादनगर",
  "Duhai":"दुहाई",
  "Guldhar":"गुलधर",
  "Modi Nagar South":"मोदी नगर साउथ",
  "Modi Nagar North":"मोदी नगर नॉर्थ",
  "Najafgarh":"नजफगढ़",
  "Sikanderpur":"सिकंदरपुर",
  "MG Road":"एम.जी. रोड",
  "IFFCO Chowk":"इफको चौक",
  "Escorts Mujesar":"एस्कॉर्ट्स मुजेसर",
  "Old Faridabad":"पुराना फरीदाबाद",
  "Tughlakabad":"तुगलकाबाद",
  "Nehru Place":"नेहरू प्लेस",
  "Kalkaji Mandir":"कालकाजी मंदिर",
  "Kalindi Kunj":"कालिंदी कुंज",
  "Pari Chowk":"परी चौक",
  "Greater Kailash":"ग्रेटर कैलाश",
  "Sarojini Nagar":"सरोजिनी नगर",
  "Welcome":"वेलकम",
  "Shahdara":"शाहदरा",
  "Dilshad Garden":"दिलशाद गार्डन",
  "Vivek Vihar":"विवेक विहार",
  "Janakpuri West":"जनकपुरी वेस्ट",
  "Uttam Nagar East":"उत्तम नगर ईस्ट",
  "Tagore Garden":"टैगोर गार्डन",
  "Moti Nagar":"मोती नगर",
  "Patel Nagar":"पटेल नगर",
  "Rajendra Place":"राजेंद्र प्लेस",
  "Jhandewalan":"झण्डेवाला",
  "Indraprastha":"इंद्रप्रस्थ",
  "Akshardham":"अक्षरधाम",
  "Mayur Vihar Phase-1":"मयूर विहार फेज-1",
  "Noida Sector 18":"नोएडा सेक्टर 18",
  "Palam":"पालम",
  "Vasant Vihar":"वसंत विहार",
  "Munirka":"मुनिरका",
  "Green Park":"ग्रीन पार्क",
  "Malviya Nagar":"मालवीय नगर",
  "Qutab Minar":"क़ुतुब मीनार",
  "Chhatarpur":"छतरपुर",
  "Guru Dronacharya":"गुरु द्रोणाचार्य",
  "Shiv Vihar":"शिव विहार",
  "Majlis Park":"मजलिस पार्क",
  "Gokulpuri":"गोकुलपुरी",
  "New Ashok Nagar":"न्यू अशोक नगर",
  "Jangpura RRTS":"जंगपुरा आर.आर.टी.एस."
};

const CROWD_SCHEDULE={
  weekday:[0,0,0,0,0,1,2,4,4,3,2,2,2,2,2,2,3,4,4,3,2,1,1,0],
  weekend:[0,0,0,0,0,0,1,1,2,2,3,3,3,3,3,2,2,2,2,2,1,1,1,0]
};

const CROWD_LABELS=["Empty","Light","Moderate","Heavy","Very Heavy"];
const CROWD_COLORS=["#4CAF50","#8BC34A","#FF9800","#F44336","#B71C1C"];
const CROWD_EMOJIS=["🟢","🟡","🟠","🔴","🔴"];

// Average distance per stop = 1.2 km (Delhi Metro avg station spacing)
// Real DMRC fare slabs based on km distance
function calculateFare(stops){
  var km = stops * 1.2; // approx km
  var token, smart;
  if(km <= 2)      { token = 10; smart = 9; }
  else if(km <= 5) { token = 20; smart = 18; }
  else if(km <= 12){ token = 30; smart = 27; }
  else if(km <= 21){ token = 40; smart = 36; }
  else if(km <= 32){ token = 50; smart = 45; }
  else             { token = 60; smart = 54; }
  return { token: token, smart: smart, km: Math.round(km) };
}

function resolveLandmark(input){
  return LANDMARKS[input.toLowerCase().trim()]||null;
}