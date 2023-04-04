import { useMemo } from 'react'

const ErrorMessage = ({ error, setClassName }) => {
    const errorMsg = useMemo(() => (
        <p className={setClassName}>
            {error ? error : undefined}
        </p>
    ), [error, setClassName])

    return errorMsg
  }

  export default ErrorMessage
