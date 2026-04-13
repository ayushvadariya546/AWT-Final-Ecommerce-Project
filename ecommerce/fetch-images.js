const https = require('https');

https.get('https://unsplash.com/napi/search/photos?query=brass&per_page=20', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('--- FOUND URLS ---');
      json.results.slice(0, 15).forEach(img => {
        console.log(img.urls.regular);
      });
    } catch(e) { 
      console.log("Error parsing JSON. Status code: " + res.statusCode); 
    }
  });
}).on('error', e => console.error(e));
