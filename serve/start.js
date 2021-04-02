/*
 * @Author: xujianwei
 * @Date: 2021-04-01 15:16:43
 * @LastEditors: xujianwei
 * @LastEditTime: 2021-04-02 16:42:26
 */


const WebSocket = require('ws');
const child_process = require('child_process')

const ws = new WebSocket.Server({ port: 8080 });
// server.js
ws.on('connection', (ws) => {
    const ffmpeg = child_process.spawn('ffmpeg', [
      // 从 stdin 中读入视频数据
      '-i', '-',
      // 视频转码
      // 由于视频已经是 H.264 编码，可以直接复制
      // 若需要转码则填 libx264
      '-vcodec', 'copy',
      // 音频转码
      '-acodec', 'aac',
      // 输出为 flv 格式
      '-f', 'flv',
      // RTMP 服务器
      // RTMP_SERVER
      // 生成本地文件
      'rtmp://127.0.0.1:1935/live/xldou'
    ]);
    ws.on('message', (msg) => {
      // 收到时 msg 的类型是 Buffer
      ffmpeg.stdin.write(msg);
    });
});

const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();


nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
