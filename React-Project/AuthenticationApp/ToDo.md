Description

In this project, you will build a simple authentication-based application using HTML, CSS/Tailwind, and JavaScript.

Your task is to use the FreeAPI Authentication Module and implement a complete auth flow on the frontend.

You are expected to build this preferably using vanilla JavaScript. If you want to use React, that is allowed, but JavaScript is preferred for this project.
API Endpoints To Use
Register User

POST https://api.freeapi.app/api/v1/users/register

Use this endpoint to allow a new user to create an account.

Required body:

{
  "email": "user.email@domain.com",
  "password": "test@123",
  "role": "ADMIN",
  "username": "doejohn"
}

Login User

POST https://api.freeapi.app/api/v1/users/login

Use this endpoint to allow registered users to log in and receive an authenticated session.

Required body:

{
  "password": "test@123",
  "username": "doejohn"
}

Logout User

POST https://api.freeapi.app/api/v1/users/logout

Use this endpoint to log the user out and clear the active session.
Get Current User

GET https://api.freeapi.app/api/v1/users/current-user

Use this endpoint to show the details of the currently logged-in user.
What To Build

Your application should include:

    Register screen or form

    Login screen or form

    Logout button

    Current user profile/details section

    Proper success and error messages

    Clean UI using CSS or Tailwind

    Basic loading states while API requests are running

The goal is to understand how frontend authentication works with API requests, sessions, cookies, and logged-in user state.
Submit

    Live hosted project link

    Public GitHub repository link
