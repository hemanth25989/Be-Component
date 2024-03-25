FROM node:lts-alpine

WORKDIR /src/app

COPY ["package.json","package-lock.json", "./"]

COPY . /src/app

RUN  npm install

EXPOSE  5000

RUN chown -R node /src/app

USER node

CMD ["npm", "start"]