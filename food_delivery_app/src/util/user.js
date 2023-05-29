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

export const tokenLoader = () => {
  const token = getToken();
  return token;
};
