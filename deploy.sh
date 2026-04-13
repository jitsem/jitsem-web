#!/usr/bin/env bash
set -euo pipefail

SERVER="${REMOTE_SERVER:-root@<your-hetzner-ip>}"
REMOTE_DIR="/opt/jitsem-web"

echo "→ Building image (linux/amd64)..."
docker build --platform linux/amd64 -t jitsem_website:latest .

echo "→ Transferring image..."
docker save jitsem_website:latest | ssh "$SERVER" 'docker load'

echo "→ Restarting container..."
ssh "$SERVER" "cd $REMOTE_DIR && docker compose up -d --no-build jitsem_website"

echo "✓ Done — https://www.jitsem.be"
