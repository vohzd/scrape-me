FROM mhart/alpine-node

WORKDIR /src

COPY package.json .

RUN apk add --no-cache --virtual .gyp python make g++
RUN npm i

COPY . .

EXPOSE 5566

CMD ["npm", "start"]
