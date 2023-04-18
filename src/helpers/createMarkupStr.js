const commentsStr = (comments) =>
  comments.reduce((prev, curr) => {
    const commentObj = {
      commentId: curr.commentId,
      comment: curr.comment,
    };

    return [...prev, commentObj];
  }, []);

const createMarkupStr = (prev, curr) => {
  const {
    id,
    duration,
    title,
    channelId,
    channelTitle,
    likes,
    views,
    thumbnails,
    description,
    comments,
  } = curr;

  const { max, standard, high, medium } = thumbnails;

  const obj = {
    id,
    title,
    channelName: channelTitle,
    channelId,
    duration,
    views,
    likes,
    thumbnails: {
      default: thumbnails?.default,
      medium,
      high,
      standard,
      max,
    },
    description,
    comments: commentsStr(comments),
  };

  return prev + JSON.stringify(obj, null, 2);
};

export { createMarkupStr };
