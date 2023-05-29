import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <p>
        <Link to="menu">Menu</Link>
      </p>
    </>
  );
};

export default HomePage;
