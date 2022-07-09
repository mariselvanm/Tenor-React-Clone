import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FeaturedGIFShowCase from './components/FeaturedGIFShowCase/FeaturedGIFShowCase';
import SearchResultRenderer from './components/SearchResultRenderer/SearchResultRenderer';

function App() {
  return (
    <div className="App">
        <Header />
        <SearchBar />

        <main>
          <Routes>
            <Route path="/" element={<FeaturedGIFShowCase />} />
            <Route path="search/:searchQuery" element={<SearchResultRenderer />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
