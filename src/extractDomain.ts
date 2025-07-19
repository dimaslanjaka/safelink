/**
 * Extract domain from URL
 */
export default function extractDomain(url: string): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  let hostname: string | undefined;
  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }
  if (!hostname) return undefined;
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  if (!hostname) return undefined;
  return hostname || undefined;
}
