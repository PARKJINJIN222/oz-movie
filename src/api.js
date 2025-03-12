import axios from 'axios';

export const API_KEY = process.env.REACT_APP_TMDB_API_KEY; //Node.js에서 환경 변수 다루는 거
export const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query = "") => {      //검색어에 따라 다르게 TMdb API를 호출 query
    console.log(API_KEY); //키가 잘 매핑되는지 보기 위해서
    console.log("검색어:", query);

const endpoint = query
? `${BASE_URL}/search/movie?query=${query}`
 : `${BASE_URL}/movie/popular`;


  try {
    const response = await axios.get(endpoint, { //(`${BASE_URL}/movie/popular`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
    });

    const filteredMovies = response.data.results.filter(movie => !movie.adult); // 좀 더 찾아보기
return filteredMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

//adult값이 fasle여야 하고 영화 목록이니까 filter를 사용하면 될 거 같음, 이미 목록에 adult값이 선언되어 있으니까 별도 선언 필요할 필요 없다고 함

// params 방식에서는 URL의 쿼리 문자열에 API 키를 포함하여 요청 URL에 포함된 API키는 네트워크 트래픽에서 노출되기 쉬움

//headers 방식에서는 HTTP 요청 헤더에 API 키를 포함하여 요청하고 API키는 URL에 노출되지 않음.

