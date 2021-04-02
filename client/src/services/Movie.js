import { getLocalStorage } from '../services/auth';

class Movie {

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

}

export default new Movie();