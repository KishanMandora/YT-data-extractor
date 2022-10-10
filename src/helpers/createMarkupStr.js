const commentsStr = (comments) =>
  comments.reduce((prev, curr) => {
    return (
      prev +
      `
  {
    commentId: "${curr.commentId}",
    comment: "${curr.comment}"
  },
  `
    );
  }, ``);

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

  return (
    prev +
    `
  {
    id: "${id}",
    title: "${title}",
    channelName: "${channelTitle}",
    channelId:  "${channelId}",
    duration:  "${duration}",
    views:  "${views}",
    likes:  "${likes}",
    thumbnails: {
      default:  "${thumbnails.default}",
      medium:  "${medium}",
      high:  "${high}",
      standard:  "${standard}",
      max:  "${max}",
    },
    description:  "${description}",
    comments:[  ${commentsStr(comments)}
    ]
  }`
  );
};

export { createMarkupStr };
