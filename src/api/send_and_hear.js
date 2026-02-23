import { Hostdetails } from "./HostDetails";

async function send_and_hear_res(prompt) {
  try {
    const token = localStorage.getItem("jackie_token");
    const url = `http://${Hostdetails.ipAddress}:${Hostdetails.port}/auth/v1/chat`;
    const res = await fetch(url, {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    if (res.status === 429) {
      const errorData = await res.json();
      alert(errorData.error || "Jackie is exhausted! Wait a bit.");
      return null;
    }
    if (res.ok) {
      const data = await res.json();
      return data.response;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
}
export { send_and_hear_res };
