import './catalog.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Movies from '../../services/Movies';
import Movie from '../movie';


const Catalog = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesFromDb();
    }, []);

    const getMoviesFromDb = async () => {
        const data = await Movies.getAllMovies();

        setMovies([...movies, ...data]);
    }

    const layoutMessage = movies.length > 0 ? <MoviesLayout movies={movies} /> : <NoMoviesLayout />

    return (
        <section className="movies-catalog">
            <div className="movies-intro">
                <h2>Movies Catalog</h2>
                {layoutMessage}
            </div>

            <div className="movies">
                {movies.map(el => (
                    <Movie key={el._id} {...el} />
                ))}
            </div>

        </section>
    )
}

const MoviesLayout = ({ movies }) => {
    return (
        <>
            <p>Movies in our catalog so far {movies.length}</p>
        </>
    )
}

const NoMoviesLayout = () => {
    return (
        <>
            <p>Sorry, there are no currently movies in our catalog.</p>
            <p>Please, be the first one to <Link to="/create">Add Movie</Link>.</p>
        </>
    )
}



export default Catalog;