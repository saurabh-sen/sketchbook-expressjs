FROM node

# Create app directory
WORKDIR /sketchbook

# Copy all files
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

ENTRYPOINT ["npx", "ts-node", "src/index.ts"]