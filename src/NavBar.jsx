import React, {useState, useEffect} from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";
import "./index.css";


const NavBar = ({setSearchParams}) => {
      const [ searchTerm, setSearchTerm] = useState("");
      const debouncedSearchTerm = useDebounce(searchTerm, 500);
      const navigate = useNavigate();

      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };


      useEffect(() => {
        if (debouncedSearchTerm) {
          setSearchParams({ search: debouncedSearchTerm });
        }
      }, [debouncedSearchTerm, setSearchParams]);
    

      return (
        <nav className="navbar">
          <h2>OZ Movie</h2>
          <input
            type="text"
            placeholder="영화를 검색해주세요"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div>
            <Link to="/">홈</Link>
            <Link to="/details">상세</Link>
          </div>
        </nav>
      );
    };
    
    export default NavBar

//       useEffect(()=> {
//         if(debouncedSearchTerm) {
//           navigate(`/?search=${debouncedSearchTerm}`);
//         }
//       }, [debouncedSearchTerm, navigate])

//   return (
//     <nav className="navbar">
//       <h2>OZ Movie </h2>
//       <input
//       type="text"
//       placeholder="영화를 검색해주세요"
//       value={searchTerm}
//       onChange={handleSearch}/>
//       <Link to="/">홈</Link>
//       <Link to="/details">상세</Link>
//     </nav>
//   );
// };

// export default NavBar;