# Cartly — E-Commerce Full-Stack Application

Spring Boot 3 + JPA/MySQL backend and React (Vite) + Tailwind + Redux Toolkit frontend.

## Free demo deploy

See **[DEPLOY.md](./DEPLOY.md)** for GitHub + Cloudflare Pages + Render (₹0).

## Project structure

```
ecommerce-app/
├── backend/          # Spring Boot REST API
├── frontend/         # React SPA
└── postman/          # API collection for Postman
```

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 18+
- MySQL 8+

## Database setup

Create the database (or let Spring create it automatically):

```sql
CREATE DATABASE IF NOT EXISTS spring2025;
```

Update credentials in `backend/src/main/resources/application.properties` if needed:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

## Run backend

```bash
cd backend
mvn spring-boot:run
```

API base URL: `http://localhost:8080/api`

### Seed accounts

| Role  | Email           | Password  |
|-------|-----------------|-----------|
| Admin | admin@shop.com  | admin123  |
| User  | user@shop.com   | user123   |

Sample categories (Electronics, Clothing, Home & Kitchen) and 7 products are loaded on first startup.

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` to the backend.

## API overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/products` | Public | List products |
| GET | `/api/products/{id}` | Public | Product details |
| GET | `/api/categories` | Public | List categories |
| POST/PUT/DELETE | `/api/admin/products/**` | Admin | Product CRUD |
| POST/PUT/DELETE | `/api/admin/categories/**` | Admin | Category CRUD |
| GET/POST | `/api/cart/**` | User | Cart operations |
| POST/GET | `/api/orders/**` | User | Place & track orders |
| POST | `/api/payments/process` | User | Mock payment |
| PATCH | `/api/orders/{id}/status` | Admin | Update order status |

All responses use DTOs (entities are never exposed directly).

## Postman

Import `postman/Ecommerce-API.postman_collection.json`.

1. Run **Login (User)** or **Login (Admin)** — token is saved to collection variable `token`.
2. Use Cart → Orders → Payments requests in sequence.

## Frontend pages

- **Home** — product grid with category filters
- **Product details** — add to cart
- **Cart** — update quantities, checkout link
- **Checkout** — place order + mock payment
- **Login / Register** — JWT stored in `localStorage`
- **Admin dashboard** — product & category CRUD (admin only)

## Tech stack

**Backend:** Spring Boot 3.3, Spring Security + JWT, Spring Data JPA, Hibernate, MySQL, Bean Validation, Lombok

**Frontend:** React 18, Vite 5, Tailwind CSS 3, Redux Toolkit, Axios, React Router 6
