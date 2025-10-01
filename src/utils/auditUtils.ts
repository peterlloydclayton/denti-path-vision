// Get user's IP address (via external service)
export async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return 'unknown';
  }
}

// Get user agent
export function getUserAgent(): string {
  return navigator.userAgent;
}
