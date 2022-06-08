import axios from "axios";

const API_KEY = "021d1a1f14e24ac19694e6363bc04b76";

const axiosClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        api_key: API_KEY,
    },
});

export default axiosClient;
