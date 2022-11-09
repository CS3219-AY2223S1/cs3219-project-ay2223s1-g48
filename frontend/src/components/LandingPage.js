import Logo from "../Images/logo.svg";
import Icons from "../Images/icons.svg";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };
  return (
    <div className="background">
      <img id="logo-landing" src={Logo} alt="logo" />
      <div>
        <button className="button-primary" onClick={handleStart}>
          Start Coding
        </button>
      </div>
      <div>
        <img id="icons" src={Icons} />
      </div>
    </div>
  );
}

export default LandingPage;
