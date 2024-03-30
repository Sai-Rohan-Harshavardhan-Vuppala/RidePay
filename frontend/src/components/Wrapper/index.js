import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <div>
      <nav>NAVBAR</nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Wrapper;
