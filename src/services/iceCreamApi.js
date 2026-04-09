const API_KEY = import.meta.env.VITE_SERP_API_KEY;
const BASE_URL = '/api/search.json';

export const fetchIceCreams = async (query = "gelato") => {
    try {
        const response = await fetch(`${BASE_URL}?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${API_KEY}`);
        const data = await response.json();
        console.log(data.shopping_results)
        return data.shopping_results.map((item, index) => ({
            id: item.product_id || index,
            name: item.title,
            brand: item.source || "Premium Brand",
            price: item.extracted_price || 0,
            image: item.thumbnail, //random generation
            promotions: item.extracted_price < 10 ? "2+1 Deal" : null,
            flavorProfile: {
                sweetness: Math.floor(Math.random() * 5) + 1, isGelato: query.includes("gelato")
            }
        }));
    } catch (error) {
        console.error("SerpApi Fetch Error:", error);
        return [];
    }
};