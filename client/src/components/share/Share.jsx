import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext , useState} from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import {useQueryClient,useMutation} from 'react-query'

const Share = () => {
 const[desc, setDesc]=useState("");
 const[file,setFile]=useState(null);
 const {currentUser} = useContext(AuthContext);

 const upload=async()=>{
  try {
    const formData=new FormData();
    formData.append("file",file)
    const res=await makeRequest.post("/upload",formData);
    return res.data;
  } catch (error) {
    
  }
 }

 const queryClient=useQueryClient();

 const mutation = useMutation((newPost)=>{
  return makeRequest.post("/posts",newPost);
 },{
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ["posts"] })
  },
})


  const handleClick=async (e)=>{
    e.preventDefault();
    let imgUrl="";
    if(file) imgUrl = await upload();
    mutation.mutate({desc, img:imgUrl})
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e)=>setDesc(e.target.value)} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.file[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;