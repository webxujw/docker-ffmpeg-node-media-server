FROM jrottenberg/ffmpeg:4.3-centos7

WORKDIR /

ENV TZ="Asia/Shanghai" HOME="/" VERSION=v14.16.0
RUN curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -

RUN yum install nodejs -y

RUN npm install yarn -g
RUN yarn global add pm2

COPY entrypoint.sh /
RUN chmod 755 /entrypoint.sh

EXPOSE 8000
# Http Server started on port: 8000
# Node Media WebSocket Server started on port: 8000

EXPOSE 8080
# ws 地址

EXPOSE 1935
# Rtmp Server

ENTRYPOINT ["/entrypoint.sh"]
# CMD [ "pm2-runtime", "pm2.json"]
