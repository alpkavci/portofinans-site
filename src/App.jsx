import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import NewsPage from "./pages/NewsPage";
import Crypto from "./pages/Crypto";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/piyasalar" element={<Markets />} />
          <Route path="/haberler" element={<NewsPage />} />
          <Route path="/kripto" element={<Crypto />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
