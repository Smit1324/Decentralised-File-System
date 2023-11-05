import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CONTRACT_ABI, CONTRACT_ADDRESS, pinataApiUrl, pinata_API_key, pinata_secret_API_key } from '../utils/constants'

const { ethereum } = window;

export const UploadContext = React.createContext();

const getEthereumContract = async () => {
    const ethProvider = new ethers.BrowserProvider(ethereum)
    const signer = await ethProvider.getSigner()
    const uploadContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
    return uploadContract
}

const pinataHeader = {
    headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: pinata_API_key,
        pinata_secret_api_key: pinata_secret_API_key,
    },
}

export const ContractProvider = ({ children }) => {

    const [account, setAccount] = useState("")
    const [files, setFiles] = useState('')
    const [file, setFile] = useState('')
    const [loader, setLoader] = useState(false)

    const handleInputChange = (e) => {

        const data = e.target.files[0];
        const reader = new window.FileReader();

        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        e.preventDefault();

    }

    const uploadFile = async () => {
        try {
            setLoader(true)

            const uploadContract = await getEthereumContract()

            const formdata = new FormData()
            formdata.append('file', file)

            const res = await axios.post(pinataApiUrl, formdata, pinataHeader)
            const IpfsHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`

            const uploadHash = await uploadContract.uploadFile(account, IpfsHash)

            await uploadHash.wait();
            setLoader(false)

            getAllFiles(account)

            toast.success('File Uploaded Successfully');

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    const getAllFiles = async (acc) => {
        try {

            const uploadContract = await getEthereumContract()
            const availableFiles = await uploadContract.displayFiles(acc)

            const availableFilesArray = availableFiles.map((file) => { return file })
            setFiles(availableFilesArray)

        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {

            if (!ethereum) return alert('Please Install Metamask 😵‍💫')

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setAccount(accounts[0])
                getAllFiles(accounts[0])
            }

        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {

            if (!ethereum) return alert('Please Install Metamask 😵‍💫')

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            if (accounts.length) {
                setAccount(accounts[0])
                getAllFiles(accounts[0])
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    useEffect(() => {
        if (ethereum) {

            const handleAccountsChanged = async (newAccounts) => {
                if (newAccounts.length > 0) {
                    setAccount(newAccounts[0]);
                    getAllFiles(newAccounts[0])
                } else {
                    setAccount('');
                }
            };

            ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                window.location.reload()
                ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, [ethereum])


    return (
        <UploadContext.Provider value={{ account, connectWallet, files, file, handleInputChange, uploadFile, loader }}>
            {children}

            <ToastContainer
                position="top-center"
                autoClose={1900}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </UploadContext.Provider>
    )

}