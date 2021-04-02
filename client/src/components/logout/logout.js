import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = ({ setUserData }) => {

    const history = useHistory();

    useEffect(() => {
        setUserData('');
        history.push('/');
    }, []);

    return null;
}

export default Logout;