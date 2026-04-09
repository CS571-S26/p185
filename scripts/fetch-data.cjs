const fs = require('fs');
const https = require('https');

const SERP_API_KEY = process.env.SERP_API_KEY;
const query = encodeURIComponent("gelato ice cream");
const url = `https://serpapi.com/search.json?engine=google_shopping&q=${query}&api_key=${SERP_API_KEY}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const results = JSON.parse(data).shopping_results;

            if (!fs.existsSync('./public/data')) {
                fs.mkdirSync('./public/data', {recursive: true});
            }

            const wrappedData = {
                shopping_results: results,
                updated_at: new Date().toISOString()
            }

            fs.writeFileSync('./public/data/products.json', JSON.stringify(wrappedData, null, 2));
            console.log("Successfully fetched and saved");
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
            process.exit(1);
        }
    });
}).on('error', (err) => {
    console.error("Error fetching data:", err.message);
    process.exit(1);
});