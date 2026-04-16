# 🌱 HabitIn

HabitIn is a responsive habit tracker built with **Node.js, MongoDB, EJS, Tailwind CSS, and JWT authentication**.  
It helps users build and maintain daily habits with a clean interface, secure login, and persistent tracking.

👉Check Live project here: https://habitin.up.railway.app/
---

## 🚀 Features

- **User Authentication**: Signup, login, logout with JWT + secure HTTP‑only cookies  
- **Protected Routes**: Custom middleware ensures only logged‑in users can access their data  
- **Habit Management**: Add, edit, and delete habits tied to each user account  
- **Habit Details**: Title, goals, schedule, and time tracking  
- **Flexible Scheduling**: Daily, weekly, or custom days  
- **Manual Tracking**: Start/stop buttons for each habit session  
- **UI Feedback**: Personalized navigation with "Hi, user.email”  
- **Progress Tracking**: Hours spent per day/week/month with milestones & streaks  
- **History**: Store and view past activity logs per habit  

---

## ✅ Completed Milestones
- Initial views with HTML, Tailwind CSS, and vanilla JS  
- Node.js + Express setup with routes, controllers, and EJS partials  
- MongoDB integration with Mongoose models  
- Habit CRUD (create, edit, delete) with modals and form validation  
- Time tracker per habit with server‑side persistence  
- Password hashing with Mongoose hooks + bcrypt compare on login  
- Error handling for signup/login (email & password validation)  
- JWT authentication with maxAge, HTTP‑only cookies, and custom middleware  
- Route protection (`requireAuth`)  
- Logout by clearing JWT cookie  
- Fetching habits per user (`Habit.find({ userId: req.user.id })`)  

---

## 🛠 Tech Stack
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Authentication**: JWT (JSON Web Tokens)
- **Hashing**: Bcrypt
- **Templating**: EJS  
- **Deployment**: Railway

---

## 🔒 Security & Production Practices
- **Error Handling**: JSON responses for APIs, friendly messages for EJS views  
- **Monitoring**: Logging of auth events and errors for debugging & security
- **Environment Variables**: JWT secret stored in `.env` (not hardcoded)  
- **Refresh tokens** for long‑lived sessions  
- **HTTPS**: Required in production to protect JWT cookies  

---

## 📌 Roadmap
- [ ] RESTful API endpoints for external clients  
- [ ] Role‑based access (admin vs user)  
- [ ] Notifications (habit reminders)  
- [ ] Deployment with CI/CD pipeline  

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss improvements.

---

## 📄 License
This project is licensed under the ISC License.

---

### Clone the repo
```bash
git clone https://github.com/nessnab/HabitIn.git
```