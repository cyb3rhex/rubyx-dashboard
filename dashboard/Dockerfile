FROM node:16-alpine as dev
WORKDIR /root/
CMD echo "getting latest npm modules" \
    && yarn \
    && echo "installation complete, starting" \
    && yarn start

FROM node:16-alpine as build
WORKDIR /root
COPY ./package*.json ./
RUN yarn
COPY . . 
RUN yarn build -o app

FROM nginx:alpine as prod
EXPOSE 3000
COPY --from=build /root/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
