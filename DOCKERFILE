FROM jrottenberg/ffmpeg:4.3-centos7

WORKDIR /

ENV TZ="Asia/Shanghai" HOME="/" VERSION=v14.16.0
RUN yum -y install wget
RUN wget https://nodejs.org/dist/${VERSION}/node-${VERSION}-linux-x64.tar.xz

RUN xz -d node-${VERSION}-linux-x64.tar.xz && tar -xf node-${VERSION}-linux-x64.tar 

RUN mv node-${VERSION}-linux-x64 /node
RUN rm -f node-${VERSION}-linux-x64.tar.xz
RUN rm -f node-${VERSION}-linux-x64.tar


RUN ln -s /node/bin/node /usr/local/bin/
RUN ln -s /node/bin/npm /usr/local/bin/


RUN npm install pm2 -g
RUN npm install cnpm -g

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
