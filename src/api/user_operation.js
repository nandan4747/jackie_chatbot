import { Hostdetails } from "./HostDetails";

const login = async (formData) => {
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
    localStorage.setItem("jackie_email", formData.email);
    localStorage.setItem("jackie_username", response.name);
    return response.message;
  }

  return false;
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
    return true;
  }

  return false;
};

const handleKeyDown = (e, send_function) => {
  if (e.key === "Enter") {
    if (!e.shiftKey) {
      e.preventDefault();
      send_function();
    }
  }
};

const updatePassword = async (formData) => {
  const token = localStorage.getItem("jackie_token");
  const url = `http://${Hostdetails.ipAddress}:${Hostdetails.port}/api/v1/auth/updatepassword`;

  const payload = { ...formData, email: localStorage.getItem("jackie_email") };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Failed to update" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Network error" };
  }
};
const deleteAccount = async () => {
  const email = localStorage.getItem("jackie_email");
  const token = localStorage.getItem("jackie_token");
  const url = `http://${Hostdetails.ipAddress}:${Hostdetails.port}/api/v1/auth/delete`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await res.json();

    if (res.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Failed to delete" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Network error" };
  }
};
const logout = async () => {
  localStorage.setItem("jackie_token", " ");
  localStorage.setItem("jackie_email", " ");
};
export {
  login,
  register,
  init,
  handleKeyDown,
  updatePassword,
  deleteAccount,
  logout,
};
