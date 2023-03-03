import jwt from "jsonwebtoken"

export const createJWT=(user)=>{
    const token=jwt.sign(
        {
            id:user.id,username:user.username,
        },
        process.env.JWT_SECRET
    )

    return token;
}

export const protect=(req,res,next)=>{
    const bearer=req.headers.authorization
    if(!bearer){
        res.status(401);
        res.json({message:"not authorized"})
        return
    }

    const [,token]=bearer.split(' ')
    if(!token){
        console.log("here");
        res.status(401);
        res.send("Not Authorized");
        return;
    }

    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user=payload;
        console.log(payload);
        next();
        return;
    }catch(err){
        console.log(err);
        res.status(401);
        res.send("Not a valid Token");

    }
}