import React from "react";

import "./ActicleItem.scss";
import { ArticleData } from "../../types/ArticleData";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { pinActicle, unpinActicle } from "../../features/pinActicle";
import { removeArticle } from "../../features/ownArticles";

type Props = {
  article: ArticleData;
};

export const ArticleItem: React.FC<Props> = ({ article }) => {
  const { urlToImage, author, description, title, publishedAt } = article;

  const dispatch = useAppDispatch();

  const pinnedArticle = useAppSelector((state) => state.pinArticle);

  const isValidImageUrl = (url: string | null) => {
    if (url === null) {
      return false;
    }
    const imageRegex = /\.(jpeg|jpg|gif|png)$/;
    return imageRegex.test(url);
  };

  const isValid = isValidImageUrl(urlToImage);

  const defaultImageUrl =
    "https://cdn.mos.cms.futurecdn.net/kXUY9hyetVzhZ2scwJP7p3-1200-80.jpg";

  const imageUrl = isValid ? urlToImage! : defaultImageUrl;

  const handlePinClick = () => {
    if (
      pinnedArticle.pinnedArticle &&
      pinnedArticle.pinnedArticle.publishedAt === publishedAt
    ) {
      dispatch(unpinActicle());
    } else {
      dispatch(pinActicle(article));
    }
  };

  const handleDeleteClick = () => {
    dispatch(removeArticle(publishedAt));
  };

  return (
    <div className="article">
      <div className="article__content">
        <h1 className="text-3xl font-bold pb-2.5 text-center">{title}</h1>

        <img src={imageUrl} alt={title} width={300} />

        <span className="italic">{`By ${author}`}</span>

        <span className="">{description}</span>
      </div>

      <div className="acticle__buttons">
        <button
          type="button"
          className="w-32 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out"
          onClick={handlePinClick}
        >
          <span className="font-medium text-[#333] group-hover:text-white">
            {pinnedArticle.pinnedArticle &&
            pinnedArticle.pinnedArticle.publishedAt === publishedAt
              ? "Unpin me"
              : "Pin me"}
          </span>
        </button>

        {publishedAt.startsWith("user") && (
          <button
            type="button"
            className="w-32 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out"
            onClick={handleDeleteClick}
          >
            <span className="font-medium text-[#333] group-hover:text-white">
              Delete me
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
