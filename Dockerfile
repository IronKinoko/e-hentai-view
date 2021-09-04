FROM node:14-alpine as build

WORKDIR /app
COPY . .
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production

FROM node:14-alpine as production
WORKDIR /app
EXPOSE 8080
COPY --from=build /app .

CMD ["yarn", "start"]
