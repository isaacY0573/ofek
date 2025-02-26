
# Use Node.js as the base image
FROM node:22.14.0-alpine

# Use Node.js as base image for building
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port
EXPOSE 3000

# Start React app
CMD ["npm", "run", "dev"]
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Use a lightweight Nginx image to serve the built app
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/project
COPY --from=builder /app/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

