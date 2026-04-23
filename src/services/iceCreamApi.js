const API_KEY = import.meta.env.VITE_SERP_API_KEY;


//for local testing with live api
// const BASE_URL = 'https://serpapi.com/search.json';
// const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const FOR_GITHUB_PAGE = true; //set to false for local testing

//pre-downloaded data from github actions
// const URL = import.meta.env.DEV ? '/data/products.json' : `${import.meta.env.BASE_URL}data/products.json`;

export const fetchIceCreams = async (query = "gelato") => {

    const fileMap = {
        "gelato": "gelato.json",
        "Haagen-Dazs": "haagen-dazs.json",
        "Ben & Jerry's": "ben-jerrys.json"
    };
    const fileName = fileMap[query] || "gelato.json";

    const fetchUrl = FOR_GITHUB_PAGE
        ? `${import.meta.env.BASE_URL}data/${fileName}`.replace(/\/+/g, '/')
        : `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${import.meta.env.VITE_SERP_API_KEY}`;
    try {
        const response = await fetch(fetchUrl);
        const data = await response.json();

        const results = data.shopping_results || (Array.isArray(data) ? data : []);

        console.log(results)
        return results.map((item, index) => ({
            id: item.product_id || index,
            name: item.title,
            brand: query || "Premium Brand",
            price: item.extracted_price || 0,
            image: item.thumbnail, //random generation for promotions and flavorProfile.
            promotions: Math.floor(Math.random() * 100) < 30 ? "2+1 Deal" : null,
            flavorProfile: {
                sweetness: Math.floor(Math.random() * 5) + 1,
                isGelato: query.includes("gelato") || item.title.includes("gelato"),
                nutFree: Math.floor(Math.random() * 100) < 20,
                dairyFree: Math.floor(Math.random() * 100) < 20,
            }
        }));
    } catch (error) {
        console.error("SerpApi Fetch Error:", error);
        return [];
    }
};