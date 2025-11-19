let express=require("express")
let mongoose=require("mongoose")
let multer=require("multer")
let cors=require("cors")
let path=require("path")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
let bookstoreapi=require("./router/Bookstore")
require("dotenv").config();
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

let upload= multer({ storage });


let app=express();


app.use(express.static(path.join(__dirname, "./client/build")));


app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));


let schema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobileNumber:String,
    profilepic:String
    
})
let model=mongoose.model("bhava",schema,"mydetails")
const bookSchema = new mongoose.Schema({
  Authorname: String,
  bookName: String,
  parName: String,
  rate: Number
});

let bookstore = mongoose.model("bhavan",bookSchema,"empl")

app.get("/bookstore", async (req, res) => {
  try {
    let data = await bookstore.find();
    res.json({ status: 200, msg: "retrieved", data:data });
  } catch (err) {
    res.json({ status: 404, msg: "not retrieved" });
  }
});


app.post("/signup",upload.single("profilepicref"),async(req,res)=>{
  let hasspassword=await bcrypt.hash(req.body.password,10)
   let object=new model({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:hasspassword,
    mobileNumber:req.body.mobileNumber,
    profilepic: req.file.filename 
})
object.save()
res.json({status:200,msg:"data is inserted is succesfully"})
})
app.post("/login",upload.none(),async(req,res)=>{
   let object=await model.find({email:req.body.email})
    
   if(object.length!==0 ){
    let hasspassword=await bcrypt.compare(req.body.password,object[0].password)
   console.log(hasspassword)
    if(hasspassword){
      let token=jwt.sign({email:req.body.email,password:req.body.password},process.env.JWT_SECRET)
      let datasend={
        firstName:object[0].firstName,
        lastName:object[0].lastName,
        email:object[0].email,
        mobileNumber:object[0].mobileNumber,
        token:token,
        profilepic:object[0].profilepic
      }
      try{
       res.json({status:200,msg:"your crediential are correct",data:datasend} )
       console.log(datasend)
      }
      catch(err){
        res.json({status:404,msg:"your credientials or wrong"})
      }
      
    }
    else{
      res.json({status:404,msg:"invalidpassword"})
    }
   }
   else{
    res.json({msg:"invalid"})
   }
})
app.post("/load",upload.none(),async(req,res)=>{
  console.log("TOKEN RECEIVED FROM FRONTEND:", req.body.token);
  let token= jwt.verify(req.body.token,process.env.JWT_SECRET)
  console.log(token)
  let object=await model.find({email:token.email})
  console.log(object)
  if(object.length!==0){
    if(object[0].password===token.password){
       let datasend={
        firstName:object[0].firstName,
        lastName:object[0].lastName,
        email:object[0].email,
        mobileNumber:object[0].mobileNumber,
        password:token,
        profilepic:object[0].profilepic
      }
      try{
       res.json({status:200,msg:"your crediential are correct",data:datasend} )
       console.log(datasend)
      }
      catch(err){
        res.json({status:404,msg:"your credientials or wrong"})
      }
    }
  }
 
})
app.patch("/upadte", upload.single("profilepic"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    let updateData = {
      firstName: req.body.firstName,
      // password: req.body.,
      mobileNumber: req.body.mobileNumber
    };

    // if (req.file) {
    //   updateData.profilepic = req.file.filename;
    // }

    let result = await model.updateOne(
      { email: req.body.email },
      { $set: updateData }
    );
    await model.updateOne({email:req.body.email},{lastName:req.body.lastName})

    res.status(200).json("updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("update failed");
  }
});

app.delete("/delete",upload.none(),async(req,res)=>{
  console.log("EMAIL RECEIVED:", req.body.email);
  let deleteddat=  await model.deleteMany({email:req.body.email})
  if(deleteddat.deletedCount>0){
    res.status(200).json("deleted succesfully")
  }
  else{
    res.status(404).json(" not deleted succesfully")
  }
  console.log(deleteddat)
})

let myfunction=async()=>{
    try{
  await  mongoose.connect('mongodb+srv://bhavanarayanachukka:narayana123@cluster0.2ybtcaq.mongodb.net/MERN2506?retryWrites=true&w=majority&appName=Cluster0')
      console.log("sucessfully connected to databse")
      console.log("sucessfully connected to databse");
console.log("Connected DB name:", mongoose.connection.name);
mongoose.connection.db.listCollections().toArray().then(cols => {
  console.log("Collections in DB:", cols.map(c => c.name));
}).catch(err => console.log("List collections err:", err.message));

    }
    catch(err){
      console.log({status:404,msg:"not connected to database something is went wrong"})
    }
}
myfunction()


app.listen(process.env.PORT,()=>{
    console.log("server is running in the port number 1111")
})