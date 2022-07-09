import React, { useState,useEffect } from "react";
import { api } from "../../Utils/api";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './TrendingGIFShowCase.css';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
};

export default function TrendingGIFShowCase() {
    const [trendingGIFS, setTrendingGIFS] = useState([]);
    
    useEffect(() => {
        let params = {limit:20};

        api('trending', 'GET', params).then(res => {
            setTrendingGIFS(Array.from(res.results))
        });
    }, []);

    const getCarouselItems = () => {
        return trendingGIFS.map(gif => (
            <div className="figure-container">
                <div className="img" style={{backgroundImage:`url(${gif.media[0].gif.url})`}}/>
                <div className="info">{gif.content_description}</div>
            </div>
        ))
    }

    return(
        <div className="featured-list-container">
            <h2 className="heading">Trending Tenor Searches</h2>
            <div className="gif-container">
                { trendingGIFS.length
                    ? <AliceCarousel infinite={true} items={getCarouselItems()} responsive={responsive} />
                    : "" 
                }
            </div>
        </div>
    );
}