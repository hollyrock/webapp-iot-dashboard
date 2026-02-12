# Kicori - IoT Dashboard

This project is an IoT dashboard web application designed to analyze data from sensor devices.

## Core Technologies

*   **Backend:** Django, Django REST Framework, PostgreSQL
*   **Frontend:** Vue.js 3, Vuetify, Axios, Vite
*   **Infrastructure (Development):** Docker, Docker Compose

## Building and Running the Project

The project uses Docker Compose for the backend and database, and a separate development server for the frontend.

### Prerequisites

*   Docker and Docker Compose
*   Node.js and npm (for frontend development)

### Backend and Database Setup (Docker Compose)

1.  **Create `.env` file:** In the project root directory (`webapp-mars/`), create a `.env` file with your database credentials and Django secret key.

    ```
    SECRET_KEY="your-django-secret-key"
    DB_NAME="your-database-name"
    DB_USER="user-name"
    DB_PASSWORD="password"
    DB_HOST="db" # Hostname for the database service within Docker Compose
    DB_PORT="5432"
    ```

2.  **Start Services:** Build and run the PostgreSQL database and Django backend services for production.
    ```bash
    docker-compose up -d --build
    ```

3.  **Run Migrations:** Apply Django database migrations.
    ```bash
    docker-compose exec backend python manage.py migrate
    ```
    The Django development server will be running on `http://localhost:8000`.

### Backend Development

1.  **Start PostgreSQL docker service:**
    ```bash
    docker compose up -d db
    ```

2.  **Navigate to Backend Directory:**
    ```bash
    cd backend
    ```

3.  **Install Dependencies:**
    ```bash
    pip install -r requirement.txt
    ```

4.  **Start Development Server:**
    ```bash
    python manage.py runserver 0.0.0:8888
    ```

### Frontend Development

1.  **Navigate to Frontend Directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    The Vite development server typically runs on `http://localhost:5173` and proxies API requests to the Django backend.

## Development Commands

### Generate Dummy Sensor Data

This command generates 144 records of dummy sensor data, useful for populating your development database.

*   **Generate Data:**
    ```bash
    docker-compose exec backend python manage.py generate_dummy
    ```

*   **Clear All Dummy Data:**
    To delete all existing sensor data records before generating new ones:
    ```bash
    docker-compose exec backend python manage.py generate_dummy --clear
    ```
