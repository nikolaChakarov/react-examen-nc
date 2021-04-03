import './edit.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Movies from '../../services/Movies';

import ErrorMessage from '../error-message';


const Edit = ({ match, history }) => {

    const [movie, setMovie] = useState({
        title: '',
        director: '',
        imageURL: '',
        year: '',
        genre: '',
        blackAndWhite: false,
        description: ''
    });
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        getCurrentMovie();
    }, []);

    const getCurrentMovie = async () => {
        const id = match.params.movie_id;
        const data = await Movies.getMovieById(id);
        setMovie({ ...movie, ...data });
    }

    const onInputChanged = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    const onCheckboxChanged = (e) => {
        setMovie({ ...movie, blackAndWhite: e.target.checked });
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!movie.title) {
            setErrorMsg('Please, type a title!');
            throw (errorMsg);
        }

        if (!movie.genre) {
            setErrorMsg('Please, select genre!');
            throw (errorMsg);
        }

        const id = match.params.movie_id;

        try {
            const data = await Movies.edit(id, movie);

            history.push(`/details/${id}`);

        } catch (err) {
            console.error(err.message);
        }
    }

    const hideErrorBox = () => {
        setErrorMsg('');
    }

    const { title, director, imageURL, description, blackAndWhite, year, genre } = movie;

    return (
        <section className="edit-section">
            <ErrorMessage err={errorMsg} hideErrorBox={hideErrorBox} />
            <div className="edit-intro">
                <h3>Edit Movie</h3>
                <p>Edit movie: Movie Title</p>
            </div>

            <form
                className="edit-movie-form"
                onSubmit={onFormSubmit}
            >
                <div>
                    <label htmlFor="title">Movie title</label><br />
                    <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={onInputChanged}
                        value={title}
                    />
                </div>
                <div>
                    <label htmlFor="director">Director:</label><br />
                    <input
                        type="text"
                        name="director"
                        id="director"
                        onChange={onInputChanged}
                        value={director}
                    />
                </div>
                <div>
                    <label htmlFor="year">Year:</label><br />
                    <input
                        type="number"
                        name="year"
                        id="year"
                        onChange={onInputChanged}
                        value={year}
                    />
                </div>
                <div>
                    <label htmlFor="imageURL">Image URL:</label><br />
                    <input
                        type="text"
                        name="imageURL"
                        id="imgeURL"
                        onChange={onInputChanged}
                        value={imageURL}
                    />
                </div>
                <select
                    name="genre"
                    id="ganre"
                    onChange={onInputChanged}
                    value={genre}
                >
                    <option value="" disabled>Select genre</option>
                    <option value="action">Action</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="adventure">Adventure</option>
                    <option value="history">history</option>
                </select>
                <div className="checkbox">
                    <label htmlFor="blackAndWhite">Black And White:</label>
                    <input
                        type="checkbox"
                        name="blackAndWhite"
                        id="blackAndWhite"
                        checked={blackAndWhite}
                        onChange={onCheckboxChanged}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        onChange={onInputChanged}
                        value={description}
                    ></textarea>
                </div>
                <button>Edit</button>
            </form>

        </section>
    )
}

export default Edit;