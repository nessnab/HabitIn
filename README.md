# HabitIn

HabitIn is a full-stack habit tracking application designed to reduce friction in building consistent routines through flexible scheduling, persistent sessions, and real-time progress tracking.

Rather than focusing on excessive features, HabitIn focuses on:

* reducing interaction friction
* maintaining consistency through persistence
* simplifying habit management into a single-page experience

🌐 Live Demo: https://habitin.onrender.com/

## Page Preview
<img width="50%" height="50%" alt="image" src="https://github.com/user-attachments/assets/c730f990-78c9-4042-af53-381567b57a48" />
<img width="50%" height="50%" alt="image" src="https://github.com/user-attachments/assets/a530fda8-1cba-44e1-b3d1-4e5d5949f56d" />
<img width="50%" height="50%" alt="image" src="https://github.com/user-attachments/assets/d30ffac7-ad22-496b-9b58-46103123519c" />

---

# Features

## Authentication & User System

* User signup & login with JWT authentication
* Access token + refresh token flow
* Protected routes and authenticated API access
* Persistent login session restoration

## Habit Management

* Create, edit, and delete habits
* Flexible scheduling:

  * Daily
  * Weekly
  * Custom recurring days
* User-specific habit storage
* Expandable habit cards to reduce UI clutter

## Timer Tracking

* Real-time habit timer tracking
* Persistent timer continues after refresh
* Time tracking stored per habit

## User Experience

* Confirmation modal for destructive actions
* Dynamic conditional forms
* Single-page application flow with React Router
* Responsive UI design

---

# Tech Stack

## Frontend

* React
* Tailwind CSS
* React Router
* Vite

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication & Security

* JWT (JSON Web Tokens)
* Bcrypt
* HTTP-only cookies

## Deployment

* Render

---

# System Architecture

HabitIn uses a React SPA + REST API architecture.

### Frontend

Handles:

* UI rendering
* protected routing
* authentication state
* dynamic forms
* client-side navigation

### Backend

Handles:

* authentication
* API endpoints
* database operations
* token validation
* session persistence

---

# Key Technical Implementations

* RESTful CRUD API architecture
* JWT access/refresh token authentication flow
* Async session restoration after refresh
* Protected React routes
* Persistent timer state using:

  * `elapsedTime`
  * `lastStartedAt`
* Dynamic schedule rendering for recurring habits
* Reusable modal confirmation patterns
* Frontend/backend deployment integration

---

# Challenges & Learnings

One of the biggest challenges in this project was handling authentication persistence and route protection in a single-page application.

Refreshing protected routes initially caused authenticated users to be redirected before session restoration completed. This required restructuring the application flow using async authentication initialization and loading gates.

This project also became a practical exercise in:

* frontend/backend coordination
* state management
* deployment pipelines
* session persistence
* REST API architecture

---

# Future Improvements

* [ ] Push notifications & reminders
* [ ] Streak & milestone system
* [ ] Habit analytics & insights dashboard
* [ ] CI/CD deployment pipeline
* [ ] Unit & integration testing

---

# Local Development

### Clone the repository

```bash
git clone https://github.com/nessnab/HabitIn.git
```

### Install dependencies

```bash
npm install
cd client
npm install
```

### Run development servers

Backend:

```bash
npm start
```

Frontend:

```bash
cd client
npm run dev
```

---

# License

This project is licensed under the ISC License.
