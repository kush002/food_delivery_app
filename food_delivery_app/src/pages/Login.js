import { Link, json, redirect, Route } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import Card from "../components/UI/Card";

import { Fragment } from "react";
const LoginPage = () => {
  return (
    <Fragment>
      <Card style={{ width: "50vh", marginTop: "5rem" }}>
        <LoginForm />
      </Card>
    </Fragment>
  );
};

export default LoginPage;

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const userLoginData = {
    email: data.get("userEmail"),
    password: data.get("loginPassword"),
  };

  const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLoginData),
  });

  if (!response.ok) {
    throw json({ message: "Unable.fetch" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const userId = resData.userId;
  const firstName = resData.firstName;
  const lastName = resData.lastName;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);

  window.location.replace("/");

  return redirect("/");
};
