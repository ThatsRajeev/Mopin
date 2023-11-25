import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <div className="error-content">
        <h1>Oops! Something went wrong 🤔</h1>
        <p>
          We're sorry, but an unexpected error has occurred. We're working on
          fixing it as soon as possible.
        </p>
        <p>
          {error.statusText || error.message}
        </p>
        <Link to="/">Go back to home page</Link>
      </div>
    </div>
  );
}
