import { useAppDispatch, useAppSelector } from "./useAppDispatch.ts";
import React, { useEffect, useState } from "react";
import { option } from "../components/ui/InputMenu.tsx";
import { getArticles } from "../lib/actions.ts";

export function useSortCard() {
  const dispatch = useAppDispatch();

  const [selectedSort, setSelectedSort] = useState<option>();
  const [queryInput, setQueryInput] = useState<string>("");

  const articles = useAppSelector((state) => state.article.articles);

  const sortedArticles = articles.filter((article) => {
    if (selectedSort?.value === "") return article;

    if (selectedSort?.value === "favorite") return article.isFavorite;

    return article.category === selectedSort?.value;
  });
  const sortedAndSearchArticles = sortedArticles.filter((article) =>
    article.title.startsWith(queryInput),
  );

  const [stateArticles, setStateArticles] = useState(articles);
  const categories = useAppSelector((state) => state.article.categories);

  const sortOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  sortOptions.push({
    value: "favorite",
    label: "Избранные",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

  useEffect(() => {
    setStateArticles(articles);
  }, [articles]);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  useEffect(() => {
    setStateArticles(sortedAndSearchArticles);
  }, [queryInput, selectedSort]);

  return {
    handleInputChange,
    sortOptions,
    stateArticles,
    setSelectedSort,
  };
}
