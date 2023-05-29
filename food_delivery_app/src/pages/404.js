import { Fragment } from "react";
import Header from "../components/Header/Header";

const Error404 = () => {
  return (
    <Fragment>
      <Header />
      <main className="centered">
        <h1>An Error Occured</h1>
        <p>Could not find this page</p>
      </main>
    </Fragment>
  );
};

export default Error404;
