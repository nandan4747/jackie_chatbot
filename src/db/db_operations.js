import { db } from "./jackie_db";

const showChatSummary = async () => {
  const uniqueBatches = await db.chats.orderBy("batch").uniqueKeys();
  if (uniqueBatches.length !== 0) {
    const reversedBatches = uniqueBatches.reverse();
    const firstMessages = await Promise.all(
      reversedBatches.map((batchId) =>
        db.chats.where("batch").equals(batchId).first(),
      ),
    );

    return firstMessages;
  }
  return false;
};
const getBtaches = async () => {
  const uniqueBatches = await db.chats.orderBy("batch").uniqueKeys();
  return uniqueBatches;
};
const getLatestChat = async () => {
  const latestId = await getLatestBatchId();
  if (latestId) {
    return await getChatsByBatch(latestId);
  }
  return [];
};
const getChatsByBatch = async (batchId) => {
  return await db.chats.where("batch").equals(batchId).sortBy("timestamp");
};

const continueLatestChat = async () => {
  return await getLatestChat();
};
const getLatestBatchId = async () => {
  // Directly get the highest batch number without loading the whole list
  const latest = await db.chats.orderBy("batch").reverse().first();
  return latest ? latest.batch : null;
};
export {
  showChatSummary,
  getBtaches,
  continueLatestChat,
  getLatestChat,
  getChatsByBatch,
  getLatestBatchId,
};
