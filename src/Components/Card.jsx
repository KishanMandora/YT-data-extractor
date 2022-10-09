function Card({ video }) {
  return (
    <div className="grid grid-cols-4 rounded-md bg-neutral  p-4">
      <div>
        <img
          className="h-full"
          src={video.thumbnails.default}
          alt={`${video.title} thumbnail`}
        />
      </div>
      <div className="col-span-3 ml-4">
        <span className="block text-lg">
          <a
            className="link link-hover"
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="blank"
          >
            {video.title}
          </a>
        </span>
        <span className="mt-2 text-sm">by: {video.channelTitle}</span>
      </div>
    </div>
  );
}

export { Card };
