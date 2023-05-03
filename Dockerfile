FROM node:17.6 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:17.6 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/build ./src
RUN npm install --only=production

FROM node:17.6-alpine
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
USER 1000
CMD ["src/server.js"]