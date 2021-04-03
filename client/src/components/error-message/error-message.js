import './error-message.css';

const ErrorMessage = ({ err, hideErrorBox }) => {

    return (
        <div className='error' style={{ display: err ? 'block' : 'none' }} >
            <button
                className="close-err-btn"
                onClick={hideErrorBox}
            >X</button>
            <p>{err}</p>
        </div>
    )

}

export default ErrorMessage;