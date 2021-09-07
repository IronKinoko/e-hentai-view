FROM --platform=$BUILDPLATFORM node:14-alpine
WORKDIR /app
EXPOSE 8080
COPY . .

RUN chmod +x scripts/build-in-docker.sh
RUN scripts/build-in-docker.sh

CMD ["yarn", "start"]
