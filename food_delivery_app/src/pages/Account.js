import { useLoaderData, defer, Await, json, redirect } from "react-router-dom";
import { Suspense } from "react";
import MyAccount from "../components/Account/MyAccount";
// import Card from "../components/UI/Card";
import { getToken } from "../util/user";
const AccountPage = () => {
  const { addressData } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={addressData}>
        {(loadedAddress) => <MyAccount addressData={loadedAddress} />}
      </Await>
    </Suspense>
  );
};
export default AccountPage;

async function loadAddress() {
  const response = await fetch("http://localhost:8080/user/address", {
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
      ? "http://localhost:8080/user/address/" + params.addressId
      : "http://localhost:8080/user/address";
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

  return redirect("/account/addressId");
};
