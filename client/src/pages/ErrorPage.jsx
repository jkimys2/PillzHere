import { useRouteError } from "react-router-dom";
import sadlouis from "../assets/images/sadlouis.png";
import "./Login.css";

const style = {
  margin: 200,
  padding: 20
}
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  

  return (
    <div style={style}>
      <img src={sadlouis} alt="Louis is sad" />
      <h1>Louis is sad</h1>
      <h4>There are no Pillz Here!</h4>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
