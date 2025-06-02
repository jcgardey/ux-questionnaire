FROM node:20-alpine

WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/jcgardey/ux-questionnaire.git

WORKDIR /app/ux-questionnaire

RUN npm install serve -g
RUN npm install
RUN npm run build

RUN chmod 777 ./start.sh
EXPOSE 3000
CMD ["./start.sh"] 