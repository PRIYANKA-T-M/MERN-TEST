const express=require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const {rateLimiter}=require('express-rate-limit')
const dotenv=require('dotenv')
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken") ;
const nodemailer=require('nodemailer')
dotenv.config()
const port=process.env.PORT
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 55, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})
const app=express()
app.use(express.json())
async function connection(){
    await mongoose.connect(process.env.MONGODBURL)
}
let categorySchema=new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    desciption:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()}
})
let categorymodel=mongoose.model('category',categorySchema)
app.use(limiter)
app.use(cors())
app.post('/categories',async(req,res)=>{
    try{
        const {name,description,createdAt}=req.body
        let newcategory={name,description,createdAt}
        await categorymodel.createdAt(newcategory)
        res.status(201).json({
            msg:"Category added successfully"
        });
    }catch(error){
        res.json({
            msg:error.message
        })
    }
})
app.get('/categories',async(req,res)=>{
    try{
        let categorydata=await categorymodel.find()
        res.json({categorydata})
    }
    catch(error){
        res.json({
            msg:error.message
        })
    }
})
app.get('/categories/:id',async(req,res)=>{
    try{
        let id=req.params.id
        const onecategory=await categorymodel.findById(id)
        res.json({onecategory})
    }
    catch(error){
        res.json({
            msg:error.message
        })
    }
})

app.put('/categories/:id',async(req,res)=>{
    try{
        const {name,description,createdAt}=req.body
        let updatedetails=categorymodel.findById({id})
        if(name) updatedetails.name=name
        if(description) updatedetails.description=description
        if(createdAt) updatedetails.createdAt=createdAt
        res.json({
            msg:"product update successfully"
        })


    }
    catch(error){
        res.json({
            msg:error.message
        })
    }
})


app.delete('/categories/:id',async (req,res)=>{
    try{
        const {_id}=req.body
        finalproducts.findByIdAndDelete(_id)
        res.json({
            msg:"Product is deleted"
        })
    }
    catch(error){
        res.json({
            msg:error.message
        })
    }
})
app.listen(port,async()=>{
    console.log(`The server is running on ${port}`)
    connection();
})



//2.Authentication Enhancement
app.use(nodemailer)
let userSchema=new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    otp:{type:Number, required:false}
});

let usermodel=mongoose.model("users",userSchema)


app.post('/signup',async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        let isuser=await usermodel.findOne({username})
        if(isuser){
            return res.json({msg : "user already exists"});
        }
        let hashedpassword=await bcrypt.hash(password,10)
        await usermodel.create({username,email,password:hashedpassword})
        //send a mail to registered user
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.GMAIL_APP_PASSWORD
            }
        })
        const format={
            from:process.env.GMAIL_USER,
            to:email,
            subject:'Account Registration',
            text:'Account registration mail from web',
            html:`
            <p>Hi ${username}, your account has been registered successfully</p>
            `
        }
        transporter.sendMail(format,(error,info)=>{
            if(error){
                console.log(error.message)
            }
            else{
                console.log("mail sent successfully")
            }
        })
        res.json({
            msg:"user created successfully..."

        })
        
        
    }
    catch(error){
        res.json({
            msg:error.message
        })
    }
    })
    //api for sign in
    app.post('/signin',async(req,res)=>{
        try{
            const {username,password}=req.body;
        let userdetails=await usermodel.findOne({username})
        if(!userdetails) return res.json({msg:"user not found"})
        //username check
        //if(userdetails.username===username) return res.json({msg:"enter the password"})
            let checkpassword=await bcrypt.compare(password,userdetails.password)
        if(!checkpassword) 
            return res.json({msg :"username or password is incorrect "})
        
        let payload={username:username}
        let token=jwt.sign(payload,secretkey,{expiresIn:"1hr"})
        res.json({msg: "Signed in successfully", token:token})

        }
        catch(error){
            res.json({
                msg:error.message
            })
        }
        


    })
    app.post('/forget-password',async(req,res)=>{
        try{
            const {email}=req.body
            let {userdetail}=await usermodel.findOne({email})
            if(!userdetail.email) return res.json({msg:"user not found"})
            const otp= Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
            
            const transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.GMAIL_USER,
                    pass:process.env.GMAIL_APP_PASSWORD
                }
            })
            user.otp=otp
            await user.save()
            const format={
            from:process.env.GMAIL_USER,
            to:email,
            subject:'Forget password otp',
            text:'To reset the password ',
            html:`
            <p>Hi ${user.username},</p>
                <p>Your OTP to reset password is <b>${otp}</b></p>
            `

        }
        await transporter.sendMail(mailOptions);

        res.json({ msg: "OTP sent successfully" });


        }
        catch(error){
            res.json({
                msg:error.message
            })
        }
    })
    app.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({ msg: "User not found" });
        }

        if (user.otp !== Number(otp)) {
            return res.json({ msg: "Invalid OTP" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.otp = null; // clear OTP
        await user.save();

        res.json({ msg: "Password reset successful" });

    } catch (error) {
        res.json({ msg: error.message });
    }
});


