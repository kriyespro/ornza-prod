#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
until python - <<'PY'
import os
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

import django
django.setup()

from django.db import connection

try:
    connection.ensure_connection()
except Exception:
    sys.exit(1)
PY
do
  sleep 2
done

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers "${GUNICORN_WORKERS:-3}" \
    --threads "${GUNICORN_THREADS:-2}" \
    --timeout "${GUNICORN_TIMEOUT:-120}" \
    --access-logfile - \
    --error-logfile -
