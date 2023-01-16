import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Navbar({ isLibOpen, setIsLibOpen }) {
  return (
    <nav>
      <h1>breeze</h1>
      <button onClick={() => setIsLibOpen(!isLibOpen)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

export default Navbar;
