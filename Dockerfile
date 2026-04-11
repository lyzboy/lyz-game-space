#Dockerfile for a Next.js Application
# --- Build Stage ---
# Create a container for building the project
# Set the builder. Ensure Node.js version matches you project's requirements
FROM node:20-alpine AS builder
# Set the working directory
WORKDIR /app
# Copy all files the begin with package and end with .json to the working directory
COPY package*.json ./
# Install dependencies use npm
RUN npm install
# Copy the projects files over to the container. first (.) from current directory and second (.) to current workdir in container
COPY . .
# Build the project
RUN npm run build

# --- Production Stage ---
# This stage creates a container that will contain the bare minimum to run
# the web app. It will be much smaller and more efficient than the build
# container.

# Create a new container, different from build stage
# Use the same Node.js version for the final image
FROM node:20-alpine
# Create a working dir
WORKDIR /app
# Copy over the NEEDED files from build container to production container
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Copy the markdown content files
COPY --from=builder /app/content ./content
# Allow port 3000 to be found
EXPOSE 3000
# run the command to start the server
CMD ["npm", "start"]