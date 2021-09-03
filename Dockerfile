FROM node:14-alpine

EXPOSE 8080
# Bundle APP files
COPY . .

# Install app dependencies
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production

CMD ["yarn", "start"]
