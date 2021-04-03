import './details.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Movies from '../../services/Movies';
import { getLocalStorage } from '../../services/auth';

const Details = ({ match }) => {

    const [movie, setMovie] = useState({});

    useEffect(() => {
        getCurrentMovie();
    }, [])

    const getCurrentMovie = async () => {

        const currentMovieId = match.params.movie_id;
        const data = await Movies.getMovieById(currentMovieId);

        setMovie({ ...movie, ...data });
    }

    const { title, creator, director, imageURL, year, genre, blackAndWhite, description, _id } = movie;

    return (
        <>
            <section className="details-movie">
                <div className="details-data">
                    <div className="details-img">
                        <img src={imageURL} />
                    </div>
                    <div className="details-info">
                        <div className="details-text">
                            <h2>Details for movie: {title}</h2>

                            <p>Director: {director}</p>
                            <p>Year: {year}</p>
                            <p>Genre: {genre}</p>
                            <p>Black and White: {blackAndWhite ? 'yes' : 'no'}</p>
                            <p>Description: {description}</p>
                        </div>
                        <BtnGroup creator={creator} movieId={_id} />
                    </div>
                </div>
            </section>
        </>
    )
}

const BtnGroup = ({ creator, movieId }) => {

    const isCreator = creator === getLocalStorage().userId ? true : false;

    if (isCreator) {
        return (
            <div className="details-btn">
                <Link to={`movies/edit/${movieId}`}>Edit</Link>
                <Link to={`movies/delete/${movieId}`}>Delete</Link>
            </div>
        )
    }

    return (
        <div className="details-btn">
            <Link to={`movies/like/${movieId}`}>Like</Link>
        </div>
    )
}

export default Details;