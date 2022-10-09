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
  return (
    prev +
    `
  {
    id: "${curr.id}",
    title: "${curr.title}",
    channelName: "${curr.channelTitle}",
    channelId:  "${curr.channelId}",
    duration:  "${curr.duration}",
    views:  "${curr.views}",
    likes:  "${curr.likes}",
    thumbnails: {
      default:  "${curr.thumbnails.default}",
      medium:  "${curr.thumbnails.medium}",
      high:  "${curr.thumbnails.high}",
      standard:  "${curr.thumbnails.standard}",
      max:  "${curr.thumbnails.max}",
    },
    description:  "${curr.description}",
    comments:[  ${commentsStr(curr.comments)}
    ]
  }`
  );
};

export { createMarkupStr };
