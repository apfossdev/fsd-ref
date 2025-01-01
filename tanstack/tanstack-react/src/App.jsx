import { useState, useEffect } from "react"
import axios from 'axios'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
const queryClient = new QueryClient();

//using tanStack
//create a fetch function that gets some data
const getter = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/"
  );
  return response.data;
}

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/"
    );
    //by default all responses in axios is in json format and are stored in response.data
    setPosts(response.data)
  }

  useEffect(() => {
    getPosts()
  }, []);

  //without tanStack we need to write try catch blocks for the above code
  //and also useEffect to setInterval that will run every 5 seconds to check for updates in the posts state variable
  //and write all of this code
  //or rely on the tanStack library




  return (
    // <div>
    //   {/* {JSON.stringify(posts)} */}
    //   {/* {posts.map(post => <div key={post.id}> {post.title} </div>)} */}
    //   {/* wrap the div with the QueryClientProvider */}
    // </div>
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  )
}

const Posts = () => {

  const { data, isLoading, error} = useQuery({ queryKey: ['posts'], queryFn: getter, refetchInterval: 10000});
  //queryKey is the title and queryFn gives the logic as to how to conduct the query
  //the above destructuring of variables occurs and here we only want these 3 details about the query
  //we can also tell it to check every 10s for changes without explicitly using useEffect and setInterval
  if(error){
    return <div>
      Error while fetching
    </div>
  }

  if(isLoading){
    return "Loading"
  }

  return <div>
    {JSON.stringify(data)}
  </div>
}

export default App
