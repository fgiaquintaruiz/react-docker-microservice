FROM node:12

COPY . /opt/app

WORKDIR /opt/app/users-service

RUN yarn

CMD bash -c "yarn dbcreate && yarn dbmigrate && yarn watch"