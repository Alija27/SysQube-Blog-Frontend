export const Home = () => {
  return (
    <>
      <div className="relative object-center overflow-hidden bg-cover">
        <video loop autoPlay muted>
          <source
            src="https://videos.pexels.com/video-files/3209829/3209829-hd_1280_720_25fps.mp4"
            type="video/mp4"
          ></source>
        </video>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 w-full overflow-hidden "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
        >
          {" "}
          <div className="flex items-center justify-center h-full">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mt-0 mb-6 text-4xl font-bold lg:text-5xl md:text-5xl">
                Navigating the future of technology, together.
              </h1>
              <h3 className="mb-8 text-2xl font-semibold text-gray-300 lg:text-3xl">
                The best place to know about the latest in technology.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="mx-auto  font-bold text-5xl text-center text-gray-800 my-5">Tech Articles</h1>
        <div className="flex mx-auto w-11/12 flex-col">

          <div className="border border-gray-200 rounded-sm p-4 my-5 mx-5">
            <h1 className="text-2xl font-bold text-gray-800">The future of technology</h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              nec purus vel odio. Integer vel orci nec neque ornare pretium.
              Nullam nec purus vel odio. Integer vel orci nec neque ornare
              pretium.<p className="text-blue-500">Read More</p>
            </p>
            <div className="flex justify-end space-x-4">
              <p className="text-gray-500"><p className="font-semibold">By:</p> John Doe</p>
              <p className="text-gray-500"><p className="font-semibold">Published on: </p> 12/12/2021</p>
            </div>
          </div>

        </div>
      </div>

    </>
  );
};
export default Home;
