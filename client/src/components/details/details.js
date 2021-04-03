import './details.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Movies from '../../services/Movies';
import { getLocalStorage } from '../../services/auth';

const Details = ({ match, history }) => {

    const currentMovieId = match.params.movie_id;

    const [movie, setMovie] = useState({});

    useEffect(() => {
        getCurrentMovie();
    }, [])

    const getCurrentMovie = async () => {

        const data = await Movies.getMovieById(currentMovieId);

        setMovie({ ...movie, ...data });
    }

    const onLike = async () => {

        let likes = movie.likes;
        likes++;

        const updatedMovieLikes = await Movies.edit(currentMovieId, { likes });

        setMovie({ ...movie, ...updatedMovieLikes });
    }

    const onDelete = async () => {
        const data = await Movies.delete(currentMovieId);
        setMovie({});
        console.log(data);
        history.push(`/catalog`);
    }

    const { title, creator, director, imageURL, year, genre, blackAndWhite, description, likes, _id } = movie;

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
                            <p>Likes: {likes}</p>
                        </div>
                        <BtnGroup
                            creator={creator}
                            movieId={_id}
                            onLike={onLike}
                            onDelete={onDelete}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

const BtnGroup = ({ creator, movieId, onLike, onDelete }) => {

    const isCreator = creator === getLocalStorage().userId ? true : false;

    if (isCreator) {
        return (
            <div className="details-btn">
                <Link
                    to={`/edit/${movieId}`}
                    className="edit-btn"
                >Edit</Link>
                <button
                    onClick={onDelete}
                    className="delete-btn"
                >Delete</button>
            </div>
        )
    }

    return (
        <div className="details-btn">
            <button
                onClick={onLike}
                className="like-btn"
            >Like</button>
        </div>
    )
}

export default Details;