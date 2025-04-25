export const Delay = async (delay = 1500) => {
  return await new Promise((res) => setTimeout(res, delay));
};
