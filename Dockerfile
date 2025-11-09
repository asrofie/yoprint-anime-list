FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .

RUN bun run build

CMD ["bun", "dev", "--host", "0.0.0.0"]