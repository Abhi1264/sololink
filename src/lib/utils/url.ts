/**
 * Constructs a subdomain URL for a given username
 * @param username - The username to create subdomain for
 * @returns Full subdomain URL (e.g., "http://john.localhost:3000" or "https://john.myapp.com")
 */
export function getProfileUrl(username: string): string {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  const protocol = rootDomain.includes('localhost') ? 'http' : 'https';
  
  return `${protocol}://${username}.${rootDomain}`;
}

