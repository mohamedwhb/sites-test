const http = require('http');
const url = require('url');

exports.handler = async function(event, context) {
  // Parse the request URL
  const parsedUrl = url.parse(event.rawUrl);
  const pathname = parsedUrl.pathname;

  // Handle API and admin requests
  if (pathname.startsWith('/api/') || pathname.startsWith('/admin/')) {
    // Forward the request to your Django backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    const apiPath = pathname.startsWith('/api/') ? pathname.replace('/api', '') : pathname;
    
    try {
      const response = await new Promise((resolve, reject) => {
        const req = http.request(`${backendUrl}${apiPath}`, {
          method: event.httpMethod,
          headers: {
            ...event.headers,
            'host': new URL(backendUrl).host,
            'origin': backendUrl,
            'referer': `${backendUrl}${apiPath}`
          },
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode,
              headers: {
                ...res.headers,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
              },
              body: data
            });
          });
        });
        
        req.on('error', (error) => {
          console.error('Request error:', error);
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
      console.error('Error in API function:', error);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to proxy request to backend',
          details: error.message 
        })
      };
    }
  }

  // For non-API requests, return a 404
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ error: 'Not found' })
  };
}; 