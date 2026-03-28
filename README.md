# FUTURE_FS_02 - Mini CRM Web Application

A full-stack Mini CRM web application for business admins to manage leads coming from website contact forms.

## Project Overview

This project helps admins:

- Log in securely using JWT authentication
- View all leads in a dashboard
- Add new leads
- Edit and delete leads
- Track lead status as `new`, `contacted`, or `converted`
- Add follow-up notes to each lead

The application follows MVC architecture on the backend and uses React on the frontend.

## Tech Stack

### Frontend

- React.js
- Vite
- Axios
- React Router DOM
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Folder Structure

```text
FUTURE_FS_02/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles.css
│   ├── index.html
│   └── package.json
└── README.md
```

## Features

- Secure admin login
- Protected admin routes
- Lead management dashboard
- Lead detail page
- Add and edit lead form
- Notes system for follow-up tracking
- Dashboard statistics for total leads and conversions
- Clean UI for admin workflows

## Backend API Endpoints

### Authentication

- `POST /api/auth/login`
- `GET /api/auth/me`

### Leads

- `POST /api/leads`
- `GET /api/leads`
- `GET /api/leads/:id`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id`

### Notes

- `POST /api/leads/:id/notes`
- `GET /api/leads/:id/notes`
- `PUT /api/leads/:id/notes/:noteId`
- `DELETE /api/leads/:id/notes/:noteId`

## MongoDB Models

### Admin

- `name`
- `email`
- `password`

### Lead

- `name`
- `email`
- `phone`
- `source`
- `status`
- `createdDate`
- `notes`

### Note

- `text`
- `timestamp`

## Default Admin Login

Use these credentials after setting up the backend `.env` file:

```text
Email: admin@futurefs02.com
Password: Admin@123
```

## Environment Variables

Create `backend/.env` with:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mini-crm
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=7d
ADMIN_NAME=System Admin
ADMIN_EMAIL=admin@futurefs02.com
ADMIN_PASSWORD=Admin@123
```

## How To Run The Project

### 1. Clone the repository

```bash
git clone https://github.com/ShwethaR0416/FUTURE_FS_02.git
cd FUTURE_FS_02
```

### 2. Run the backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### 3. Run the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Sample Test Data

You can create a lead with this sample payload:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "9876543210",
  "source": "Website Contact Form",
  "status": "new"
}
```

You can add a note with:

```json
{
  "text": "Called the client and scheduled a product demo."
}
```

## Project Workflow

This project was built in steps:

1. Backend setup
2. Authentication module
3. Lead APIs
4. Notes APIs
5. Frontend dashboard
6. Frontend-backend integration

## Future Improvements

- Search and filter leads
- Better form validation
- Pagination
- Toast notifications
- Deployment to Render, Railway, or Vercel

## Author

Shwetha R
