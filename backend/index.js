const express = require('express')
//const mongooes = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
//const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

try {
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mythri:#KaCjhnNMsDC6z-@cluster0.lzvtl8h.mongodb.net/?retryWrites=true&w=majority";
const mongooes = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

mongooes.connect(err => {
  const collection = mongooes.db("test").collection("devices");
  // perform actions on the collection object
});()=>{
    console.log("connected to DB")
}
}catch(error){
    console.log("couldn't connect",error);
}

  const NgoSchema = new mongooes.Schema({
    orgName: String,
    owner: String,
    aadhar: String,
    certificate: String,
    orgAddress: String,
    password: String
})

const DonorSchema = new mongooes.Schema({
    donor: String,
    email: String,
    aadhar: String,
    walletAddress: String,
    password: String
})

const CauseSchema = new mongooes.Schema({
    orgName: String,
    orgAdsress: String,
    causeName: String,
    causeDescription: String,
    amount: String
})

const NGO = new mongooes.model("NGO", NgoSchema)
const Donor = new mongooes.model("Donor",DonorSchema)
const Cause = new mongooes.model("Cause",CauseSchema)


app.get('/', (req, res) => {
    res.render("index",{details: null})
})

app.get("/getdetails", (req,res) => {
    Cause.find({}, (err, allDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.send({allDetails})
        }
    })
})


app.post("/RegisterNGO",(req,res)=>{
    console.log(req.body) 
    const {orgName,owner,aadhar,certificate,orgAddress,password} =req.body;
    NGO.findOne({aadhar:aadhar},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new NGO({orgName,owner,aadhar,certificate,orgAddress,password})
            user.save(err=>{
                if(err){
                    res.status(400).send(err)
                }else{
                    res.status(200).send({message:"sucessfull"})
                }
            })
        }
    })
})

app.post("/CreateRequest",(req,res)=>{
    console.log(req.body) 
    const {orgName,orgAdsress,causeName,causeDescription,amount} =req.body;
    Cause.findOne({causeName:causeName},(err,user)=>{
        if(user){
            console.log("in create req")
            res.send({message:"Cause already exist"})
        }else {
            const user = new Cause({orgName,orgAdsress,causeName,causeDescription,amount})
            user.save(err=>{
                if(err){
                    res.status(400).send(err)
                }else{
                    res.status(200).send({message:"sucessfull"})
                    
                }
            })
        }
    })
})

app.post("/LoginNGO",(req,res)=>{
    const {orgAddress,password} =req.body;
    NGO.findOne({orgAddress:orgAddress},(err,user)=>{
        if(user){
           if(password === user.password){
               res.status(200).send({message:"login sucess",user:user})
           }else{
               res.status(401).send({message:"wrong credentials"})
           }
        }else{
            res.status(400).send("not registered")
        }
    })
});

app.post(uri,(req,res)=>{
    console.log(req.body) 
    const {donor,email,aadhar,walletAddress,password} =req.body;
    Donor.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new Donor({donor,email,aadhar,walletAddress,password})
            user.save(err=>{
                if(err){
                    res.status(400).send(err)
                }else{
                    res.status(200).send({message:"sucessfull"})
                }
            })
        }
    })
})

app.post("/LoginDonor",(req,res)=>{
    const {walletAddress,password} =req.body;
    Donor.findOne({walletAddress:walletAddress},(err,user)=>{
        if(user){
           if(password === user.password){
               res.status(200).send({message:"login sucess",user:user})
           }else{
               res.status(401).send({message:"wrong credentials"})
           }
        }else{
            res.status(400).send("not registered")
        }
    })
});
  //mongooes.close();
//});





// mongooes.connect("mongodb://localhost:27017/auth",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });()=>{
//     console.log("connected to DB")
// }



//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))