const http = require('http');
const url = require('url');

exports.handler = async function(event, context) {
  // Parse the request URL
  const parsedUrl = url.parse(event.rawUrl);
  const pathname = parsedUrl.pathname;

  // Handle API requests
  if (pathname.startsWith('/api/')) {
    // Forward the request to your Django backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    const apiPath = pathname.replace('/api', '');
    
    try {
      const response = await new Promise((resolve, reject) => {
        const req = http.request(`${backendUrl}${apiPath}`, {
          method: event.httpMethod,
          headers: event.headers,
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: data
            });
          });
        });
        
        req.on('error', (error) => {
          reject(error);
        });
        
        if (event.body) {
          req.write(event.body);
        }
        req.end();
      });

      return {
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.body
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to proxy request to backend' })
      };
    }
  }

  // For non-API requests, return a 404
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not found' })
  };
}; 