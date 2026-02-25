import Dexie from "dexie";

export const db = new Dexie("JackieChatDB");

db.version(1).stores({
  chats: "timestamp, batch, jackie_email, prompt,response",
});
