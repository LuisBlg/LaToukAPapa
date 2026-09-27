#!/bin/bash

set -e

cd /home/deploy/LaToukAPapa

echo "=== Récupération du code ==="
git pull origin main

echo "=== Reconstruction des images Docker ==="
docker compose build

echo "=== Redémarrage des services ==="
docker compose up -d

echo "=== État des conteneurs ==="
docker compose ps

echo "=== Déploiement terminé ==="
