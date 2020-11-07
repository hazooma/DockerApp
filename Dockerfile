FROM node:12.10-alpine


# create root application folder
WORKDIR /app


COPY package*.json ./
RUN npm install

# copy source code to /app/src folder
ADD . .

RUN npm run build


COPY tsconfig.json ./dist/
COPY .env ./dist/

WORKDIR ./dist/



# check files list
RUN ls -a

# expose server and debug port
EXPOSE 8080 5858



# run application
CMD ["node", "src/index.js"]