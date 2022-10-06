function filterResponseData(responseData) {
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
      standard: responseData.items[0].snippet.thumbnails.standard.url,
      max: responseData.items[0].snippet.thumbnails.maxres
        ? responseData.items[0].snippet.thumbnails.maxres.url
        : "",
    },
    duration: responseData.items[0].contentDetails.duration,
    views: responseData.items[0].statistics.viewCount,
    likes: responseData.items[0].statistics.likeCount,
  };
}

export { filterResponseData };
