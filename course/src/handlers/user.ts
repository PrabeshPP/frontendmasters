import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser=async(req,res)=>{
    const hashedPassword=await hashPassword(req.body.password);
    const user=await prisma.user.create({
        data:{
            username:req.body.username,
            password:hashedPassword
        }
    })
    const token=createJWT(user);
    res.json({token})
}


export const signin=async(req,res)=>{
    const username=req.body.username;
    const plainPassword=req.body.password;
    const foundUser=await prisma.user.findUnique({
        where:{
            username:username
        }
    });
    if(foundUser){
        const passwordMatched=await comparePasswords(plainPassword,foundUser.password);
        if(passwordMatched){
            const token=createJWT(foundUser);
            return res.json({token});
        }else{
            res.status(401);
            res.send("Authentication Failed")
        }
    }

}