FROM node:12-alpine

# Create app directory
WORKDIR /temp

VOLUME [ "/mounted_app", "/spa_build" ]


COPY ./entrypoint.sh /entrypoint.sh
RUN ["chmod", "+x", "/entrypoint.sh"]
ENTRYPOINT [ "/entrypoint.sh" ]