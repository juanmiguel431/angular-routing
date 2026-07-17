FROM node:24.18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --force

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=4000

RUN addgroup -S nodejs && adduser -S angular_usr -G nodejs

COPY --from=builder /app/dist ./dist

USER angular_usr

EXPOSE 4000

CMD ["node", "dist/angular-routing/server/server.mjs"]
