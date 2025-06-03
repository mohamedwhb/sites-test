const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

exports.handler = async function(event, context) {
  // Parse the request URL
  const parsedUrl = url.parse(event.rawUrl);
  const pathname = parsedUrl.pathname;

  // Handle static files
  if (pathname.startsWith('/static/')) {
    try {
      const staticPath = path.join(__dirname, '../../backend/staticfiles', pathname.replace('/static/', ''));
      const fileContent = fs.readFileSync(staticPath);
      const contentType = getContentType(pathname);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000',
          'Access-Control-Allow-Origin': '*'
        },
        body: fileContent.toString('base64'),
        isBase64Encoded: true
      };
    } catch (error) {
      console.error('Error serving static file:', error);
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        },
        body: 'Static file not found'
      };
    }
  }

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

function getContentType(pathname) {
  const ext = path.extname(pathname).toLowerCase();
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
  };
  return contentTypes[ext] || 'application/octet-stream';
} 