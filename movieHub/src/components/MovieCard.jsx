import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext';

export default function Moviecard({movie}){

    const {isFavorites, addToFavorites, removeFromfavorites} = useMovieContext() //to get value pof thse from context provider

    const favorite = isFavorites(movie.id)

    function onfavClick(e){
        e.preventDefault()

        if(favorite) removeFromfavorites(movie.id)
        else addToFavorites(movie)
        
    }

    return(
        <>
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onfavClick}>♥</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
        </>
    );
}