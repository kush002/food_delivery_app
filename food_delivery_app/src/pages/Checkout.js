import CheckoutDetails from "../components/Checkout/CheckoutDetails";
import { defer, Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { getToken } from "../util/user";
import { json, redirect } from "react-router-dom";

const CheckoutPage = () => {
  const { addressData } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={addressData}>
        {(loadedAddress) => <CheckoutDetails addressData={loadedAddress} />}
      </Await>
    </Suspense>
  );
};
export default CheckoutPage;

async function loadAddress() {
  const response = await fetch(`${process.env.REACT_APP_URL}/user/address`, {
    headers: { Authorization: "Bearer " + getToken() },
  });

  if (!response.ok) {
    throw json({ message: "could not fetch data" }, { status: 500 });
  } else {
    const data = await response.json();
    console.log(data);
    return data.addresses;
  }
}

export async function loader() {
  return defer({
    addressData: loadAddress(),
  });
}

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

  // console.log(request.url, request.method, params.addressId);
  const url =
    request.method === "PUT"
      ? `${process.env.REACT_APP_URL}/user/address/` + params.addressId
      : `${process.env.REACT_APP_URL}/user/address`;
  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(addressDetails),
  });

  if (!response.ok) {
    throw json({ message: "Could not save data" }, { status: 500 });
  }

  return redirect("/checkout/:addressId");
};
