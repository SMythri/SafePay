import { authTokenAddress } from '../constants';
import { ethers } from 'ethers';
import auth from '../contracts/Auth.json'


export const register = async(address,name,idProof) => {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(authTokenAddress, auth.abi,signer);
    const registeration = await contract.register(account,name,idProof);
    await registeration.wait();
    alert("Successful")
}


export const checkIsNgo = async() => {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(authTokenAddress, auth.abi,signer);
    const logoutUser = await contract.checkIsNgoRegistered(account);
    console.log(account);
    return logoutUser;
}

export const getNgoName = async() =>{
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(authTokenAddress, auth.abi,signer);
    const ngoName = await contract.user(account);
    return ngoName[1];
}