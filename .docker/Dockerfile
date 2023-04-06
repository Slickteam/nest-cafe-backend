FROM node:18.15.0-alpine

EXPOSE 3000
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY ./dist /app/dist

# start the app
CMD [ "npm", "run", "start" ]
