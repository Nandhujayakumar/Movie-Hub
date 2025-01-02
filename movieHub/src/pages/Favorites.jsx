import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext';
import Moviecard from '../components/MovieCard';

export default function Favorites(){

    const {favorites} = useMovieContext();

    if (favorites) {
        return ( 
            <div className='favorites'>
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                    <Moviecard movie={movie} key={movie.id}/>))}
                </div>
            </div>
                    )
    }

    return (
        <div className="favorites-empty">
            <h2>No favorites added</h2>
            <p>Start adding movies and they will appear here</p>
        </div>
    );
}