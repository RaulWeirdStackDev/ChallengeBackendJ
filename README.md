# Challenge Backend J

Este proyecto es una API RESTful construida con TypeScript, Express, PostgreSQL y Prisma ORM que gestiona productos y autenticación de usuarios. Incluye documentación Swagger y testing con Jest y SuperTest..

---

## 🏗️ Arquitectura

- **Express** para crear el servidor, definir rutas y middlewares
- **Prisma ORM** con PostgreSQL para acceder a la base de datos
- **JWT** para autenticación
- **Swagger (OpenAPI)** para documentación interactiva
- **Tests** con Jest y Supertest

📁 Estructura general:

src/

│

├── controllers/

├── routes/

├── middlewares/

├── db/

├── generated/

├── app.ts

└── index.ts

│

dist/

│

docs/

└── swaggerOptions.ts

|

prisma/

└── schema.prisma

|

tests/

└── all.tests.ts


## 🚀 Levantar localmente


git clone https://github.com/RaulWeirdStackDev/ChallengeBackendJ.git
cd ChallengeBackendJ

npm install
npx prisma migrate dev
npm run dev

Rutas:

Abiertas:

GET: Ver todos los productos --> http://localhost:3001/api/products/
GET: Ver un producto específico (ejemplo el con id=1) -->http://localhost:3001/api/products/1
POST: Registrar un nuevo usuario --> http://localhost:3000/api/auth/register
POST: Ingresar un usuario ya registrado --> http://localhost:3000/api/auth/login

Protegidas:

GET: Ver todos los usuarios --> localhost:3000/api/auth/usuarios
GET: Ver un usuario específico --> http://localhost:3000/api/auth/usuarios/1
POST: Crear un producto --> http://localhost:3001/api/products/
PUT: Actualizar un producto --> http://localhost:3001/api/products/1
DELETE: Eliminar un producto --> http://localhost:3001/api/products/1

Documentación creada con Swagger en: Accede a la documentación en: http://localhost:3000/api-docs

🧪 Testing
npm run test
