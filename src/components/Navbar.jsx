import { useRecoilState } from "recoil";
import { isSidebarOpenState } from "../lib/recoil-atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);

  return (
    <nav>
      <div className="column"></div>
      <div className="column">
        <h1>breeze</h1>
      </div>
      <div className="column">
        <span
          className="icons"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faMusic} />
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
