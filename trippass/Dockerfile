# Step 1: Build the React application
FROM node:14 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Step 2: Serve the application with nginx
FROM nginx:alpine

# Copy the build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Add a script to handle environment variables and replace placeholders
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80
CMD ["docker-entrypoint.sh"]
