FROM node:12

COPY . /opt/app

WORKDIR /opt/app

RUN yarn

CMD bash -c "yarn dbcreate && yarn dbmigrate && yarn watch"