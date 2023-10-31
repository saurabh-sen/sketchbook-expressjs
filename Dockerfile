# Stage 1: Build the Node.Js application
FROM node:20 as builder

# Create build directory
WORKDIR /sketchbookBackendBuild

# Copy all files
COPY package.json yarn.lock ./

RUN yarn index

COPY . .

# Stage 2: Create a smaller image for running the application
FROM node:20 as runner

# Create app directory
WORKDIR /sketchbookBackend

# Copy build files
COPY --from=builder /sketchbookBackendBuild/package.json ./package.json
COPY --from=builder /sketchbookBackendBuild/node_modules ./node_modules
COPY --from=builder /sketchbookBackendBuild/dist ./dist

# Run the application
CMD ["yarn", "start"]