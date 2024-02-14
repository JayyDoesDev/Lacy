FROM node:20

WORKDIR /lacy

COPY package*.json ./

RUN yarn

COPY  . .

EXPOSE 3000:8080

CMD ["yarn", "start"]
