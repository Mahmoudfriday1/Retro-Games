const API_KEY = 'YOUR_RAWG_API_KEY'; 
const BASE_URL = 'https://api.rawg.io/api';

export const fetchRetroGames = async () => {
    try {
    // نجلب ألعاب منصات العائلة والسيجا والبلايستيشن 1 لتعزيز ثيم الـ Retro
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&platforms=18,1,7&page_size=12`);
    const data = await response.json();
    return data.results;
    } catch (error) {
    console.error("Error fetching games:", error);
    return [];
    }
};