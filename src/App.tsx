import { ArticleList } from "./components/ArticleList/ArticleList";
import { AddArticleForm } from "./components/AddArticleForm/AddArticleForm";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage/HomePage";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/articles"
          element={<ArticleList />}
        />
        <Route path="/article-form" element={<AddArticleForm />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
