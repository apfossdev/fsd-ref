import axios from "axios";

export default async function Blogs() {

  const getBlogs = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/");
    return response.data;
  }

  const blogs = await getBlogs();

  return <div>
    {blogs.map((blog: ITodo) => <Todo title={blog.title} completed={blog.completed} />)}
  </div>
}

interface ITodo {
  title: string;
  completed: boolean;
}

const Todo = ({title, completed}: ITodo) => {
  return <div>
    {title} {completed ? "done!" : "not done"}
  </div>
} 