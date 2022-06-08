import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import Navbar from "./components/navbar/Navbar";
import MediaComponent from "./components/single media coponent/MediaComponent";
import SingleMovieInfo from "./components/single movie info/SingleMovieInfo";
import SingleTvInfo from "./components/single tv info/SingleTvInfo";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:movieId" element={<SingleMovieInfo />} />
                <Route path="/tv/:tvId" element={<SingleTvInfo />} />
                <Route
                    path="/more/:mediaType/:contentType"
                    element={<MediaComponent />}
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
