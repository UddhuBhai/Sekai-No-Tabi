# 🌸 Sekai No Tabi

An interactive **world exploration and travel tracker** built with **Node.js, Express.js, EJS, JavaScript, and D3.js**.

Because apparently travelling the world wasn't enough — now we need to **XP grind every country we visit.**

> **世界は広い。**
> **THE WORLD AWAITS.**

## 📖 About

**Sekai No Tabi (世界の旅)** means **"Journey Around the World."**

This project turns a world map into a gamified travel tracker. Every time you discover a new country, it gets marked on the map and you earn **500 Adventure XP**.

The application tracks:

* 🌍 Countries discovered
* ⭐ Adventure XP
* 🆙 Traveler level
* 📊 XP progress
* 🗺️ World exploration progress

The dashboard currently tracks progress across **195 countries**.

## 🚀 Features

* 🌍 Interactive world map
* 🗺️ D3.js-powered map rendering
* 🔎 Search for countries
* 🖱️ Click countries directly on the map
* 🌸 Discover new destinations
* ⭐ Earn XP for every new country
* 🆙 Automatic traveler leveling
* 📊 Real-time exploration statistics
* ✨ Discovery animation overlay
* 📱 Responsive interface
* 💾 Persistent visited-country data

## 🎮 How It Works

### 🌍 Discover a Country

You can either:

* Click a country directly on the map
* Search for a country using the search bar

Once a destination is discovered, the application sends it to the backend and stores it in the visited-country data.
Already-discovered countries cannot be counted again, preventing duplicate XP rewards.

### ⭐ Adventure XP

Every newly discovered country awards:

> **+500 XP**

The application calculates total XP based on the number of countries discovered.

### 🆙 Traveler Level

The traveler starts at **Level 1**.

Every **1000 XP** advances the level, with the current XP and progress calculated automatically.

## 🗺️ Interactive Map

The map is rendered using **D3.js** and a Natural Earth geographic projection. Country boundaries are loaded from a GeoJSON dataset and converted into interactive SVG paths.
Countries have different visual states:

* ⚫ **Undiscovered** — default map color
* 🔴 **Discovered** — highlighted in red
* 🟠 **Hover** — highlighted when interacting with the map

## 🎴 Discovery Experience

When a new country is discovered, a destination overlay appears showing:

> **✦ DESTINATION FOUND ✦**

followed by the discovered country and its XP reward.

The user can then continue their journey and return to the map.

## 🧑‍🚀 Traveler HUD

The dashboard includes a dedicated traveler HUD showing:

* 🆙 Current level
* ⭐ Current XP
* 🌍 Countries discovered
* 🗺️ Continental progress

The HUD updates dynamically whenever the player's statistics change.

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **EJS**
* **JavaScript**
* **D3.js**
* **HTML5**
* **CSS3**
* **GeoJSON**

The project uses D3.js `7.9.0`, EJS, and Express as its main dependencies.

## 🎨 Design

The UI follows a dark futuristic anime-inspired aesthetic featuring:

* 🌑 Dark interface
* 🔴 Red and orange neon accents
* 🟣 Purple atmospheric glow
* 🔵 Cyan scanning effects
* ⚡ Orbitron typography
* 🪟 Glass-like HUD panels
* 🗺️ Futuristic map interface
* ✨ Animated discovery overlays

The interface also includes responsive layouts for smaller screens, including a stacked traveler HUD and mobile-friendly map/search layout.

## 🎯 What I Practiced

* Building a Node.js + Express application
* Creating REST API endpoints
* Reading and writing JSON data
* Working with D3.js
* Rendering geographic data with GeoJSON
* Creating interactive SVG maps
* Handling asynchronous API requests
* Managing application state
* Building an XP and leveling system
* Creating responsive interfaces
* Connecting frontend interactions to backend data

## 📡 API

The application provides endpoints for:

* `GET /api/visited` — Get discovered countries
* `GET /api/stats` — Get traveler statistics
* `POST /api/visited` — Discover a new country

## ✨ Highlights

This project combines **travel tracking, data visualization, and gamification** into one experience.

Instead of simply saying:

> "I've visited 12 countries."

Sekai No Tabi says:

> **LEVEL 7 TRAVELER**
> **6000 XP**
> **12 / 195 DESTINATIONS DISCOVERED**

Because every journey deserves an XP bar.

## 🔮 Future Improvements

Some ideas for future versions:

* 🗺️ Continental completion tracking
* 🏆 Travel achievements
* 🔥 Travel streaks
* 📸 Add memories/photos to destinations
* 📝 Personal travel notes
* 📅 Travel timeline
* 🏅 Country-specific achievements
* 🌎 More detailed destination information
* 👤 Multiple traveler profiles
* 🗄️ Database integration

## 🤝 Contributions

Feel free to fork the repository, experiment with the map, add new gamification mechanics, improve the visualization, or turn it into your own personal travel tracker.

## ⭐ Support

If you enjoyed **Sekai No Tabi**, consider giving the repository a **⭐ Star**.

The world is huge.

**Go discover it. 🌸**
