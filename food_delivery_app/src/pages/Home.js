import { Link } from "react-router-dom";
// import Modal from "../components/Modal/Modal";
const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <p>
        <Link to="menu">Menu</Link>
      </p>
    </div>
  );
};

export default HomePage;
