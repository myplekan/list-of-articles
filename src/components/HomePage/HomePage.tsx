import { useAppSelector } from "../../hooks/hooks";
import { ActicleItem } from "../ActicleItem/ActicleItem";

import "./HomePage.scss";

export const HomePage = () => {
  const ownActicles = useAppSelector((state) => state.ownArticles);

  const pinnedArticle = useAppSelector((state) => state.pinArticle);

  return (
    <div className="home-page flex flex-col justify-center items-center gap-y-5">
      {!pinnedArticle.pinnedArticle && ownActicles.articles.length === 0 && (
        <h1 className="text-3xl text-center">
          Your pinned and created articles will be displayed here
        </h1>
      )}
      {pinnedArticle.pinnedArticle && (
        <>
          <h1 className="text-3xl text-center">Pinned Acticle</h1>
          <ActicleItem article={pinnedArticle.pinnedArticle} />
        </>
      )}
      {ownActicles.articles.length > 0 && (
        <>
          <h1 className="text-3xl text-center">Own acticles</h1>
          {ownActicles.articles.map((own) => (
            <ActicleItem key={own.publishedAt} article={own} />
          ))}
        </>
      )}
    </div>
  );
};
