import { makeRequest } from "../../axios";
// eslint-disable-next-line no-unused-vars
import Post from "../post/Post";
import "./posts.scss";
import {useQuery } from 'react-query';

const Posts = () => {
  
    const { isLoading, error, data } = useQuery(["posts"], () =>
      makeRequest.get("/posts").then((res)=>{
        return res.data
      })
    );
    console.log(data);
  return ( 
  <div className="posts">
   {error 
    ? "Something went wrong" 
    : isLoading 
    ? "loading" 
    : data.map((post)=>
      <Post post={post} key={post.id}/>)}
  </div>
    );
};

export default Posts;