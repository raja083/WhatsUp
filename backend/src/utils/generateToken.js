import jwt from "jsonwebtoken";

export const generateToken = (res,user,message)=>{
    const token = jwt.sign( //user id is saved inside token for future use
        {
            userId:user._id
        }, 
        process.env.TOKEN_SECRET,
        {
            expiresIn:'1d'
        }
    )

    return res
    .status(200)
    .cookie("token",token ,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:24*60*60*1000
    }).json({
        success:true,
        message,
        user
    })

}