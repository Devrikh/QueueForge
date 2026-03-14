FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig*.json ./

COPY api ./api
COPY worker ./worker

RUN npm run build:api
RUN npm run build:worker

EXPOSE 3000

CMD ["npm", "run", "start:api"]