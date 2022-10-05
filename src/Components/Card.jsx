function Card({ video }) {
  // console.log(video.items[0].snippet.channelTitle);
  return (
    <div className="grid grid-cols-4 rounded-md bg-neutral  p-4">
      <div>
        <img
          className="h-full"
          src={video.items[0].snippet.thumbnails.default.url}
          alt={`${video.items[0].snippet.title} thumbnail`}
        />
      </div>
      <div className="col-span-3 ml-4">
        <span className="block text-lg">{video.items[0].snippet.title} </span>
        <span className="mt-2 text-sm">
          by: {video.items[0].snippet.channelTitle}
        </span>
      </div>
    </div>
  );
}

export { Card };
