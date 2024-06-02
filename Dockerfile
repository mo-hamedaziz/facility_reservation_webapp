# Build client
FROM node:16 as client-build
WORKDIR /app
COPY ./client/package.json ./client/package-lock.json ./client/vite.config.js /app/
RUN npm install
COPY ./client /app/
RUN npm run build

# Setup server
FROM node:16
WORKDIR /app
COPY ./server/package.json ./server/package-lock.json /app/
RUN npm install
COPY ./server /app/

# Handle root level package.json
COPY ./package.json ./package-lock.json ./node_modules /app/
RUN npm install

EXPOSE 5000

ENTRYPOINT [ "npm" ]
CMD ["start"]