# get the base node image
FROM node:alpine as builder

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package*.json /frontend 

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# Stat npm 
CMD ["npm", "start"]

# Handle Nginx
# FROM nginx
# COPY --from=builder /frontend/build /usr/share/nginx/html
# COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf