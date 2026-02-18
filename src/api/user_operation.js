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
const register = () => {};
export { login, register };
