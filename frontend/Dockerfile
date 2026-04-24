# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Stage 2: Run Development
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry disable (Optional)
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["pnpm", "dev"]
