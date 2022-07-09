import React, { useState,useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { api } from "../../Utils/api";
import HeartIcon from '../../assests/heart-off-icon.svg';
import TrendingGIFShowCase from  '../TrendingGIFShowCase/TrendingGIFShowCase';
import './FeaturedGIFShowCase.css';

export default function FeaturedGIFShowCase() {
    const [images, setImages] = useState([]);
    const [loaded, setIsLoaded] = useState(false);
    const [position, setPosition] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = (count = 10) => {
        let params = {
            limit: count,
            pos: position
        };

        api('featured', 'GET', params).then(res => {
            setPosition(res.next)
            setImages([...images, ...res.results]);
            setIsLoaded(true);
        });
    };

    return (
        <>
            <TrendingGIFShowCase />
            <div className="hero is-fullheight is-bold is-info">
                <h2 className="header-title">Featured GIFs</h2>
                <div className="hero-body">
                    <div className="featuredlist-container">
                        <InfiniteScroll
                            dataLength={images}
                            next={() => fetchImages(50)}
                            hasMore={true}
                            loader={
                            <img
                                src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
                                alt="loading"
                            />
                            }
                        >
                            <div className="image-grid" style={{ marginTop: "30px" }}>
                            {loaded
                                ? images.map((image, index) => (
                                    <div className="image-item" key={index} >
                                        <img className="heart-icon" src={HeartIcon} alt="Heart Icon" />
                                        <img className="image-tag" src={image.media[0].gif.url} />
                                        <div className="tags-container">
                                            {image.tags.map(tag => <span>#{tag.replace(' ', '-')}</span>)}
                                        </div>
                                    </div>
                                ))
                                : ""}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
  );
}