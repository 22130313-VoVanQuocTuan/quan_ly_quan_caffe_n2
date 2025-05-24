# Dockerfile
FROM node:18

WORKDIR /app

# Chỉ copy package.json và lock file trước, để tận dụng cache
COPY package*.json ./

# Cài lại đúng cho Linux
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev"]