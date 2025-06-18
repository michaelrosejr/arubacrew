FROM node:20.19.2 AS build

WORKDIR /app

COPY package*.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20.19.2 AS run

WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
