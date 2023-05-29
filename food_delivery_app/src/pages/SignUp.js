import { Link, redirect, json } from "react-router-dom";
import Card from "../components/UI/Card";
import SignUp from "../components/Auth/SignUp";
const SignUpPage = () => {
  return (
    <Card style={{ width: "50vh", marginTop: "5rem" }}>
      <SignUp />
    </Card>
  );
};

export default SignUpPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw json({ message: "could not fetch" }, { status: 500 });
  }

  return redirect("/login");
}
