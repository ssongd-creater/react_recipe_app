import React from "react";
import "../css/Recipe.css";
import { Link } from "react-router-dom";

//hooks
//graphQL

const Recipe = ({ title, calories, img, ingrs }) => {
  //procs로 받아온 title을 뿌릴 수 있음
  return (
    <div>
      <img src={img} alt='' />
      <h2>
        <Link
          to={{
            pathname: "/details",
            state: {
              title: title,
              calories: calories,
              img: img,
              ingrs: ingrs,
            },
          }}>
          {title}
        </Link>
      </h2>
      <ul>
        {ingrs.map((ingr, i) => (
          <li key={i}>{ingr.text}</li>
          // i를 넣어준 것은 key값으로 넣어서 각각을 인식시켜줄수 없어서 i를 써서 구분시켜줬다.반복문으로 1,2,3 이렇게 가므로
        ))}
      </ul>
      <p>{calories}</p>
    </div>
  );
};

export default Recipe;
