import { Hostdetails } from "./HostDetails";

const login = async (formData) => {
  console.log("loging in ");
  const url = `http://${Hostdetails.ipAddress}:${Hostdetails.port}/api/v1/auth/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (res.ok) {
    const response = await res.json();
    localStorage.setItem("jackie_token", response.token);
    return response.message;
  }

  return null;
};
const register = async (formData) => {
  const url = `http://${Hostdetails.ipAddress}:${Hostdetails.port}/api/v1/auth/register`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const response = await res.json();
      return response.message; // Return the whole success object
    }
    return null;
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};

const init = async () => {
  const token = localStorage.getItem("jackie_token");
  const url = `http://${Hostdetails.ipAddress}:${Hostdetails.port}/auth/v1/`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.ok) {
    console.log("ok");
    return true;
  }
  console.log("not ok");

  return false;
};
export { login, register, init };
