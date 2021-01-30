FROM node

RUN npm cache clean --force
WORKDIR /usr/app
RUN npm install
RUN npm audit fix --force
RUN npm install --save react-geocode