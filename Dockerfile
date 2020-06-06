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
COPY package.json .


EXPOSE 5566

WORKDIR /src
RUN yarn add puppeteer
RUN yarn install
COPY . .

CMD ["npm", "start"]
