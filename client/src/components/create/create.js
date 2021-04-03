import './create.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Movies from '../../services/Movies';

import ErrorMessage from '../error-message';

const Create = () => {

    const [movie, setMovie] = useState({
        title: '',
        director: '',
        imageURL: '',
        genre: '',
        blackAndWhite: false,
        description: '',
        year: null
    });

    const [errorMsg, setErrorMsg] = useState('');
    const history = useHistory();

    const onInputChanged = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    const onCheckboxChanged = (e) => {
        setMovie({ ...movie, blackAndWhite: e.target.checked ? true : false });
    }

    const hideErrorBox = () => {
        setErrorMsg('');
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const { title, director, imageURL, genre, blackAndWhite, description, year } = movie;

        if (!genre) {
            setErrorMsg('Please, select a genre.')
            throw (errorMsg);
        }

        try {
            const res = await Movies.create({ title, director, imageURL, genre, blackAndWhite, description, year });

            history.push('/catalog');

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="create-section">
            <ErrorMessage
                err={errorMsg}
                hideErrorBox={hideErrorBox}
            />
            <div className="create-intro">
                <h3>Create Movie</h3>
                <p>Fill the information about your favorite movie!</p>
            </div>

            <form
                className="create-movie-form"
                onSubmit={onFormSubmit}
            >

                <div>
                    <label htmlFor="t
                    itle">Movie title</label><br />
                    <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={onInputChanged}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="director">Director:</label><br />
                    <input
                        type="text"
                        name="director"
                        id="director"
                        onChange={onInputChanged}
                    />
                </div>
                <div>
                    <label htmlFor="year">Year:</label><br />
                    <input
                        type="number"
                        name="year"
                        id="year"
                        onChange={onInputChanged}
                    />
                </div>
                <div>
                    <label htmlFor="imageURL">Image URL:</label><br />
                    <input
                        type="text"
                        name="imageURL"
                        id="imgeURL"
                        onChange={onInputChanged}
                    />
                </div>
                <select
                    name="genre"
                    id="genre"
                    onChange={onInputChanged}
                    value={movie.genre}
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
                    ></textarea>
                </div>
                <button>Create</button>
            </form>

        </section>
    )
}

export default Create;