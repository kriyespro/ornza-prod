#!/usr/bin/env bash
# ORNZA production helpers — always loads .env.prod
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${ENV_FILE:-.env.prod}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE — copy .env.prod.example and edit it first."
  exit 1
fi

compose() {
  docker compose --env-file "$ENV_FILE" "$@"
}

case "${1:-}" in
  up)
    compose up --build -d
  ;;
  down)
    compose down "${@:2}"
  ;;
  reset)
    echo "Stopping containers and removing volumes (fresh database)..."
    compose down -v
  ;;
  logs)
    compose logs -f "${@:2}"
  ;;
  migrate)
    compose exec web python manage.py migrate --noinput
  ;;
  superuser)
    compose exec web python manage.py createsuperuser
  ;;
  seed)
    compose exec web python manage.py seed
  ;;
  shell)
    compose exec web python manage.py shell
  ;;
  ps)
    compose ps
  ;;
  *)
    cat <<EOF
Usage: ./scripts/deploy.sh <command>

  up         Build and start (detached)
  down       Stop containers
  reset      Stop and delete volumes (use after bad first deploy)
  migrate    Run Django migrations
  superuser  Create admin user
  seed       Load sample catalog data
  logs       Follow logs (optional service: web, db, nginx)
  ps         Show container status

Set WEB_PORT in .env.prod (default 8080) if port 80 is taken.
App URL: http://YOUR_SERVER_IP:\${WEB_PORT:-8080}
EOF
  ;;
esac
