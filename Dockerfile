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

# Bump version
ARG VERSION="v0.0.0-dev"
RUN npm version ${VERSION} --no-git-tag-version

# FROM node:20-alpine 
# WORKDIR /app

# Upgrade packages
# RUN apk upgrade --no-cache && \
#     rm -rf /var/cache/apk/*

# Setup user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nodejs

# Gather files
# RUN mkdir config && chown nodejs:nodejs ./config
# COPY --chown=nodejs:nodejs --from=build /app/node_modules ./node_modules
# COPY --chown=nodejs:nodejs --from=build /app/package.json /app/package-lock.json /app/tsconfig.json /app/vite.config.ts /app/index.html ./
# COPY --chown=nodejs:nodejs /config/index.js ./config/

# USER nodejs
EXPOSE 80

#CMD npm run dev:prod
CMD ["npm", "run", "dev:prod"]