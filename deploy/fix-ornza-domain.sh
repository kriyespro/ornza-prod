#!/usr/bin/env bash
# Run on the VPS as root: bash deploy/fix-ornza-domain.sh
set -euo pipefail

echo "=== 1. Which nginx configs mention ornza.com? ==="
grep -r "ornza.com" /etc/nginx/sites-enabled/ /etc/nginx/sites-available/ 2>/dev/null || true

echo ""
echo "=== 2. Test Docker app (should be HTTP 200) ==="
curl -sI -H "Host: ornza.com" http://127.0.0.1:8080/ | head -3

echo ""
echo "=== 3. Test host HTTPS (currently broken if HTTP 400) ==="
curl -skI -H "Host: ornza.com" https://127.0.0.1/ | head -3

echo ""
echo "=== 4. Django ALLOWED_HOSTS inside Docker ==="
docker compose --env-file .env.prod exec -T web python -c \
  "from django.conf import settings; print('ALLOWED_HOSTS:', settings.ALLOWED_HOSTS)"

echo ""
echo "=== Done. If step 2=200 but step 3=400, replace /etc/nginx/sites-enabled/ornza ==="
echo "    sudo cp deploy/host-nginx-ornza.conf /etc/nginx/sites-available/ornza"
echo "    # Keep your existing ssl_certificate lines in that file!"
echo "    sudo nginx -t && sudo systemctl reload nginx"
