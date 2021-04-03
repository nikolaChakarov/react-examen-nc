import './edit.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Movies from '../../services/Movies';


const Edit = () => {

    return (
        <section className="edit-section">
            <div className="edit-intro">
                <h3>Edit Movie</h3>
                <p>Edit movie: Movie Title</p>
            </div>
            <form className="edit-movie-form">
                <div>
                    <label htmlFor="title">Movie title</label><br />
                    <input type="text" name="title" id="title" />
                </div>
                <div>
                    <label htmlFor="director">Director:</label><br />
                    <input type="text" name="director" id="director" />
                </div>
                <div>
                    <label htmlFor="year">Year:</label><br />
                    <input type="number" name="year" id="year" />
                </div>
                <div>
                    <label htmlFor="imageURL">Image URL:</label><br />
                    <input type="text" name="imageURL" id="imgeURL" />
                </div>
                <select name="ganres" id="ganres">
                    <option value="" disabled>Select genre</option>
                    <option value="action">Action</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="adventure">Adventure</option>
                    <option value="history">history</option>
                </select>
                <div className="checkbox">
                    <label htmlFor="blackAndWhite">Black And White:</label>
                    <input type="checkbox" name="blackAndWhite" id="blackAndWhite" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>
                </div>
                <button>Edit</button>
            </form>

        </section>
    )
}

export default Edit;