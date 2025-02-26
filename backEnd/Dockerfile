# Use Node.js as base image
FROM node:20 AS server

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy the rest of the app
COPY . .

# Expose the port your backend uses (e.g., 5000)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
 
