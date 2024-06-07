import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
export const Home = () => {
  const { data, isLoading } = useQuery("posts", async () => {
    const response = await axios.get("http://localhost:8000/api/posts");
    return response.data;
  });
  console.log("data", data);

  const truncateString = (text) => {
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <h1 className="mx-auto  font-bold text-5xl text-center text-gray-800 my-5">
          Tech Articles
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto w-11/12">
          {data?.length > 0 ? (
            data.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-sm p-4 my-5 w-full"
              >
                <h1 className="text-2xl font-bold text-gray-800">
                  {" "}
                  {post.title}
                </h1>
                <div>
                  <img
                    src={post.image ? post.image : "https://via.placeholder.com/150"}
                    alt={post.title}
                    className="my-4 w-full h-[300px] object-cover object-center"
                  />
                </div>
                <p className="text-gray-500">
                  {truncateString(post.description)}
                  <Link to={`/post/${post.id}`} className="text-blue-500">Read More</Link>
                </p>
                <div className="flex justify-end space-x-4">
                  <p className="text-gray-500 text-sm">
                    <p className="font-semibold text-sm">By:</p> {post.user}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <p className="font-semibold text-sm">Published on: </p>{" "}
                    {moment(post.created_at).format("ll")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No Posts</div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
