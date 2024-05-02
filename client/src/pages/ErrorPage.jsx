import { useRouteError } from "react-router-dom";
import sadLouisImage from "../assets/images/sadlouis.png";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
        <img src={sadLouisImage} alt="Louis is sad"/>
      <h1>Louis is sad</h1>
      <h4>There are no Pillz Here!</h4>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
