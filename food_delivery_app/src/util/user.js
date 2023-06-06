export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
}

export function getUserId() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export function getName() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  if (!firstName && !lastName) {
    return null;
  }

  return `${firstName} ${lastName}`;
}

export const tokenLoader = () => {
  const token = getToken();
  return token;
};
