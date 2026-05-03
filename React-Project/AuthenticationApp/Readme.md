## Live Demo URL

https://reactauthenticationapp.netlify.app/

On load, App checks GET /current-user (with credentials: include for cookies) — shows a spinner while checking

If a session exists → goes straight to Profile
Otherwise → Login screen (with a link to Register)
After login → Profile shows username, email, role with an avatar initial
Logout calls the API and returns to Login



## what you can expect from this project

- Register form (with role selector)
- Login form
- Logout button
- Current user profile section
- Success & error messages
- Loading states on all async actions
- Clean Tailwind UI

