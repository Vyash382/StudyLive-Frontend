const chatCache = new Map();
const MAX_CACHE_SIZE = 3;

export const getCachedMessages = (chatId) => {
  if (!chatCache.has(chatId)) return null;

  const data = chatCache.get(chatId);
  chatCache.delete(chatId);
  chatCache.set(chatId, data); 
  return data;
};

export const cacheMessages = (chatId, messages) => {
  if (chatCache.has(chatId)) {
    chatCache.delete(chatId);
  } else if (chatCache.size >= MAX_CACHE_SIZE) {
    const firstKey = chatCache.keys().next().value;
    chatCache.delete(firstKey);
  }
  chatCache.set(chatId, messages);
};
