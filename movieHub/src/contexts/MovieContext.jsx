import { createContext , useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext) 

//provide state to any comp wrapped inside
export const MovieProvider = ({children}) => {

    const [favorites , setFavorites] = useState([])

    //localstorage
    useEffect( () => {
        const storedfavs = localStorage.getItem("favorites")

        if (storedfavs) setFavorites(JSON.parse(storedfavs))  //getting the last updated favorites from teh browser favorites
    }, [])

    useEffect( () => {
        localStorage.setItem('favorites', JSON.stringify(favorites))   //any item if anything updates, we need to store the update locally
    }, [favorites])


    //add to fav
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    //remove favs
    const removefromfavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorites = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    //to pass these as children to the provider
    const value = {
        favorites, addToFavorites , removefromfavorites, isFavorites
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
} 