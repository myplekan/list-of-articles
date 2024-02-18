import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActicleItem } from "../ActicleItem/ActicleItem";
import { useAppDispatch, useAppSelector, useDebounce } from "../../hooks/hooks";

import "./ArticleList.scss";
import { setArticles } from "../../features/articles";
import { RootState } from "../../store/store";

const apiKey = "57f24d609dac41d49322debb57352f3a";

export const ArticleList = () => {
  const dispatch = useAppDispatch();

  const articles = useAppSelector((state: RootState) => state.articles);

  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(0);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const [searchInput, setSearchInput] = useState<string>("");
  const debounceSearch = useDebounce(searchInput);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${
            debounceSearch.length > 1 ? debounceSearch : "news"
          }&to=${formattedDate}&pageSize=10&page=${page}&searchIn=title,description&apiKey=${apiKey}`
        );
        dispatch(setArticles(response.data.articles));
        setPageLength(response.data.totalResults);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [debounceSearch, page, formattedDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    inputValue = inputValue.replace(/[^a-zA-Z]/g, "");
    setSearchInput(inputValue);
    setPage(1);
  };

  return (
    <div className="article-list flex flex-col justify-center items-center gap-y-5">
      <input
        className="p-2.5 rounded-xl border-0 outline-0"
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      {articles.articles.length > 0 && (
        <>
          <div className="article-list__container">
            {articles.articles.map((article) => (
              <ActicleItem key={article.publishedAt} article={article} />
            ))}
          </div>

          <button
            type="button"
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === Math.ceil(pageLength / 10)}
          >
            Add new articles
          </button>
        </>
      )}
    </div>
  );
};
