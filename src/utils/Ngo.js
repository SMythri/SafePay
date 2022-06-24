import { tokenAddress } from '../constants';
import { ethers } from 'ethers'
import donation from '../artifacts/contracts/DonationToOrganization.sol/DonationToOrganization.json';

let numberOfDonation = parseInt(localStorage.getItem('numberOfDonation') || 0);
let numberOfRequest= parseInt(localStorage.getItem('numberOfRequest') || 0);

async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

export async function donateFund(orgName, causeName, amount) {

  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, donation.abi, signer);
    const options = { value: ethers.utils.parseEther(amount) }
    const transaction = await contract.donate(orgName, causeName, options);
    await transaction.wait();
    window.location.reload();
    localStorage.setItem('numberOfDonation',parseInt(numberOfDonation)+1)
    console.log(` Donated successfully sent!!!`);
  }
}

export const getRequest = async (setListOfRequest) => {
  if (typeof window.ethereum !== 'undefined') {
    console.log("hello1");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, donation.abi, signer)
    try {
      console.log("hello");
      for (let i = 0; i < numberOfRequest; i++) {
        console.log("inside for")
        const data = await contract.requests(i);
        setListOfRequest(prev => [...prev, data])
      }
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

export async function createNewRequest(orgName, orgAdsress, causeName, causeDescription, amount) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, donation.abi, signer);
    try{
    const transaction = await contract.createNewRequest(orgName, orgAdsress, causeName, causeDescription, amount);
    await transaction.wait();
    localStorage.setItem('numberOfRequest',parseInt(numberOfRequest)+1)}
    catch{
      alert("Please check your wallet address")
    }
  }
};

export async function getHistory(setListOfDonationHistroy) {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, donation.abi, signer)
    try {
      for (let i = 0; i < numberOfDonation; i++) {
        const data = await contract.histroy(i);
        setListOfDonationHistroy(prev => [...prev, data]);
      }
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}

export async function voteForRequest(index){
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, donation.abi, signer);
    try{
      const data = await contract.voteForRequest(index);
    }catch{
      alert("You have already voted for this request")
    }
  }
}