import AuthService from "./../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (AuthService.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/pillz">
              Pillz
            </Link>
          </li>
          <li className="mx-1">
            {}
            <a href="/" onClick={() => AuthService.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="Pillz">💊</span>
          PILLZ HERE
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;