const jwt = require('jsonwebtoken');

const get_token =(user)=>{
    let token =jwt.sign({id:user._id,email:user.email,isAdmin:user.isAdmin},
        "sectret key",
        {
            expiresIn:"1d"
        }
    )
    return token;
}

const verify_token=(req,res,next)=>{
    let header = req.headers.authorization;
    if(!header || !header?.includes('Bearer')){
        return res.status(401).json({status:true,message:'Authentication failed!'})
    }
    else{
        let token = header.split(' ')[1];
        try {
            const decode = jwt.verify(token,"sectret key");
            req.user = decode;
            next();
        } catch (error) {
            return res.status(402).json({status:true,message:'Your authentication expired'})
        }
    }
}


module.exports = {get_token,verify_token}