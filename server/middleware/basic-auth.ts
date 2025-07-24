interface Env {
  USERNAME?: string;
  PASSWORD?: string;
  DEBRID_TOKEN: string;
}

async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  
  if (aBytes.byteLength !== bBytes.byteLength) {
    return false;
  }
  
  return await crypto.subtle.timingSafeEqual(aBytes, bBytes);
}

export async function optionalBasicAuth(request: Request, env: Env): Promise<Response | null> {
  // If USERNAME and PASSWORD are not set, skip authentication
  if (!env.USERNAME || !env.PASSWORD) {
    return null; // No authentication required
  }
  
  const authorization = request.headers.get('Authorization');
  
  if (!authorization) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="RDEBRID Access", charset="UTF-8"'
      }
    });
  }

  const [scheme, encoded] = authorization.split(' ');
  if (!encoded || scheme !== 'Basic') {
    return new Response('Invalid authorization format', { status: 400 });
  }

  const credentials = atob(encoded);
  const [username, password] = credentials.split(':');

  if (!await timingSafeEqual(username, env.USERNAME) || 
      !await timingSafeEqual(password, env.PASSWORD)) {
    return new Response('Invalid credentials', { status: 401 });
  }

  return null; // Authentication successful
}