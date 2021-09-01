import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import axios from "axios";
import loader from "../assets/loading.gif";
const Home = () => {
  //1.계정 등록
  const APP_ID = "a030063e";
  const APP_KEY = "16c0e834bca322f142427bce92f7f54c";

  //4. recipes 요청 결과 데이터 useState 정의
  const [recipes, setRecipes] = useState([]);
  //10. 검색 useState 정의
  const [search, setSearch] = useState("");

  //15. 검색 문자열 useState 정의
  const [query, setQuery] = useState("chicken");

  const [loading, setLoading] = useState(true);

  //5. useEffect 정의
  useEffect(() => {
    getRecipes();
  }, [query]);

  // query sample ("https://api.edamam.com/search?q=chicken&app_id=a030063e&app_key=16c0e834bca322f142427bce92f7f54c");

  // 3. API 비동기 연결(axios)
  //axios 설치 : https://velog.io/@sss5793/axios-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-uuk5elxk88
  //axios 사용 : https://dev.to/ms_yogii/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj

  const getRecipes = () => {
    axios
      .get(
        //6. 아이디와 키값을 변수처리해야 함
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((res) => {
        //useEffect의 콜백 파라미터에 []를 사용하지 않으면 res.data.hits가 콘솔에 계속 찍히다가 화면 오류가 난다.
        //console.log(res.data.hits);
        setRecipes(res.data.hits);
        setLoading(false);
      });
  };

  //11. input search 기능 함수 정의
  const updateSearch = (e) => {
    //window에 글을 쓰면 event로 받아오기 때문에 e라는 파라미터 값을 넣어줬음
    setSearch(e.target.value);
    //console.log(search);
  };

  //14. onSubmit 실행 함수 정의
  //getSearch가 onSubmit에 들어감
  const getSearch = (e) => {
    e.preventDefault();
    //검색 후 인풋 결과값이 안지워져서 input에 value 값을 넣어줌
    setSearch("");
    //검색 후 인풋에 결과값을 지워줌
    setQuery(search);
    //우리가 검색한 결과값 search를 넣어줌
    //console.log(search);
  };

  return (
    <div>
      {/* 2. 검색창 UI 작성*/}
      <form className='search_form' onSubmit={getSearch}>
        <div className='center'>
          {/* 12. onChange 속성에 updateSearch 함수 호출 input에 글자를 쓸것이기때문에*/}
          <input type='text' placeholder='Search Recipe...' onChange={updateSearch} value={search} />
          {/* 13. button에 submit 타입을 지정하면 클릭했을 때 감싸는 form의 onSubmit 속성이 실행된다. 기존 php에서 submit했을 때 action 경로 지정한 것과 같음 */}
          <button type='submit'>
            <i className='fa fa-search'></i>
          </button>
        </div>
      </form>

      {loading ? (
        <div className='loader'>
          <img src={loader} />
        </div>
      ) : (
        <div className='recipes'>
          {/* 8. Recipe 컴포넌트 반복 처리 */}
          {/* 9. 컴포넌트에 props 지정*/}
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              img={recipe.recipe.image}
              ingrs={recipe.recipe.ingredients}
            />
            // procs를 recipe로 처리 후 recipe.js에 넘김
          ))}
        </div>
      )}
      {/* 7. Recipe 컴포넌트 임포트 */}
    </div>
  );
};

export default Home;
