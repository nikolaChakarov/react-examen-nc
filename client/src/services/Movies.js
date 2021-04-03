import { getLocalStorage } from '../services/auth';

class Movies {

    create = async (movie) => {

        const res = await fetch('http://localhost:5000/movies/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getLocalStorage().token
            },
            body: JSON.stringify(movie)
        });
        const data = await res.json();
        return data;

    }

    getAllMovies = async () => {
        const res = await fetch('http://localhost:5000/movies/all', {
            method: 'GET',
            headers: {
                'x-auth-token': getLocalStorage().token
            }
        });
        const data = await res.json();
        return data;
    }

    getMovieById = async (id) => {
        const res = await fetch(`http://localhost:5000/movies/${id}`, {
            method: 'GET',
            headers: {
                'x-auth-token': getLocalStorage().token
            }
        });
        const data = await res.json();
        return data;
    }

}

export default new Movies();