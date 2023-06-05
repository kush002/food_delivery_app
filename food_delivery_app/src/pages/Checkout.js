import CheckoutDetails from "../components/Checkout/CheckoutDetails";
import { getToken } from "../util/user";
import { json, redirect } from "react-router-dom";

const CheckoutPage = () => {
  return <CheckoutDetails />;
};
export default CheckoutPage;

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const addressDetails = {
    firstName: data.get("first-name"),
    lastName: data.get("last-name"),
    address: data.get("address"),
    city: data.get("city"),
    country: data.get("country"),
    state: data.get("state"),
    postalCode: data.get("postal-code"),
    phone: data.get("phone"),
  };

  const response = await fetch("http://localhost:8080/user/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(addressDetails),
  });

  if (!response.ok) {
    throw json({ message: "Could not save data" }, { status: 500 });
  }

  return redirect("/checkout");
};
