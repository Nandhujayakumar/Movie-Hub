import Moviecard from "../components/MovieCard";
import { useState } from "react";
import '../css/Home.css'

export default function Home(){

    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {id: 1, title: "John Wick", release_date:"2020"},
        {id: 2, title: "John ", release_date:"2019"},
        {id: 3, title: "Wick", release_date:"2018"},
        {id: 4, title: "Jock", release_date:"2017"},
        {id: 5, title: "hnck", release_date:"2016"}
    ]

    const handleSearch = (e) => {
        e.preventDefault();
        alert("Typed : " + searchQuery)

        setSearchQuery("")
    }

    return(
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movie" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="movies-grid">
                
                {movies.map(movie => 
                    movie.title.toLowerCase().startsWith(searchQuery) && (<Moviecard movie={movie} key={movie.id}/>))}
            </div>

        </div>
    );

}