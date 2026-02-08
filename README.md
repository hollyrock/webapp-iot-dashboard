# IOT dashboard

== NOTICE ==
THIS PROJECT IS UNDER DEVELOPMENT

## SUMMARY

Dashboard web appliacation to analyze captured data sent from sensor devices (nodes) via TTN.

## HOW TO RUN

1. create .env/.env.app file under project folder for .env and under backend folder for .env.app like sample (COMMON)
2. run 'docker compose -d db' (DEBUG)
3. run 'python manage.py migrate' (DEBUG)
4. run 'python manage.py runserver 0.0.0.0:8888' (DEBUG)

### sample : .env/.env.app

```
SECRET_KEY="your-django-secret-key"
DB_NAME="your-database-name"
DB_USER="user-name"
DB_PASSWORD="password"
#DB_HOST="db" for production
DB_HOST="localhost" # for debug
DB_PORT="5432"
```