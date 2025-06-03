# Sisters-Deko Gallery Backend

This is the Django backend for the Sisters-Deko website, providing an admin interface to manage gallery images and categories, as well as an API for the frontend.

## Features

- Django Admin interface for uploading and managing gallery images
- REST API for gallery data
- Integration with Next.js frontend
- Category-based organization

## Installation and Setup

### 1. Set up the virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run migrations

```bash
python manage.py migrate
```

### 4. Create a superuser

```bash
python manage.py createsuperuser
```

### 5. Import initial data (optional)

```bash
python manage.py import_initial_data
```

### 6. Run the server

```bash
python manage.py runserver
```

## API Endpoints

- `/api/` - API root
- `/api/categories/` - List of all categories
- `/api/images/` - List of all gallery images
- `/api/images/?category=hochzeiten` - Filter images by category

## Integrating with Next.js Frontend

1. Create a `.env.local` file in your Next.js root directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

2. Update your Next.js components to fetch data from the API endpoints

## Admin Usage

1. Navigate to `http://localhost:8000/admin/`
2. Login with your superuser credentials
3. Use the admin interface to:
   - Create and manage categories
   - Upload and manage gallery images
   - Edit image details like descriptions and categories

## Development

### Adding dependencies

If you add new dependencies, update the requirements.txt file:

```bash
pip freeze > requirements.txt
```
