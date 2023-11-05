import React, { useContext } from 'react'

import { UploadContext } from '../context/uploadContext'
import UploadFile from '../components/UploadFile'
import Display from '../components/Display'

const Home = () => {

    const { account, files } = useContext(UploadContext)

    return (
        <div className={files.length !== 0 ? 'w-full md:mt-44 mt-32 mb-16 flex items-center justify-center' : 'w-full h-screen flex items-center justify-center'}>

            {
                account ?
                    files.length !== 0 ?
                        <Display />
                        :
                        <UploadFile />
                    :
                    <div className='md:w-5/12 w-11/12'>

                        <p className='font-semibold text-lg text-center'>NO ACCOUNT CONNECTED...PLEASE CONNECT WALLET TO GET ACCESS TO OUR SERVICES 😕</p>

                    </div>
            }


        </div>
    )
}

export default Home