FROM node:20-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./config ./config
COPY ./src ./src
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./vite.config.ts .
COPY ./index.html .
ENV NODE_ENV=prod
RUN npm i
RUN npm run build:prod

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]