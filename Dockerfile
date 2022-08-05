FROM node:14-alpine AS build

WORKDIR /usr/src/app

RUN yarn install --registry=https://registry.yarnpkg.com/
COPY package.json ./
COPY yarn.lock .
RUN yarn install

COPY  . .

RUN yarn build


FROM node:14-alpine as release
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

ENTRYPOINT ["node", "dist/main"]