import { db } from "./jackie_db";

const showChatSummary = async () => {
  let email = localStorage.getItem("jackie_email");
  console.log(email);
  const userChats = await db.chats
    .where("jackie_email")
    .equals(email)
    .toArray();
  console.log("chats -----------------------------");
  for (let i = 0; i < userChats.length; i++) {
    console.log(userChats[i].prompt + " " + userChats[i].jackie_email);
  }
  const uniqueBatches = [
    ...new Set(userChats.map((chat) => chat.batch)),
  ].sort();
  if (uniqueBatches.length !== 0) {
    const reversedBatches = uniqueBatches.reverse();

    const firstMessages = await Promise.all(
      reversedBatches.map((batchId) =>
        db.chats
          .where("batch")
          .equals(batchId)
          .filter((chat) => chat.jackie_email === email)
          .first(),
      ),
    );

    return firstMessages;
  }
  return false;
};

const getBtaches = async () => {
  let email = localStorage.getItem("jackie_email");
  const userChats = await db.chats
    .where("jackie_email")
    .equals(email)
    .toArray();
  const uniqueBatches = [
    ...new Set(userChats.map((chat) => chat.batch)),
  ].sort();
  return uniqueBatches;
};

const getLatestChat = async () => {
  let latestId = await getLatestBatchId();
  if (latestId) {
    return await getChatsByBatch(latestId);
  }
  return [];
};
const getChatsByBatch = async (batchId) => {
  const email = localStorage.getItem("jackie_email");
  return await db.chats
    .where("batch")
    .equals(batchId)
    .filter((chat) => chat.jackie_email === email) // Filter in JS memory
    .sortBy("timestamp");
};

const continueLatestChat = async () => {
  return await getLatestChat();
};

const getLatestBatchId = async () => {
  const email = localStorage.getItem("jackie_email");

  const userChats = await db.chats
    .where("jackie_email")
    .equals(email)
    .toArray();

  // 1. If no chats at all, start at batch 1
  if (userChats.length === 0) return "1";

  // 2. Filter out any 'null' or 'undefined' batches that might be lurking in your DB
  const uniqueBatches = [...new Set(userChats.map((chat) => chat.batch))]
    .filter((b) => b !== null && b !== undefined)
    .sort((a, b) => a - b);

  // 3. Return the last batch ID, or "1" if all existing batches were null
  return uniqueBatches.length > 0
    ? uniqueBatches[uniqueBatches.length - 1]
    : "1";
};

export const deleteUserChats = async () => {
  const email = localStorage.getItem("jackie_email");
  try {
    // Look for the email index and delete all matches
    const deleteCount = await db.chats
      .where("jackie_email")
      .equals(email)
      .delete();

    console.log(`Successfully deleted ${deleteCount} chats for ${email}.`);
    return true;
  } catch (error) {
    console.error("Failed to delete chats:", error);
    return false;
  }
};
export {
  showChatSummary,
  getBtaches,
  continueLatestChat,
  getLatestChat,
  getChatsByBatch,
  getLatestBatchId,
};
