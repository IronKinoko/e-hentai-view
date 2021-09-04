FROM node:14-alpine as build

WORKDIR /app
COPY . .
RUN yarn install
RUN node scripts/buildTime.js
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production

FROM node:14-alpine as production
WORKDIR /app
EXPOSE 8080
COPY --from=build /app .

CMD ["yarn", "start"]
