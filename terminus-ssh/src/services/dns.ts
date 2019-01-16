import * as dns from 'dns';

export async function lookupIpaddress(hostname: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    dns.lookup(hostname, (err, address, family) => {
      if (err) {
        return reject(err);
      }
      resolve(address);
    });
  });

}