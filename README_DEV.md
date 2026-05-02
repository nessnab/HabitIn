
# HabitIn — README (for DEVs)

## 1. Product Overview

**HabitIn** is a web application designed to help users build **small, consistent habits** that compound over time.

Instead of overwhelming users with complex features, HabitIn focuses on:

* simplicity
* consistency
* visible progress

The core idea:

> *You don’t need big actions to change your life — just small steps every day.*

### Key Features

* Add / Edit / Delete habits
* Flexible scheduling (Daily / Weekly / Custom)
* Timer tracking (see actual time invested)
* Persistent progress (even after reload)

## Authentication
- User signup & login
- Access token + refresh token flow
- Protected API routes (user-specific habits)

### Goal

To help users **stay consistent** by making progress **visible and measurable over time**.

---

## 2. Core Feature Flows

### Add Habit

**Trigger:** User clicks "Add Habit"

**Flow:**

1. Show form (previously hidden)
2. User fills:

   * title
   * goal
   * schedule
   * time
3. Submit form → `POST /api/habits`
4. Backend:

   * saves habit to DB
5. Frontend:

   * calls `addHabitToUI()`
   * updates UI **without reload**
   * hides empty state if exists

---

### Edit Habit

**Trigger:** User clicks "Edit"

**Flow:**

1. Fetch habit → `GET /api/habits/:id`
2. Populate form with existing data
3. User edits fields
4. Submit → `PUT /api/habits/:id`
5. Backend updates DB
6. Frontend:

   * calls `updateHabitUI()`
   * updates only that card (no reload)

---

### Delete Habit

**Trigger:** User clicks "Delete"

**Flow:**

1. Show confirmation dialog
2. Confirm → `DELETE /api/habits/:id`
3. Backend removes habit
4. Frontend:

   * removes card from DOM
   * if last item → show empty state

---

### Timer Tracking

**Trigger:** User clicks Start / Stop

**Start:**

1. `POST /api/habits/:id/start`
2. Backend:

   * sets `isRunning = true`
   * saves `lastStartedAt`
3. Frontend:

   * starts interval immediately (optimistic UI)
   * calculates elapsed time

**Stop:**

1. `POST /api/habits/:id/stop`
2. Backend:

   * calculates time difference
   * updates `elapsedTime`
   * resets `isRunning`
3. Frontend:

   * updates display from backend

**Key Feature:**
✔ Timer continues correctly after page reload using:

* `elapsedTime`
* `lastStartedAt`

---

## 3. State Management

### Backend Stores:

* User:

  * id, email, password (hashed)
* Habit:

  * title, goal, schedule
  * elapsedTime
  * isRunning
  * lastStartedAt

### Frontend Stores:

* Temporary UI state:

  * `currentEditId`
  * running timers
  * form values

### Sync Strategy:

* Backend = **source of truth**
* Frontend = **visual layer**

### Edge Case:

If out of sync:
→ Frontend refetches from backend (`GET /api/habits`)

---

## 4. UI & DOM Strategy

### Rendering

* Habits rendered using:

  * server-side (EJS initial load)
  * client-side (dynamic updates)

### Key Decisions

#### `data-id`

Used to uniquely identify each habit in DOM:

```html
<div data-id="habitId">
```

#### Event Delegation

Instead of attaching listeners to each button:

```js
document.addEventListener('click', ...)
```

**Why:**

* Works for dynamically added elements
* Fixes bugs where new elements don’t respond

---

## 5. Bugs & What I Learned

### Delete not updating UI

* Cause: wrong attribute (`data-doc` vs `data-id`)
* Fix: consistent attribute usage

---

### PUT triggered instead of POST

* Cause: edit ID not reset
* Fix:

```js
currentEditId = null;
```

---

### Timer not syncing

* Cause: waiting for backend response
* Fix: **optimistic UI (start immediately)**

---

### Dynamic UI breaking

* Cause: event listeners attached to static elements
* Fix: event delegation

---

## 6. Architecture Reflection

### Current Setup

* `main.js` handles:

  * UI logic
  * API calls
  * state

### Problem

Everything is mixed → harder to scale

### Separation (Next Step)

| Type        | Example               |
| ----------- | --------------------- |
| UI Logic    | DOM updates           |
| API Logic   | fetch calls           |
| State Logic | currentEditId, timers |

---

## 7. Performance & UX

### Optimistic UI

UI updates **before backend finishes**

Example:

* Timer starts instantly
* No waiting for API

---

### Slow Network Behavior

* API delays → UI still responsive
* Backend sync happens later

---

### Timer Delay Fix

* Start interval immediately
* Sync using backend time

---

## 8. Edge Cases Handled

* Refresh while timer running → continues correctly
* Multiple timers → run independently
* Start clicked twice → toggles state
* Delete last habit → empty state appears

---

## 9. Future Improvements

* React frontend (cleaner architecture)
* Notification system
* Habit analytics
* Offline support
* Better state management (Redux / Zustand)

---

## 10. What I Learned

* DOM manipulation at scale is tricky
* Event delegation is essential
* Backend should be source of truth
* Optimistic UI improves UX a lot
* Debugging teaches more than coding
