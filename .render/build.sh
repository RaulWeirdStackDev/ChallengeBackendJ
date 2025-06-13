#!/usr/bin/env bash
# Forzar instalación de devDependencies
npx prisma generate
npm install
npm run build

# Instalar dependencias de producción.