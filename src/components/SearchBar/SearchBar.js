import React, { useState,useEffect ,useRef } from "react";
import tenorWhiteLogo from '../../assests/tenor-logo-white.svg';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import './SearchBar.css';

export default function SearchBar() {
    const params = useParams();
    const navigate = useNavigate();
    const searchContainterRef = useRef(null);
    const inputEleRef = useRef(null);
    const [isSearchBarTop, setSearchBarTop] = useState(false);

    useEffect(() => {
        if (searchContainterRef && searchContainterRef.current) {
            document.addEventListener('scroll', addScrollEventListener, false);
        }

        // Remove listener while unmount happens...
        // Else multi event binding happens which leads to memory leak.
        return () => {
            removeScrollEventListener();
        }
    }, []);

    // put value in searchbox on refresh
    useEffect(() => {
        if (params.searchQuery)
            inputEleRef.current.value = params.searchQuery;
    }, [])
    
    const addScrollEventListener = () => {
        let offsetTopForSearchContainer = searchContainterRef.current.offsetTop;
        let currentPosition = offsetTopForSearchContainer - document.documentElement.scrollTop;
       
        if(currentPosition <= 0 && document.documentElement.scrollTop > currentPosition) {
            setSearchBarTop(true);
            
            return;
        }

        document.documentElement.scrollTop = offsetTopForSearchContainer;
        setSearchBarTop(false);
        console.log(document.documentElement.scrollTop)
    }

    const removeScrollEventListener = () => {
        document.removeEventListener('scroll', addScrollEventListener);
    }

    const handleKeyDown = e => {
        let inputValue = inputEleRef.current.value;

        // Early break
        if(!inputValue) return;

        if (e.key === 'Enter') {
            navigate(`/search/${inputValue}`, { replace: true });
            // TODO: To refresh the current URL. Problem in react navigator hook
            // Ref: https://stackoverflow.com/questions/68825965/react-router-v6-usenavigate-doesnt-navigate-if-replacing-last-element-in-path
            navigate(0);
        }
    }

    return(
        <div ref={searchContainterRef} className={`searchbar-container ${isSearchBarTop ? "set-top" : ""}`} >
            <div className="search-elements">
                <div className="image-container">
                    <Link to="/">
                      <img src={tenorWhiteLogo} alt="tenor white logo" width="80" height="22"/>
                    </Link>
                </div>
                <div className="search-box-container">
                    <input 
                        className="search-box" 
                        name="q" 
                        placeholder="Search for GIFs and Stickers" 
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                        ref={inputEleRef}
                        alt="Search logo"
                    />
                    <span className="search-icon"></span>
                 </div>
            </div>
        </div>
    );
}