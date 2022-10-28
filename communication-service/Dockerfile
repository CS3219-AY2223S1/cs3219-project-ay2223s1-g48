FROM node:16
ENV NODE_ENV=production
RUN apt-get clean && apt-get -y update && apt-get install -y locales && locale-gen en_US.UTF-8
ENV LANG='en_US.UTF-8' LANGUAGE='en_US.UTF-8' LC_ALL='en_US.UTF-8'
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME
COPY package*.json ./
RUN npm install -g nodemon@2.0.19
RUN npm install
COPY . .
EXPOSE 8081
CMD [ "npm", "run", "dev" ]
