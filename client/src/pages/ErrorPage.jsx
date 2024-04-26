import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
        <img src= "./assets/images/sadlouis.png" alt="Louis is sad" />
      <h1>Louis is sad</h1>
      <p>There are no Pillz Here!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}