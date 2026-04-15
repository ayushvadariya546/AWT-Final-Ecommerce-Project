# KRIVIA E-Commerce Platform

Full-stack e-commerce application for handcrafted brass products, with separate customer and admin experiences.

## Tech Stack
- Frontend: React 19, Vite, React Router
- Backend: Node.js, Express 5, MongoDB, Mongoose
- Auth: JWT + role-based access (`client`, `admin`)

## Features
- Customer flow: browse products, view categories, add to cart, checkout, view orders
- Admin flow: manage products, view/manage orders, view customers
- Authentication and authorization with protected routes
- Seed script to populate demo users, categories, products, and orders
- Automatic admin account sync on backend startup

## Project Structure
```text
.
+-- backend/        # Express API + MongoDB models/controllers/routes
+-- ecommerce/      # React + Vite frontend
+-- package.json    # Root scripts to run frontend and backend together
+-- README.md
```

## Prerequisites
- Node.js 18+
- npm 9+
- MongoDB running locally (or update connection string)

## Environment Variables
Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong_admin_password
```

Notes:
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used at startup to create/sync an admin user.
- Frontend API requests use `/api/*` and Vite proxies them to `http://localhost:5000` in development.

## Installation
From the repository root:

```bash
npm install
npm --prefix backend install
npm --prefix ecommerce install
```

## Running the Project
From the repository root:

```bash
npm run dev
```

This starts:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

Run apps separately:

```bash
npm run dev:backend
npm run dev:frontend
```

## Database Seeding
To seed demo data:

```bash
npm --prefix backend run seed
```

This clears existing users/categories/products/orders and inserts sample data.

## Main Scripts
Root (`package.json`):
- `npm run dev` - run backend + frontend concurrently
- `npm run dev:backend` - run backend only
- `npm run dev:frontend` - run frontend only

Backend (`backend/package.json`):
- `npm run dev` - start backend with nodemon
- `npm run start` - start backend with node
- `npm run seed` - seed sample data

Frontend (`ecommerce/package.json`):
- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Overview
Base URL: `/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile` (protected)

### Products
- `GET /products`
- `GET /products/:id`
- `POST /products` (admin)
- `PUT /products/:id` (admin)
- `DELETE /products/:id` (admin)

### Categories
- `GET /categories`
- `POST /categories` (admin)
- `DELETE /categories/:id` (admin)

### Orders
- `POST /orders` (protected)
- `GET /orders` (admin)
- `GET /orders/myorders` (protected)
- `GET /orders/:id` (protected)
- `PUT /orders/:id/pay` (protected)
- `PUT /orders/:id/deliver` (admin)

### Users
- `GET /users` (admin)

## Default Access
If seeded using current `backend/seeder.js`, demo admin credentials are:
- Email: `krivia@exa.com`
- Password: `password123`

If not seeded, backend startup uses `.env` admin credentials.

## License
ISC
