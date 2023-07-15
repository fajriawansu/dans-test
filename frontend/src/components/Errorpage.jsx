import { useNavigate, useRouteError } from "react-router-dom";

export default function Errorpage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className="w-screen h-screen flex" id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button type="text" className=" bg-softRed" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}