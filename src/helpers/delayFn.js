export const Delay = async (delay = 1000) => {
  return await new Promise((res) => setTimeout(res, delay));
};
