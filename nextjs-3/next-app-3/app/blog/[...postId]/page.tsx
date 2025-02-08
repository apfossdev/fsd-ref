// /blog/1
// /blog/2 these will get handled here

import axios from "axios";

export default async function BlogPage({ params }: any) {
  const blogId = (await params).postId;
  // const response = await axios.get(
  //   `https://jsonplaceholder.typicode.com/posts/${blogId}`
  // );
  // const data = response.data;

  return (
    <div>
      Blog page {JSON.stringify(blogId)}
      {/* <br />
      title - {data.title}
      body - {data.body} */}
    </div>
  );
}
