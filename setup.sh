#!/bin/bash

set -e

echo "==============================================="
echo "🚀 Initialisation du projet FitMetrics..."
echo "==============================================="

echo -e "\n⚙️ Configuration du Backend (/server)..."
if [ ! -f server/.env ]; then
  echo "📄 Création du fichier server/.env..."
  echo 'DATABASE_URL="file:./dev.db"' > server/.env
  echo "✅ server/.env généré avec la connexion SQLite."
else
  echo "✅ Le fichier server/.env existe déjà."
fi

echo -e "\n📦 Installation des dépendances (NPM)..."
npm install

echo -e "\n💾 Configuration de la base de données SQLite..."
cd server
npx prisma db push
npx prisma generate
cd ..

echo -e "\n==============================================="
echo "🎉 Configuration terminée avec succès !"
echo "👉 Lancez simplement 'npm run dev' pour démarrer."
echo "==============================================="
