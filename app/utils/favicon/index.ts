export function getFaviconUrl(url: string, size: number = 32) {
  return `https://www.google.com/s2/favicons?domain=${url}&sz=${size}`;
}

export function getNameFromURL(site: string) {
  const url = new URL(site);
  const domain = url.hostname.replace('www.','');
  const parts = domain.split('.');

  if (parts.length > 2) {
    parts.shift();
  }

  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
}