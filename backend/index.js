const express = require('express')
const mongooes = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

mongooes.connect("mongodb://localhost:27017/auth",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
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

const NGO = new mongooes.model("NGO", NgoSchema)
const Donor = new mongooes.model("Donor",DonorSchema)

app.get('/', (req, res) => {
    res.send('Hello World!')
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

app.post("/RegisterDonor",(req,res)=>{
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

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))