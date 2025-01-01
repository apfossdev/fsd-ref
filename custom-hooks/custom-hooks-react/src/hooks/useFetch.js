import { useState, useEffect } from "react";
import axios from "axios";

// custom hooks
export function usePostTitle() {
    const [post, setPost] = useState([]);

    async function getPosts() {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
    );
    const json = await response.data;
    setPost(json);
    }

    //need to write async getPosts separately as inside useEffect can't directly write async logic

    //when the component mounts, it gets the posts here
    useEffect(() => {
    getPosts();
    }, []);

    return post.title;
}

export function useFetch(url) {
    const [finalData, setFinalData] = useState({});
    const [loading, setLoading] = useState(true);

    const getFinalData = async () => {
        setLoading(true);
        const response = await axios.get(url);
        const json = await response.data;
        setFinalData(json);
        setLoading(false);
    }

    useEffect(() => {
        getFinalData();
    }, [url]) //run this whenever the component is mounted and/or anytime the url changes

    useEffect(() => {
        const intervalId = setInterval(getFinalData, 10 * 1000); //every 10s the data is being re-fetched here

        // Cleanup function
        return () => clearInterval(intervalId);

    }, []);
    
    return {
        finalData,
        loading
    }
}