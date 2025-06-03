# Sisters Deko Website

A modern wedding and event decoration website built with Next.js and Django.

## Features

- Modern, responsive design
- Dynamic content management through Django admin
- Testimonials section
- Gallery with categories
- Contact form
- Admin dashboard

## Tech Stack

- Frontend: Next.js 15.2.4
- Backend: Django 5.2
- Database: SQLite
- Styling: Tailwind CSS

## Setup

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Set up Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the development servers:
   - Backend: `python manage.py runserver 8001`
   - Frontend: `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

## License

MIT
