FROM node:12.16.3
RUN npm install -g json-server
WORKDIR /db
CMD ["json-server", "-H", "0.0.0.0", "db.json"]