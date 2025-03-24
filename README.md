# LanguageTutor App

Language Tutor App is a full-stack web application that connects students with language teachers online.
It provides an intuitive interface for finding, booking, and managing language lessons, with role-based user functionality and a modern UI/UX.


## Features

 Authentication & Authorization:
  - Users can register and log in as a Teacher (User).
  - Secure route protection for authenticated access.
  - Refresh token stored in cookies, access token managed via Redux Persist.

 Multi-Page Application:
  - Built with a clear separation of routes using React Router.
  - Dedicated pages for home, teachers list, teacher profile, profile page.

 Teachers List Page:
  View all available teachers.
  - Includes pagination and filtering by:
    - Language
    - Proficiency level
    - Price range

 Teacher Card Functionality:
  - Displays rating, brief profile, and avatar.
  - Options to:
    - Add to favorites or remove from favorites
    - Open full teacher profile with detailed information
    - Book a lesson using a calendar modal with available time slots

 Booking System:
  - Users can book lessons through a modal calendar interface.
  - Displays available time slots.
  - Confirmation and error toast notifications upon booking.

 Favorites Management:
  - Students can maintain a list of favorite teachers.
  - Easily accessible from profile.

 Profile Page:
  - Edit personal information and change password
  - Upload new avatar via Cloudinary
  - View:
    - Upcoming booked lessons
    - Today's lessons
    - List of favorite teachers

- Backend Implementation:
  - Built with Express and MongoDB
  - Passwords hashed with bcrypt
  - JWT authentication (access + refresh tokens)
  - CORS configured and secure APIs with protected routes
  - File uploads handled with Multer + Cloudinary


## Tech Stack

### Frontend:
- React
- Redux Toolkit + Redux Persist
- React Router DOM
- React Hook Form
- React Hot Toast
- Axios
- Flatpickr (calendar UI)
- React Icons
- React Loader Spinner

### Backend:
- Express
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Multer
- Cloudinary
- Dotenv
- Cors
- Cookie Parser


## Getting Started

Clone the repository:
git clone https://github.com/TetianaChehrina//language-tutor-app.git

Install dependencies:
npm install
