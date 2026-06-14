FROM node:20-alpine

WORKDIR /app

# Install pnpm and tsx globally
RUN npm install -g pnpm tsx

COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Install dependencies with pnpm (required for workspace link resolutions)
RUN pnpm install

COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

EXPOSE 8080

CMD ["tsx", "src/index.ts"]


