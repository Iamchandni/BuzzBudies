import { db } from "../connect";
export const getPosts=(req,res)=>{
    const q=`SELECT p.* , u.id AS userid,name,profilePic FROM posts AS p JOIN users AS u ON (u.id=p.userid)`
    db.query(q,(err,data)=>{
        return res.status(200).json(data);
    })
}