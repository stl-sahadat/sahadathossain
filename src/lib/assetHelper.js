/**
 * Dynamic Asset Resolver for seamless GitHub Pages, Vercel, and local development.
 * Automatically resolves paths whether running on:
 * - Localhost (/)
 * - Vercel (/)
 * - GitHub Pages (/my-portfolio-03/ or any renamed repository name)
 */

export function getBasePrefix() {
  if (typeof window === 'undefined') return '';
  if (window.location.hostname.endsWith('github.io')) {
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      return `/${segments[0]}`;
    }
  }
  return '';
}

export function resolveAssetUrl(url) {
  if (!url || typeof url !== 'string') return url;

  // External links, data URIs, blobs remain untouched
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  const basePrefix = getBasePrefix();
  if (!basePrefix) {
    return url;
  }

  // Normalize path
  let cleanUrl = url;
  if (cleanUrl.startsWith('./')) {
    cleanUrl = cleanUrl.slice(1);
  }
  if (!cleanUrl.startsWith('/')) {
    cleanUrl = `/${cleanUrl}`;
  }

  // Avoid duplicate prefixing
  if (cleanUrl.startsWith(`${basePrefix}/`)) {
    return cleanUrl;
  }

  return `${basePrefix}${cleanUrl}`;
}

/**
 * Deeply normalizes all asset path strings within nested objects and arrays.
 */
export function deepNormalizeAssets(data) {
  if (!data || typeof data !== 'object') return data;
  if (Array.isArray(data)) {
    return data.map(item => deepNormalizeAssets(item));
  }
  const result = { ...data };
  for (const key of Object.keys(result)) {
    const val = result[key];
    if (typeof val === 'string') {
      if (
        val.startsWith('/assets/') ||
        val.startsWith('./assets/') ||
        val.startsWith('assets/')
      ) {
        result[key] = resolveAssetUrl(val);
      }
    } else if (typeof val === 'object' && val !== null) {
      result[key] = deepNormalizeAssets(val);
    }
  }
  return result;
}
