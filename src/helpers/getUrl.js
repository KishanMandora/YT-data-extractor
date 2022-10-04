function getUrl(inputValue) {
  const key = import.meta.env.VITE_API_KEY;
  const createUrl = (inputValue) =>
    `https://www.googleapis.com/youtube/v3/videos?id=${inputValue}&key=${key}&part=snippet,contentDetails,statistics,status`;

  const originalLink = inputValue.includes("youtube");
  const shortLink = inputValue.includes("youtu.be");
  let youtubeId;

  if (originalLink) {
    const spiltLink = inputValue.split("v=");
    youtubeId = spiltLink[1];
  } else if (shortLink) {
    const spiltLink = inputValue.split("be/");
    youtubeId = spiltLink[1];
  }

  return createUrl(youtubeId);
}

export { getUrl };
