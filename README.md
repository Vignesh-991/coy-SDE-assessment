# Coy Discover 💜✨

> A premium, modern dating application inspired by Bumble, Tinder, and Hinge, featuring real-time gesture swiping, mutual matching, strictly privacy-enforced backend architecture, and a mobile-first responsive design.

Built for the **Coy Software Development Engineer Intern Assignment**.

---

## 🌟 Overview & Architecture

**Coy Discover** delivers a fluid, startup-grade dating experience with:
- **Mobile-First & Responsive UX**: Custom design system crafted in warm off-white (`#FAF8F6`), deep violet (`#4F46E5`), and vibrant coral pink (`#FD3A73`).
- **Interactive Drag Gestures**: Physics-based card drag and swipe with live visual feedback stamps (`LIKE` / `PASS`), dynamic card tilt, and spring transitions powered by Framer Motion.
- **Card Stacking**: Multi-card depth preview with background peek cards.
- **Strict Backend Privacy**: Backend enforces that hidden incoming likes are *never* leaked via the feed API. Mutual matches only occur when both users swipe right on each other.
- **Real-Time Match Celebration**: Full-screen "IT'S A MATCH!" celebration with side-by-side avatar presentation, glowing rings, and celebratory confetti.
- **Dedicated Matches Section**: Browse all mutual matches with timestamps, locations, and bios.
- **Data Persistence**: Swipes and matches persist across browser reloads using a persistent server-side JSON database.

---

## 📸 Screenshots

*(Place application screenshots here)*

| Discover Card Feed | Swipe Feedback (LIKE / PASS) | It's a Match! Celebration |
|:---:|:---:|:---:|
| *(Screenshot Placeholder)* | *(Screenshot Placeholder)* | *(Screenshot Placeholder)* |

| Matches Gallery | Blank Home Placeholder | Empty Feed State |
|:---:|:---:|:---:|
| *(Screenshot Placeholder)* | *(Screenshot Placeholder)* | *(Screenshot Placeholder)* |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Animations & Physics**: Framer Motion
- **Icons**: Lucide React
- **Confetti Celebration**: Canvas Confetti
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Fluid Typography)
- **Design Inspiration**: Bumble, Tinder, Hinge + Coy visual identity

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Persistence**: Persistent JSON storage (`server/data/store.json`) with atomic file writes
- **CORS & Middleware**: Express JSON parser, CORS middleware, custom request logging

---

## 📂 Project Structure

```
coy-discover/
├── client/                      # React (Vite) Frontend Application
│   ├── public/                  # Public assets & app favicon
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ActionButtons.jsx    # Circular Pass / Super Like / Like buttons
│   │   │   ├── EmptyState.jsx       # Radar pulse empty state with demo reset
│   │   │   ├── LoadingSkeleton.jsx  # Shimmer card loading placeholder
│   │   │   ├── MatchModal.jsx       # Full-screen "IT'S A MATCH!" celebration
│   │   │   ├── Navbar.jsx           # Desktop navigation bar & mobile bottom bar
│   │   │   ├── ProfileCard.jsx      # Framer-motion gesture swipe card
│   │   │   └── Toast.jsx            # Non-intrusive notification toasts
│   │   ├── pages/
│   │   │   ├── DiscoverPage.jsx     # Main swipe card feed & gesture handler
│   │   │   ├── HomePage.jsx         # Minimalist placeholder & welcome tab
│   │   │   └── MatchesPage.jsx      # Mutual matches gallery
│   │   ├── services/
│   │   │   └── api.js               # Frontend API client
│   │   ├── App.jsx                  # Main application state & router
│   │   ├── index.css                # Coy luxury design system & variables
│   │   └── main.jsx                 # React root entry point
│   ├── index.html               # HTML entry with Plus Jakarta Sans typography
│   ├── package.json             # Frontend dependencies & scripts
│   └── vite.config.js           # Vite config with API reverse proxy
│
├── server/                      # Node.js + Express Backend API
│   ├── data/
│   │   ├── seedProfiles.json    # 30 fictional, realistic user profiles
│   │   └── store.json           # Persistent store (swipes, matches, likes)
│   ├── src/
│   │   ├── db.js                # Database abstraction & privacy-enforcing queries
│   │   ├── routes.js            # Express API route handlers
│   │   └── server.js            # Express server initialization
│   ├── test-api.js              # Automated backend test suite
│   └── package.json             # Backend dependencies & scripts
│
├── package.json                 # Root orchestration package
├── .gitignore                   # Git ignore patterns
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Installation

Clone the repository:
```bash
git clone https://github.com/<your-username>/coy-discover.git
cd coy-discover
```

Install backend dependencies:
```bash
cd server
npm install
cd ..
```

Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

---

## 🏃 Running the Application

### Option A: Run in Two Terminals (Recommended)

**Terminal 1 — Backend API Server:**
```bash
cd server
npm start
```
*Backend runs on `http://localhost:5000`.*

**Terminal 2 — Frontend Client:**
```bash
cd client
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

---

### Option B: Quick Commands From Root

If your environment supports npm scripts from the root:
```bash
# Start backend
npm run server

# Start frontend
npm run client

# Run backend automated integration tests
npm run test:server
```

---

## 🧪 Testing the Application

### Automated Backend Test Suite
An automated integration test script is included to test all endpoints, privacy rules, duplicate swipe prevention, and persistence:
```bash
cd server
node test-api.js
```
This tests:
1. `GET /feed` returns 30 profiles.
2. Verified that hidden incoming likes are **never** leaked.
3. `POST /swipe` with `action: 'pass'` records pass without matching.
4. `POST /swipe` with `action: 'like'` on **Maya Lin** (profile_2) triggers a mutual match.
5. `GET /matches` returns the newly created mutual match.
6. Feed count drops to 28 after 2 swipes.
7. Duplicate swipes on the same profile are safely rejected or handled idempotently.
8. Validation error handling for missing/invalid `profileId` and `action`.
9. `POST /reset` successfully restores the feed for fresh testing.

---

## 📱 User Interface Walkthrough

### 1. Discover / Swipe Feed (`/feed`)
- **Card Stacking**: See the active profile card in front and a subtle peek of the next profile behind it.
- **Drag Gestures**: Drag the card right to LIKE or left to PASS on touch screens or desktop mouse.
- **Dynamic Stamps**: Dragging right reveals a green `LIKE` stamp; dragging left reveals a coral `PASS` stamp.
- **Action Buttons**: Three circular action buttons are placed below the card:
  - ❌ **Pass** (Coral red)
  - ⭐ **Super Like** (Vibrant blue, visual feedback)
  - 💜 **Like** (Coral pink heart)
- **Keyboard Shortcuts**: Power users on desktop can use `ArrowLeft` (Pass), `ArrowRight` (Like), and `ArrowUp` (Super Like).

### 2. Immediate Mutual Matching
- Profiles such as **Maya Lin (22)**, **Sofia Rodriguez (24)**, **Chloe Dubois (23)**, and **Aarav Patel (25)** have pre-existing likes on the current user.
- Swiping right on any of these profiles immediately pops up the **"IT'S A MATCH!"** celebration screen with animated confetti and side-by-side photos.
- Swiping right on profiles who have not liked the user records the like without showing a match, faithfully adhering to mutual match rules.

### 3. Matches Gallery (`/matches`)
- View all mutual matches in a responsive card grid.
- Displays photo, name, age, college/city, and match date.

### 4. Feed Reset
- When all 30 profiles have been swiped, an **Empty State** appears with a radar pulse animation.
- Click **"Reset Demo Feed"** to clear swipes and restart the demo feed instantly.

---

## 📡 Backend API Reference

### 1. `GET /feed`
Returns unswiped profiles for the current user.
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "count": 30,
    "profiles": [
      {
        "id": "profile_1",
        "name": "Aria Patel",
        "age": 23,
        "photo": "https://images.unsplash.com/...",
        "bio": "Architectural designer by day...",
        "location": "Columbia University, NYC",
        "interests": ["Architecture", "Indie Music", "Coffee"],
        "verified": true
      }
    ]
  }
  ```
- **Security Rule**: The backend strictly strips all internal `incomingLikes` or `hasLikedMe` flags.

---

### 2. `POST /swipe`
Submits a swipe on a profile.
- **Request Body**:
  ```json
  {
    "profileId": "profile_2",
    "action": "like"
  }
  ```
  *(action must be `"like"` or `"pass"`)*
- **Response `200 OK` (Mutual Match)**:
  ```json
  {
    "success": true,
    "matched": true,
    "matchProfile": {
      "id": "profile_2",
      "name": "Maya Lin",
      "age": 22,
      "photo": "https://images.unsplash.com/...",
      "bio": "CS & Design student at Stanford...",
      "location": "Stanford University, Palo Alto",
      "interests": ["Design Systems", "Matcha", "Film Photography"],
      "verified": true
    }
  }
  ```
- **Response `200 OK` (No Match / Pass)**:
  ```json
  {
    "success": true,
    "matched": false,
    "matchProfile": null
  }
  ```

---

### 3. `GET /matches`
Returns all mutual matches for the current user.
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "count": 1,
    "matches": [
      {
        "profileId": "profile_2",
        "matchedAt": "2026-11-20T12:00:00.000Z",
        "profile": {
          "id": "profile_2",
          "name": "Maya Lin",
          "age": 22,
          "photo": "https://images.unsplash.com/...",
          "bio": "CS & Design student at Stanford...",
          "location": "Stanford University, Palo Alto",
          "interests": ["Design Systems", "Matcha"],
          "verified": true
        }
      }
    ]
  }
  ```

---

### 4. `GET /me`
Returns current user profile (`Alex Rivera, 24`) for display in header and match celebration screens.

---

### 5. `POST /reset`
Resets swipes and matches back to initial seed state so evaluators can test repeatedly without manual database cleaning.

---

## 🔒 Privacy & Security Implementation

1. **Strict Information Hiding**: The database holds an internal list of `incomingLikes`. When `/feed` is called, profiles are projected to a public schema that excludes this field completely.
2. **Mutual Match Enforcement**: A match is created if and only if:
   $$\text{action} == \text{'like'} \quad \wedge \quad \text{profileId} \in \text{incomingLikes}$$
3. **Idempotent Swipe Storage**: Swipes are permanently recorded by `profileId`. Duplicate swipes cannot trigger duplicate matches or corrupt state.
4. **Input Validation**: `action` is strictly validated to `['like', 'pass']`; non-existent `profileId`s return HTTP 404.

---

## 🚢 Git Repository & Submission Instructions

To push this project to your GitHub repository:
```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit changes
git commit -m "feat: complete Coy Discover full-stack dating application"

# Add your GitHub remote repository
git remote add origin https://github.com/<your-username>/coy-discover.git

# Set main branch and push
git branch -M main
git push -u origin main
```

---

## 📄 License
This project is submitted for the **Coy SDE Intern Assignment**. Licensed under the MIT License.
