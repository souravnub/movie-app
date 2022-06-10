import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookMarkPage from "./pages/bookmark page/BookMarkPage";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import Navbar from "./components/navbar/Navbar";
import TopRatedMoviesMedia from "./components/single media coponent/TopRatedMoviesMedia";
import TopRatedTvMedia from "./components/single media coponent/TopRatedTvMedia";
import TrendingMoviesMedia from "./components/single media coponent/TrendingMoviesMedia";
import TrendingTvComponent from "./components/single media coponent/TrendingTvComponent";
import SingleMovieInfo from "./components/single movie info/SingleMovieInfo";
import SingleTvInfo from "./components/single tv info/SingleTvInfo";
import MoviesPage from "./pages/movies Page/MoviesPage";
import TvSeriesPage from "./pages/tv Page/TvSeriesPage";
import PageNotFound from "./pages/404 Page/PageNotFound";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:movieId" element={<SingleMovieInfo />} />
                <Route path="/tv/:tvId" element={<SingleTvInfo />} />
                <Route
                    path="/more/movies/trending"
                    element={<TrendingMoviesMedia />}
                />
                <Route
                    path="/more/movies/top_rated"
                    element={<TopRatedMoviesMedia />}
                />
                <Route
                    path="/more/tv/trending"
                    element={<TrendingTvComponent />}
                />
                <Route
                    path="/more/tv/top_rated"
                    element={<TopRatedTvMedia />}
                />
                <Route path="/bookmarked" element={<BookMarkPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/tv" element={<TvSeriesPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
