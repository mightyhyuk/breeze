import { useRecoilState } from "recoil";
import { isLibOpenState } from "../lib/recoil-atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isLibOpen, setIsLibOpen] = useRecoilState(isLibOpenState);

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
