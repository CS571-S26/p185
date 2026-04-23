const fs = require('fs');
const https = require('https');

const SERP_API_KEY = process.env.SERP_API_KEY;

const queries = [{filename: 'gelato.json', searchTerm: 'gelato ice cream'}, {
    filename: 'haagen-dazs.json', searchTerm: 'Haagen-Dazs ice cream'
}, {filename: 'ben-jerrys.json', searchTerm: "Ben & Jerry's ice cream"}];

async function updateData() {
    const dataDir = './public/data';
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, {recursive: true});
    }

    for (const item of queries) {
        const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(item.searchTerm)}&api_key=${SERP_API_KEY}`;

        await new Promise((resolve) => {
            https.get(url, (res) => {
                let body = '';
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => {
                    try {
                        const results = JSON.parse(body).shopping_results || [];
                        const wrappedData = {
                            shopping_results: results, updated_at: new Date().toISOString()
                        };
                        fs.writeFileSync(`${dataDir}/${item.filename}`, JSON.stringify(wrappedData, null, 2));
                        console.log(`Saved: ${item.filename}`);
                    } catch (e) {
                        console.error(`Error parsing ${item.filename}:`, e.message);
                    }
                    resolve();
                });
            }).on('error', (err) => {
                console.error(`Fetch error for ${item.filename}:`, err.message);
                resolve();
            });
        });
    }
}

updateData();