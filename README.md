# FitMetrics

FitMetrics est une application de suivi et de gestion d'entraînements sportifs dotée d'une architecture moderne. Elle permet d'enregistrer, de modifier et d'analyser facilement vos sessions de sport au quotidien.

## Initialisation du projet

### Méthode 1 : Installation automatique (Recommandé)

Exécutez simplement le script de configuration puis lancez l'application :

```bash
chmod +x setup.sh
./setup.sh
npm run dev
```

### Méthode 2 : Installation manuelle

Configurez manuellement l'environnement :

```bash
# 1. Configuration des variables d'environnement du serveur
echo 'DATABASE_URL="file:./dev.db"' > server/.env

# 2. Installation des dépendances
npm install

# 3. Configuration de la base de données SQLite et génération de Prisma
cd server
npx prisma db push
npx prisma generate
cd ..

# 4. Lancement de l'application (Frontend + Backend)
npm run dev
```
