# Use Node.js base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json first (better for caching)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]