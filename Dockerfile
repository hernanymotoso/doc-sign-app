FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl openssl-dev

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
