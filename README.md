# WriteMail AI

WriteMail AI is an AI-powered email writing application that helps users create clear, professional emails from simple natural-language prompts. Powered by the Groq API, it generates personalized subject lines and email content, along with LinkedIn outreach messages and follow-up emails.

## Features

- Register an account, verify an email address with a six-digit OTP, and sign in.
- Generate email content from a prompt of up to 3,000 characters.
- Receive a subject line and email body; outreach prompts may also produce a LinkedIn DM and follow-up email.
- Copy generated content to the clipboard.
- Save generated results to MongoDB, associated with the signed-in user.
- Protect generation and history API routes with JWT authentication.
- Use quick prompt examples for leave requests, job applications, and application follow-ups.

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Axios, Tailwind CSS, Heroicons, react-hot-toast |
| Backend | Node.js, Express 5, Mongoose, MongoDB, JWT, bcryptjs |
| AI | Groq API, called through Axios |
| Email verification | Nodemailer with Gmail SMTP |

## Project structure

```text
.
├── package.json                 # Root development scripts
├── server/
│   ├── config/db.js             # MongoDB connection
│   ├── controllers/             # Authentication and AI handlers
│   ├── middleware/              # JWT authentication middleware
│   ├── models/                  # User and generated email history schemas
│   ├── routes/                  # Auth and AI API routes
│   ├── utils/sendEmail.js       # OTP email delivery
│   └── server.js                # Express app and server entry point
└── frontend/
    ├── src/
    │   ├── components/          # Navigation and page layout
    │   ├── context/             # Client authentication state
    │   ├── pages/               # Landing, auth, verification, dashboard
    │   ├── utils/api.js         # Axios client and JWT header
    │   ├── App.jsx              # Client routes
    │   └── main.jsx             # Frontend entry point
    ├── index.html
    └── vite.config.js
```

## Prerequisites

- Node.js and npm
- A MongoDB database and connection URI
- A Groq API key
- Gmail SMTP credentials if you want verification OTP emails delivered

## Backend environment

Create `server/.env` with the required settings:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/writemail-ai
JWT_SECRET=replace-with-a-long-random-secret
GROQ_API_KEY=your-groq-api-key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

`MONGODB_URI`, `JWT_SECRET`, and `GROQ_API_KEY` are checked at startup. `PORT` defaults to `5000`; `FRONTEND_URL` is optional and controls the configured CORS origin.

To send OTP email, also set:

```env
EMAIL_USER=your-gmail-address
EMAIL_PASS=your-gmail-app-password
```

Email delivery settings are optional to start the server. Registration still creates the account if sending the OTP email fails, so email verification will require a working SMTP setup.

The frontend API client currently targets `http://localhost:5000/api` in `frontend/src/utils/api.js`.

## Install dependencies

From the repository root, install the root, backend, and frontend dependencies:

```bash
npm run install-all
```

Equivalent individual commands:

```bash
npm install
npm --prefix server install
npm --prefix frontend install
```

## Run locally

1. Create `server/.env` using the variables above.
2. Install dependencies from the repository root.
3. Start both the API and Vite development server:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`, and the backend listens at `http://localhost:5000` unless `PORT` is changed.

You can also run each service in a separate terminal from the repository root:

```bash
npm run start:server
npm run start:frontend
```

## Available scripts

| Location | Command | Description |
| --- | --- | --- |
| Root | `npm run install-all` | Install root, backend, and frontend dependencies |
| Root | `npm run dev` | Start backend and frontend together |
| Root | `npm start` | Start backend and frontend together |
| Root | `npm run start:server` | Start the Express server |
| Root | `npm run start:frontend` | Start the Vite development server |
| Root | `npm run build` | Install frontend dependencies and create the frontend production build |
| Backend | `npm start` | Start the Express server (run in `server/`) |
| Frontend | `npm run dev` | Start Vite (run in `frontend/`) |
| Frontend | `npm run build` | Build the frontend for production |
| Frontend | `npm run preview` | Preview the production frontend build |
| Frontend | `npm run lint` | Run Oxlint |

## API overview

All API routes are mounted under `/api`.

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account and attempt to send an OTP |
| `POST` | `/api/auth/verify-otp` | Public | Verify the six-digit OTP and return a JWT |
| `POST` | `/api/auth/login` | Public | Sign in a verified user and return a JWT |
| `POST` | `/api/ai/generate-email` | JWT required | Generate email content from `{ "prompt": "..." }` and save the result |
| `GET` | `/api/ai/history` | JWT required | Return the signed-in user's saved generations, newest first |

For protected routes, send the token in the `Authorization: Bearer <token>` header. The history endpoint is implemented by the backend; the current dashboard does not display a history list.

## Screenshots

Screenshots are not included in the repository yet. Add application images here when available:

```text
![Landing page](docs/screenshots/landing-page.png)
![Email generation dashboard](docs/screenshots/dashboard.png)
```

## Author

**Babar**
