import React, { useContext } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner'

import { UploadContext } from '../context/uploadContext';

const UploadFile = () => {

    const { file, handleInputChange, uploadFile, loader } = useContext(UploadContext)

    return (
        <div className='w-full flex flex-col items-center justify-center'>

            <p className='font-semibold text-2xl'>No Files Yet !!</p>

            <p>Upload a file</p>

            <input
                type="file"
                className='ms-10 mt-8 mb-3 text-sm file:cursor-pointer file:w-32 file:h-10 file:mr-3 file:border-0 file:font-medium file:text-violet-700 file:rounded-xl'
                onChange={handleInputChange}
            />

            < button
                className={file ?
                    loader ?
                        `h-11 w-40 flex items-center justify-center space-x-3 border-2 border-blue-700 rounded-xl font-medium bg-blue-700 text-white cursor-not-allowed`
                        :
                        `h-11 w-40 flex items-center justify-center space-x-3 border-2 border-blue-700 rounded-xl md:text-blue-700 text-white md:bg-white bg-blue-700 font-medium md:hover:bg-blue-700 md:hover:text-white`
                    :
                    `h-11 w-40 flex items-center justify-center space-x-3 border-2 border-blue-700 rounded-xl md:text-blue-700 text-white md:bg-white bg-blue-700 font-medium md:hover:bg-blue-700 md:hover:text-white cursor-not-allowed`}
                onClick={file ? uploadFile : e => { e.preventDefault(); toast.error('Select a file first') }}
            >
                {loader ?
                    <ColorRing
                        visible={true}
                        height="45"
                        width="45"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['white', 'white', 'white', 'white', 'white']}
                    />
                    :
                    <><FiUploadCloud /> <p>Upload File</p></>
                }
            </button>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    )
}

export default UploadFile