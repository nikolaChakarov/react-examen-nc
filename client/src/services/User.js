class User {

    register = async (user) => {

        const data = await fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const res = await data.json();
        return res;
    }

    login = async (user) => {
        const data = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const res = await data.json();
        return res;
    }

}

export default new User();