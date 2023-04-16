import { createSocket } from 'dgram';
import { Logger } from '@nestjs/common';

export async function getDeviceIP(logger: Logger): Promise<string> {
  return new Promise<string>((resolve) => {
    const broadcastAddress = '255.255.255.255';
    const sendPingPort = 10211;
    const sendSocket = createSocket('udp4');

    sendSocket.bind(() => {
      sendSocket.setBroadcast(true);
      sendSocket.send(
        Buffer.from('ping'),
        sendPingPort,
        broadcastAddress,
        () => {
          sendSocket.close();
        },
      );
    });

    const receivePingPort = 2255;
    const receiveSocket = createSocket('udp4');

    const timeout = setTimeout(() => {
      receiveSocket.close();
      logger.error('Timeout waiting for response from device.');
    }, 5000);

    receiveSocket.on('message', (msg, rinfo) => {
      if (msg.toString() === 'pong') {
        const apiAddress = `http://${rinfo.address}/pedometer`;
        logger.log(`Discovered endpoint at ${apiAddress}`);
        clearTimeout(timeout);
        receiveSocket.close();
        resolve(apiAddress);
      }
    });

    receiveSocket.bind(receivePingPort);

    logger.log('Discovering endpoint...');
  });
}
