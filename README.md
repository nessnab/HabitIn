# HabitIn

HabitIn is a simple web app that helps users build consistent habits through small daily actions.

Instead of focusing on complexity, HabitIn emphasizes:
- simplicity
- consistency
- visible progress through time tracking

Check Live project here👉 [HabitIn App](https://habitin.up.railway.app/)
---

## Features

- Add, edit, delete habits
- Flexible scheduling (Daily / Weekly / Custom)
- Timer tracking (track time spent)
- Persistent timer (continues after refresh)
- User signup & login with Access token + refresh token flow
- Protected API routes (user-specific habits)


---

## Tech Stack
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Authentication**: JWT (JSON Web Tokens)
- **Hashing**: Bcrypt
- **Templating**: EJS  
- **Deployment**: Railway

---

## How It Works
- CRUD operations handled via REST API
- Timer uses:
- - elapsedTime
  - lastStartedAt
- Frontend updates UI dynamically (no reload)

---

## Future Improvements
- [ ] React frontend
- [ ] Strike milestone achievement
- [ ] Better state management
- [ ] Notifications & analytics 
- [ ] Deployment with CI/CD pipeline  

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss improvements.

---

## License
This project is licensed under the ISC License.

---

### Clone the repo
```bash
git clone https://github.com/nessnab/HabitIn.git
```
