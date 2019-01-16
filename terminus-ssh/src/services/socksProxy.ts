import * as socks from 'socks';
import { parse as parseUrl } from 'url';
import * as net from 'net';
import { Logger } from 'terminus-core';
import { lookupIpaddress } from './dns';

export async function createSocksProxy(type: 4 | 5, proxy: string, host: string, port: number, logger: Logger) : Promise<net.Socket> {
  const proxyUrl = parseUrl(proxy);
  logger.info(`proxy url = ${JSON.stringify(proxyUrl)}`);
  logger.info(`proxy remote ${host}:${port}`);
  const ipaddress = net.isIP(proxyUrl.hostname) ? proxyUrl.hostname : await lookupIpaddress(proxyUrl.hostname);
  const proxyConnection = await socks.SocksClient.createConnection({
    command: 'connect',
    destination: {
      host,
      port,
    },
    proxy: {
      ipaddress,
      port: Number(proxyUrl.port) || 8080,
      type,
    }
  });
  return proxyConnection.socket;
}