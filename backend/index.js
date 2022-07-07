const express = require("express");
const mongooes = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { integerPropType } = require("@mui/utils");
const app = express();
const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

mongooes.connect("mongodb://localhost:27017/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const NgoSchema = new mongooes.Schema({
  orgName: String,
  owner: String,
  aadhar: String,
  certificate: String,
  orgAddress: String,
  password: String,
});

const DonorSchema = new mongooes.Schema({
  donor: String,
  email: String,
  aadhar: String,
  walletAddress: String,
  password: String,
});

const CauseSchema = new mongooes.Schema({
  orgName: String,
  orgAdsress: String,
  causeName: String,
  causeDescription: String,
  amount: String,
  vote: String,
});

/* SCHEMA FOR DONOR - CAUSE */
const userDonationSchema = new mongooes.Schema({
  walletAddress: String,
  tokenAddress: String,
  orgName: String,
  causeName: String,
});

const BeneficiarySchema = new mongooes.Schema({
  beneficiary: String,
  email: String,
  aadhar: String,
  walletAddress: String,
  password: String,
  orgAdsress: String,
  causeName: String,
});

const NGO = new mongooes.model("NGO", NgoSchema);
const Donor = new mongooes.model("Donor", DonorSchema);
const Cause = new mongooes.model("Cause", CauseSchema);
const Donations = new mongooes.model("userDonations", userDonationSchema);
const Beneficiary = new mongooes.model("Beneficiary", BeneficiarySchema);

app.get("/", (req, res) => {
  res.render("index", { details: null });
});

/* NGO: TO REGISTER AS AN NGO */
app.post("/RegisterNGO", (req, res) => {
  console.log(req.body);
  const { orgName, owner, aadhar, certificate, orgAddress, password } =
    req.body;
  NGO.findOne({ aadhar: aadhar }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new NGO({
        orgName,
        owner,
        aadhar,
        certificate,
        orgAddress,
        password,
      });
      user.save((err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send({ message: "sucessfull" });
        }
      });
    }
  });
});

/* NGO: TO LOGIN AS AN NGO */
app.post("/LoginNGO", (req, res) => {
  const { orgAddress, password } = req.body;
  NGO.findOne({ orgAddress: orgAddress }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.status(200).send({ message: "login sucess", user: user });
      } else {
        res.status(401).send({ message: "wrong credentials" });
      }
    } else {
      res.status(400).send("not registered");
    }
  });
});

/* NGO: TO CREATE A CAUSE */
app.post("/CreateRequest", (req, res) => {
  console.log(req.body);
  const {
    orgName,
    orgAdsress,
    causeName,
    causeDescription,
    amount,
    vote,
    beneficiaryNo,
  } = req.body;
  Cause.findOne({ causeName: causeName }, (err, user) => {
    if (user) {
      console.log("in create req");
      res.send({ message: "Cause already exist" });
    } else {
      const user = new Cause({
        orgName,
        orgAdsress,
        causeName,
        causeDescription,
        amount,
        vote,
        beneficiaryNo,
      });
      user.save((err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send({ message: "sucessfull" });
        }
      });
    }
  });
});

/* NGO: CAUSE GET ALL THE CAUSES*/
app.get("/getdetails", (req, res) => {
  Cause.find({}, (err, allDetails) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ allDetails });
    }
  });
});

/* NGO: CAUSE: TO UPVOTE A CAUSE */
app.post("/approve", (req, res) => {
  // to upvote a cause listed
  const { causeName, vote } = req.body;
  let approveVote = parseInt(vote) + 1;
  approveVote.toString();
  Cause.findOneAndUpdate(
    { causeName: causeName },
    { $set: { vote: approveVote } },
    (err, newDetails) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ newDetails });
      }
    }
  );
});

/* NGO: CAUSE: TO DOWNVOTE A CAUSE */
app.post("/reject", (req, res) => {
  const { causeName, vote } = req.body;
  let approveVote = parseInt(vote) - 1;
  approveVote.toString();
  Cause.findOneAndUpdate(
    { causeName: causeName },
    { $set: { vote: approveVote } },
    (err, newDetails) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ newDetails });
      }
    }
  );
});

/* DONOR: TO REGISTER AS DONOR */
app.post("/RegisterDonor", (req, res) => {
  console.log(req.body);
  const { donor, email, aadhar, walletAddress, password } = req.body;
  Donor.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new Donor({ donor, email, aadhar, walletAddress, password });
      user.save((err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send({ message: "sucessfull" });
        }
      });
    }
  });
});

/* DONOR: TO LOGIN AS DONOR */
app.post("/LoginDonor", (req, res) => {
  const { walletAddress, password } = req.body;
  Donor.findOne({ walletAddress: walletAddress }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.status(200).send({ message: "login sucess", user: user });
      } else {
        res.status(401).send({ message: "wrong credentials" });
      }
    } else {
      res.status(400).send("not registered");
    }
  });
});

/* DONOR: USERDONATION: TO LOG A DONATION MADE */
app.post("/Donations", (req, res) => {
  const { walletAddress, tokenAddress, orgName, causeName } = req.body;
  const newDonation = new Donations({
    walletAddress,
    tokenAddress,
    orgName,
    causeName,
  });
  newDonation.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({ message: "sucessfull" });
    }
  });
});

/* DONOR: USERDONATION: TO GET ALL DONATIONS MADE FROM 1 USER */
app.get("/Donations/:selectedWalletAddres", (req, res) => {
  const { selectedWalletAddres } = req.params;
  Donations.find(
    { walletAddress: selectedWalletAddres },
    (err, allDonations) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ allDonations });
      }
    }
  );
});

/*  BENEFICIARY: REGISTER BENEFICIARY */
app.post("/RegisterBeneficiary", (req, res) => {
  console.log(req.body);
  const { beneficiary, email, aadhar, walletAddress, password } = req.body;
  Beneficiary.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new Beneficiary({
        beneficiary,
        email,
        aadhar,
        walletAddress,
        password,
      });
      user.save((err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send({ message: "sucessfull" });
        }
      });
    }
  });
});

/*  BENEFICIARY: LOGIN BENEFICIARY */
app.post("/LoginBeneficiary", (req, res) => {
  const { walletAddress, password } = req.body;
  Beneficiary.findOne({ walletAddress: walletAddress }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.status(200).send({ message: "login sucess", user: user });
      } else {
        res.status(401).send({ message: "wrong credentials" });
      }
    } else {
      res.status(400).send("not registered");
    }
  });
});

/*  BENEFICIARY: UPDATE BENEFICIARY ACCOUNT: POST CAUSE & ORG ADDRESS REGISTERED */
app.post("/UpdateBeneficiary", (req, res) => {
  const { walletAddress, orgAdsress, causeName } = req.body;
  Beneficiary.findOneAndUpdate(
    { walletAddress: walletAddress },
    { $set: { orgAdsress: orgAdsress, causeName: causeName } },
    (err, newDetails) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ newDetails });
      }
    }
  );
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
