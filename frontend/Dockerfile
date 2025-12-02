# frontend/Dockerfile

# 1. Imagem base Node.js
FROM node:20-alpine

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copiar package.json e package-lock.json / yarn.lock
COPY package*.json ./

# 4. Instalar dependências
RUN npm install

# 5. Copiar todo o código do frontend
COPY . .

# 6. Expor porta de desenvolvimento
EXPOSE 3000

# 7. Comando para rodar o Vite no modo dev (host acessível externamente)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
