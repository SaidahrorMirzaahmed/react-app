import React, { useState, useEffect, useMemo, useRef } from "react";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import Loader from "../../components/Loader/Loader";
import { useFetch } from "../../hooks/useFetch";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState("");

  
  const controlsConatinerRef = useRef();

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);

    return questions;
  });
  
  const cards = useMemo(() =>{
    if(questions?.data){
      setPagesCount(questions?.pages);
      if(searchValue.trim()){
        return questions.data.filter((c) => c.question.toLowerCase()
        .includes(searchValue.trim().toLowerCase()))
      } else{
        return questions.data
      }
    }
    return [];
    
  }, [questions, searchValue]);


  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams, currentPage]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);

    setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`) 
  }

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`?_page=${currentPage}&_per_page=${e.target.value}&${e.target.value}`)
  }

  const paginationHandler = (e) => {
    if(e.target.tagName === "BUTTON") {
      setSearchParams(`?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`)
      setCurrentPage(e.target.textContent);
      controlsConatinerRef.current.scrollIntoView({behavior: "smooth"});
    }
  }

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;

    return Array(totalCardsCount).fill(0).map((_,i) => i+1)
  }, [questions])

  return (
    <>
      <div className={cls.controlsConatiner} ref={controlsConatinerRef}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select value={sortSelectValue} className={cls.select} onChange={onSortSelectChangeHandler}>
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option> 
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option> 
          <option value="_sort=-completed">completed DESC</option>
        </select>

        <select value={countSelectValue} className={cls.select} onChange={onCountSelectChangeHandler}>
          <option disabled>count</option>
          <hr />
          <option value="10">10</option> 
          <option value="20">20</option>
          <option value="50">50</option> 
          <option value="100">100</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      
      <QuestionCardList cards={cards} />

      {cards.length === 0 ? <p className={cls.noCardsInfo}>No cards...</p> : 
      <div className={cls.paginationButtons} onClick={paginationHandler}>
        {
          pagination.length != 1
          && pagination.map((value) =>
            value === currentPage ? (
              <Button key={value} isActive={true}>{value}</Button>
            ) : (
              <Button key={value}>{value}</Button>
            )
          )
        }
      </div>} 
    </>
  );
};


