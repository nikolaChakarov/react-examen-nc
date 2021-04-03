import { Link } from 'react-router-dom';


const Movie = ({ title, imageURL, _id }) => {
    return (
        <div className="movie">
            <h3>{title}</h3>
            <div className="movie-img">
                <img src={imageURL} />
            </div>
            <Link to={`/details/${_id}`}>Details</Link>
        </div>
    )
}

export default Movie;