# Reflection

## GitHub Repository
https://github.com/lizalise21/IMY210-A3

## Experience

Working with Docker and Strapi for the first time was both challenging and rewarding. Setting up Strapi was relatively straightforward though. However, configuring the relations between content types correctly took some trial and error. I initially set them as one-to-one instead of many-to-one, which caused issues where assigning an author to one post would remove it from another.

Docker proved to be the most challenging part of the assignment. I initially struggled to understand why my frontend container could not reach the Strapi backend using localhost, the key insight was that localhost inside a Docker container refers to the container itself, not the host machine.

Overall, I learned how containerisation works in practice, how environment variables are used to configure applications across different environments, and how to structure a full-stack project with a headless CMS.

## Commands to Run

### Backend
```bash
cd backend
docker build -t blog-backend .
docker network create blog-network
docker run -p 1337:1337 --network blog-network --name strapi blog-backend
```

### Frontend
```bash
cd frontend
docker build -t blog-frontend .
docker run -p 3000:3000 --network blog-network -e NUXT_PUBLIC_STRAPI_URL=http://strapi:1337 blog-frontend
```

The blog will be available at http://localhost:3000.
The Strapi admin panel will be available at http://localhost:1337/admin.

> Note: After running the backend for the first time, you will need to create an admin account at http://localhost:1337/admin and enable public permissions for Post, Author, and Category (find and findOne) under Settings → Users & Permissions → Roles → Public.