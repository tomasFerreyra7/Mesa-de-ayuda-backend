# ── Stage 1: build ─────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar todas las dependencias (incl. dev para compilar)
RUN npm ci

# Copiar código fuente y compilar
COPY . .
RUN npm run build

# ── Stage 2: producción ───────────────────────────────────────
FROM node:22-alpine AS production

WORKDIR /app

# Usuario no root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Solo dependencias de producción
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiar el build desde el stage anterior
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

USER nestjs

EXPOSE 8080

# Variables de entorno se inyectan al ejecutar el contenedor (docker run -e, compose, etc.)
ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "dist/main.js"]
