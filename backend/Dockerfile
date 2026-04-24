# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Stage 2: Build & Run
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm tsx

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 8080

CMD ["tsx", "src/index.ts"]
