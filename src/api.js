import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "5a3e61e7679b1513f82b2f12bfb47722",
    language: "en-US"
  }
});

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  details: id => api.get(`tv/${id}`, {
    params: {
      append_to_response: "videos"
    }
  }),
  search: text => api.get("search/tv", {
    params: {
      query: encodeURIComponent(text)
    }
  })
};

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  details: id => api.get(`movie/${id}`),
  search: text => api.get("search/movie", {
    params: {
      query: encodeURIComponent(text)
    }
  })
};
