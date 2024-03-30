import "./index.css";
import logo from "../../assets/images/logo.png";

const LoadingPage = ({ width, height }) => {
  return (
    <div
      style={{
        display: "flex",
        height,
        width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="Logo" className="BlinkingImage" style={{ width: "100%" }} />
    </div>
  );
};

export default LoadingPage;
