const ErrorMessage = ({ error, setClassName }) => {
    return (
        <p className={setClassName}>
            {error ? error : undefined}
        </p>
    )
  }

  export default ErrorMessage
