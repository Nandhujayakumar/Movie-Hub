import Moviecard from "../components/MovieCard";
import { useState , useEffect} from "react";
import { searchMovies, getpopularMovies } from "../services/api";
import '../css/Home.css'

export default function Home(){

    const [searchQuery, setSearchQuery] = useState("");

    const [movies , setmovies] = useState([]);

    const [error, setError]= useState(null); //to load store any potential error

    const [loading, setloading] = useState(true); //to load the loading state

    useEffect( () => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getpopularMovies()
                setmovies(popularMovies)
            }
            catch (err){
                setError("Failed to load movies....")
                console.log(err)
            }
            finally{
                setloading(false)  //error occured - no longer loading - setting to false
            }
        }

        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchQuery.trim()) return 
        if(loading) return
        setloading(true)

        try {
            const serachResult = await searchMovies(searchQuery)
            setmovies(serachResult)
            setError(null)
        } catch (err) {
            setError("Failed to search movie ....")
        }
        finally{
            setloading(false)
        }

        //setSearchQuery("")
    }

    return(
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movie" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? ( <div className="loading">Loading... Please Wait</div> ) : 
                (
            <div className="movies-grid">
                
                {movies.map(movie => <Moviecard movie={movie} key={movie.id}/>)}
            </div>
            )
        }

        </div>
    );

}