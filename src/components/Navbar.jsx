import React, { useContext } from 'react'
import { IoWallet } from "react-icons/io5";

import { UploadContext } from '../context/uploadContext'
import Logo from '../assets/Logo.png'
import Metamask from '../assets/MetaMask.png'

const Navbar = () => {

    const { account, connectWallet } = useContext(UploadContext)

    return (

        <div className='flex items-center justify-between md:px-10 px-2 py-3 shadow-md bg-white fixed top-0 left-0 right-0 w-full'>

            <div className='flex md:flex-row flex-col items-center justify-center'>
                <img src={Logo} alt="logo" className='md:w-20 md:h-16 w-10 h-8 rotate-45' />
                <div className='flex flex-col md:items-start items-center justify-center'>
                    <p className='text-xs font-bold cursor-default'>DECENTRALISED</p>
                    <p className='text-xs font-bold cursor-default'>FILE SYSTEM</p>
                </div>
            </div>

            <div className='flex md:flex-row flex-col items-center justify-center md:mr-0 mr-5'>
                <img src={Metamask} alt="Add" className='w-10 h-10' />
                <p className='font-medium text-xs md:hidden cursor-default'>{account !== "" ? account.slice(0, 5) + '...' + account.slice(-1) : 'NO WALLET CONNECTED'}</p>
                <p className='font-medium md:text-sm text-xs md:block ms-5 hidden cursor-default'>{account !== "" ? account : 'NO WALLET CONNECTED'}</p>
            </div>

            < button
                className={account ? `h-11 w-28 hidden md:flex items-center justify-center border-2 border-blue-700 rounded-xl font-medium text-sm bg-blue-700 text-white cursor-not-allowed me-10` : `h-11 w-28 hidden md:flex items-center justify-center border-2 border-blue-700 rounded-xl text-blue-500 font-medium text-sm hover:bg-blue-700 hover:text-white me-10`}
                onClick={account ? e => e.preventDefault() : connectWallet}
            >

                {account ? 'Connected' : 'Connect'}

            </button >

            < button
                className={account ? `h-12 w-12 md:hidden flex items-center justify-center border-2 border-blue-400 rounded-full text-xl font-medium bg-blue-400 text-white cursor-default` : `h-14 w-14 md:hidden flex items-center justify-center border-2 border-blue-700 rounded-full text-xl text-white bg-blue-700 font-medium `}
                onClick={account ? e => e.preventDefault() : connectWallet}
            >

                {account ? <IoWallet /> : <IoWallet />}

            </button >

        </div>

    )
}

export default Navbar