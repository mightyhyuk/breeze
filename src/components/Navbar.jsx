import { useRecoilState } from "recoil";
import { isLibOpenState } from "../lib/recoil-atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isLibOpen, setIsLibOpen] = useRecoilState(isLibOpenState);

  return (
    <nav>
      <div className="column"></div>
      <div className="column">
        <h1>breeze</h1>
      </div>
      <div className="column">
        <span className="icons" onClick={() => setIsLibOpen(!isLibOpen)}>
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faMusic} />
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
