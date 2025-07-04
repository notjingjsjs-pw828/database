# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]