FROM node:16.15

# copy app files
COPY ./public /app/public
COPY ./index.js /app
COPY ./package.json /app

# set working directory to app
WORKDIR /app

# expose app to port
EXPOSE 3000

# install app packages
RUN npm i

# Build the front-end app
# RUN npm run prod

# run app start command
CMD ["node", "index.js"]