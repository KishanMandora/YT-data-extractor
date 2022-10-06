const createMarkupStr = (prev, curr) => {
  return (
    prev +
    `
  {
    title: "${curr.items[0].snippet.title}"
  }`
  );
};

export { createMarkupStr };
