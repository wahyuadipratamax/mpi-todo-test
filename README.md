# To-Do List CRUD Application

Technical Test Submission untuk Junior Web Developer

## Tech Stack

### Backend
- Laravel
- MySQL
- REST API

### Frontend
- Next.js
- React
- Axios

---

## Features

- Create Task
- Read All Tasks
- Update Task
- Delete Task
- Update Task Status (Pending / Done)
- Error Handling

---

## Project Structure

```
todo-app/
│
├── backend/   (Laravel REST API)
└── frontend/  (Next.js)
```

---

# Backend Installation

```bash
cd backend
```

Install dependency

```bash
composer install
```

Copy environment

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure database inside `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_db
DB_USERNAME=root
DB_PASSWORD=
```

Run migration

```bash
php artisan migrate
```

Run backend server

```bash
php artisan serve
```

Backend URL

```
http://127.0.0.1:8000
```

---

# Frontend Installation

```bash
cd frontend
```

Install dependency

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |

---

# API Response

Example

```json
{
    "success": true,
    "message": "Task berhasil dibuat",
    "data": {
        "id": 1,
        "judul": "Setup Backend",
        "deskripsi": "Setup BE Laravel 12",
        "status": "pending"
    }
}
```

---

# Screen Recording

Screen recording demonstration:

> On process

---

# Author

**Wahyu Adi Pratama**
