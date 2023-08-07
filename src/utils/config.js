export default {
  delay: (delay) => Number(delay) ?? 2,
  getSource: async (url) => {
    const response = await fetch(url);
    return await response.json();
  },
};
