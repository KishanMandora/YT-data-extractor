function Card({ video, dispatch, data }) {
  const { id, title, thumbnails, channelTitle } = video;

  const removeVideoHandler = () => {
    dispatch({ data: data.filter((video) => video.id !== id) });
  };

  return (
    <div className="relative grid grid-cols-4 rounded-md  bg-neutral p-4">
      <div>
        <img
          className="h-full"
          src={thumbnails.default}
          alt={`${title} thumbnail`}
        />
      </div>
      <div className="col-span-3 ml-4">
        <span className="block text-lg">
          <a
            className="link link-hover"
            href={`https://www.youtube.com/watch?v=${id}`}
            target="blank"
          >
            {title}
          </a>
        </span>
        <span className="mt-2 text-sm">by: {channelTitle}</span>
        <div className="absolute bottom-2 right-2">
          <button
            className="btn btn-error btn-circle"
            onClick={removeVideoHandler}
          >
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18px"
              height="18px"
            >
              <path
                fill="none"
                stroke="#000000"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M21,4H3"
              />
              <path d="M15 3L15 4 9 4 9 3 10 2 14 2zM4.366 7L6.069 22 17.931 22 19.634 7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Card };
