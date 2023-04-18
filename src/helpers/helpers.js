function getVideoId(inputValue) {
  const originalLink = inputValue.includes("youtube");
  const shortLink = inputValue.includes("youtu.be");
  let videoID;

  if (originalLink) {
    const spiltLink = inputValue.split("v=");
    videoID = spiltLink[1];
  } else if (shortLink) {
    const spiltLink = inputValue.split("be/");
    videoID = spiltLink[1];
  }

  return videoID;
}

function getUrl(videoId) {
  const key = import.meta.env.VITE_API_KEY;
  const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${key}&part=snippet,contentDetails,statistics,status`;
  const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=5&order=relevance&textFormat=html&videoId=${videoId}&key=${key}`;

  return { videoDetailsUrl, commentsUrl };
}

function checkForDuplicate(data, videoId) {
  let flag;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === videoId) {
      flag = data[i]?.title || true;
      break;
    }
  }

  return flag;
}

function structuredResponseData(responseData, comments) {
  const structuredComments = comments.map((comment) => ({
    commentId: comment.id,
    comment: comment.snippet.topLevelComment.snippet.textOriginal,
  }));

  return {
    id: responseData.items[0].id,
    title: responseData.items[0].snippet.title,
    channelTitle: responseData.items[0].snippet.channelTitle,
    channelId: responseData.items[0].snippet.channelId,
    description: responseData.items[0].snippet.description,
    thumbnails: {
      default: responseData.items[0].snippet.thumbnails.default.url,
      medium: responseData.items[0].snippet.thumbnails.medium.url,
      high: responseData.items[0].snippet.thumbnails.high.url,
      standard: responseData.items[0].snippet.thumbnails.standard
        ? responseData.items[0].snippet.thumbnails.standard.url
        : "",
      max: responseData.items[0].snippet.thumbnails.maxres
        ? responseData.items[0].snippet.thumbnails.maxres.url
        : "",
    },
    duration: responseData.items[0].contentDetails.duration,
    views: responseData.items[0].statistics.viewCount,
    likes: responseData.items[0].statistics.likeCount,
    comments: structuredComments,
  };
}

export { getUrl, getVideoId, checkForDuplicate, structuredResponseData };
