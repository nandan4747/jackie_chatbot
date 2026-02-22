import Dexie from "dexie";

export const db = new Dexie("JackieChatDB");

db.version(1).stores({
  chats: "timestamp, batch, prompt, response",
});
