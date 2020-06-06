FROM mhart/alpine-node

# Installs latest Chromium (77) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN yarn add puppeteer

WORKDIR /src
COPY package.json .
RUN npm i
COPY . .

EXPOSE 5566

CMD ["npm", "start"]
