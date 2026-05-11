<div align="center">



\# 🚇 SahiSafar — सही सफ़र



\### \*Right Journey, Every Time\*



</div>



\---



\## 📖 About The Project



\*\*SahiSafar\*\* (सही सफ़र) means \*\*"Right Journey"\*\* in Hindi.



Millions of people travel on Delhi Metro every day — but many commuters, especially students, tourists, senior citizens and new residents, get confused about:

\- Which line to take?

\- Where to change the train?

\- How much will the ticket cost?

\- Is the metro crowded right now?



\*\*SahiSafar solves all of this — for FREE, in your browser, no app needed.\*\*



Just type your starting point and destination — SahiSafar gives you the complete route, step by step, in seconds.



\---



\## 🌐 Live Website

https://riya-aggarwal31072003.github.io/SahiSafar/

> Open on any phone or computer — no installation needed!



\---



\## ✨ Features



| Feature | Description |

|---|---|

| 🗺 \*\*Smart Route Finder\*\* | Finds the shortest path across all Delhi Metro lines using Dijkstra's algorithm |

| 🔄 \*\*Interchange Detection\*\* | Automatically tells you where to change trains |

| 💰 \*\*Fare Estimate\*\* | Shows token and Smart Card fare for every journey |

| 📊 \*\*Live Crowd Forecast\*\* | Hourly crowd levels for weekdays and weekends |

| 🏛 \*\*Landmark Search\*\* | Type "India Gate" or "AIIMS" — we find the nearest station |

| 🇮🇳 \*\*Hindi Station Names\*\* | See Hindi names to show anyone on the street for directions |

| 🚄 \*\*RRTS + Meerut Metro\*\* | Full Namo Bharat corridor + all 13 Meerut Metro stations |

| ⏱ \*\*Time Estimate\*\* | Calculates journey time including interchange waiting |

| 🛡 \*\*Safety Tips\*\* | Emergency helpline, ladies coach info, accessibility tips |

| 📱 \*\*Mobile Friendly\*\* | Works perfectly on all screen sizes |

| ✈️ \*\*Airport Express\*\* | Special tips for Orange Line Airport Express |



\---



\## 🚇 Metro Lines Covered



| Line | Route | Stations |

|---|---|---|

| 🟡 Yellow Line (Line 2) | Samaypur Badli ↔ Huda City Centre | 37 |

| 🔵 Blue Line (Line 3/4) | Dwarka Sec-21 ↔ Noida Electronic City | 51 |

| 🔵 Blue Branch | Yamuna Bank ↔ Vaishali | 3 |

| 🔴 Red Line (Line 1) | Rithala ↔ Vaishali | 27 |

| 🟢 Green Line (Line 5) | Inderlok ↔ Brigadier Hoshiyar Singh | 18 |

| 🟣 Violet Line (Line 6) | Kashmere Gate ↔ Escorts Mujesar | 32 |

| 🩷 Pink Line (Line 7) | Majlis Park ↔ Shiv Vihar | 37 |

| 🩸 Magenta Line (Line 8) | Janakpuri West ↔ Botanical Garden | 25 |

| 🟠 Airport Express (Orange) | New Delhi ↔ Dwarka Sec-21 | 6 |

| 🩵 Aqua Line | Botanical Garden ↔ Depot Station | 18 |

| ⚫ Grey Line (Line 9) | Dwarka ↔ Dhansa Bus Stand | 4 |

| 🚄 Namo Bharat RRTS | Sarai Kale Khan ↔ Meerut South | 13 |

| 🚇 Meerut Metro | Meerut South ↔ Modipuram | 13 |



\---



\## 📱 Pages



| Page | Description |

|---|---|

| 🏠 \*\*Home\*\* | Search route, popular routes, features overview |

| 🗺 \*\*Route Finder\*\* | Full route with visual map, AI tips, fare, time |

| 🚇 \*\*Metro Lines\*\* | All lines and stations — tap to start a route |

| 📊 \*\*Crowd Forecast\*\* | 24-hour crowd chart, best and worst times to travel |

| ❓ \*\*FAQ\*\* | Common questions about metro, RRTS, fares and safety |



\---



\## 🛠 Built With



| Technology | Purpose |

|---|---|

| HTML5 | Structure of all pages |

| CSS3 | Styling, animations, responsive design |

| Vanilla JavaScript | Route algorithm, UI logic, AI tips |

| Dijkstra's Algorithm | Shortest path route finding |

| GitHub Pages | Free hosting and deployment |



> \*\*Zero dependencies. Zero frameworks. Zero cost.\*\*

> Pure HTML, CSS and JavaScript — loads instantly on any device.



\---



\## 📁 Project Structure

SahiSafar/

│

├── index.html                 ← Homepage

├── README.md                  ← This file

│

├── css/

│   └── style.css              ← All styles for entire project

│

├── js/

│   ├── data.js                ← All station data, lines, landmarks, Hindi names

│   ├── engine.js              ← Dijkstra route algorithm + AI travel tips

│   └── components.js          ← Shared nav and footer components

│

└── pages/

├── route-finder.html      ← Main route finder page

├── lines.html             ← All metro lines and stations

├── crowd.html             ← Crowd forecast page

└── faq.html               ← FAQ and help page



\---



\## 🚀 How To Run Locally



```bash

\# Step 1 - Clone the repository

git clone https://github.com/riya-aggarwal31072003/SahiSafar.git



\# Step 2 - Go into the folder

cd SahiSafar



\# Step 3 - Open in browser

\# On Windows:

start index.html



\# On Mac:

open index.html



\# On Linux:

xdg-open index.html

```



> No server needed! Just open index.html in any browser and it works.



\---



\## 🧠 How The Route Algorithm Works



SahiSafar uses \*\*Dijkstra's Shortest Path Algorithm\*\* to find the best route:

1.Build a graph of all stations as nodes

2.Connect stations within each line as edges (cost = 1 per stop)

3.Connect interchange stations across lines (cost = 0, free transfer)

4.Run Dijkstra from source to destination

5.Reconstruct the path and split into segments by line

6.Generate AI tips based on segments, crowd, time and fare

This means SahiSafar finds the route with the \*\*fewest stops and fewest interchanges\*\* automatically — just like Google Maps but for Delhi Metro!



\---



\## 📊 Problem This Project Solves



Delhi Metro carries \*\*60+ lakh passengers every day\*\*. But many people face problems like:



\- ❌ Don't know which line to take

\- ❌ Confused about interchange stations

\- ❌ Can't read English station names

\- ❌ Don't know the ticket fare before reaching counter

\- ❌ Board crowded trains during peak hours

\- ❌ No idea about RRTS or Meerut Metro



\*\*SahiSafar solves all of these problems in one simple website.\*\*



\---



\## 🔮 Future Plans



\- \[ ] Mumbai Metro support

\- \[ ] Bangalore Namma Metro support

\- \[ ] Real-time train tracking

\- \[ ] Multi-language support (Hindi UI)

\- \[ ] Offline PWA (Progressive Web App)

\- \[ ] Voice search for stations

\- \[ ] Saved favourite routes



\---



\## 👩‍💻 About The Developer



This project was built by \*\*Riya Aggarwal\*\* — a developer who wanted to solve a real problem faced by millions of Delhi Metro commuters every day.



SahiSafar is built with ❤️ for every Delhi commuter — from the daily office worker to the tourist visiting India Gate for the first time.



<div align="center">



\[!\[LinkedIn](https://img.shields.io/badge/LinkedIn-Riya%20Aggarwal-0A66C2?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/riya-aggarwal-28429b260/)

\[!\[GitHub](https://img.shields.io/badge/GitHub-riya--aggarwal31072003-181717?style=for-the-badge\&logo=github)](https://github.com/riya-aggarwal31072003)



</div>



\---



\## ⚠️ Disclaimer



SahiSafar is an \*\*independent project\*\* made for educational and public utility purposes.



\- Not officially affiliated with DMRC (Delhi Metro Rail Corporation)

\- Not officially affiliated with NCRTC (Namo Bharat RRTS)

\- Always verify fares and timings at official metro counters



\*\*Official Helplines:\*\*

\- 🚇 DMRC Helpline: \*\*155370\*\*

\- 🚄 RRTS Helpline: \*\*1800-180-0188\*\*

\- 🚨 Emergency: \*\*112\*\*



\---



<div align="center">



\*\*⭐ If SahiSafar helped you, please give it a Star on GitHub! ⭐\*\*



\*सही सफ़र — Right Journey, Every Time\* 🚇



</div>

