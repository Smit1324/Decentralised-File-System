import React, { useContext, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner'

import { UploadContext } from '../context/uploadContext'

const Display = () => {

    const { files, file, handleInputChange, uploadFile, loader } = useContext(UploadContext)

    const [uploading, setUploading] = useState(false)

    const UploadFile = e => {
        e.preventDefault()
        setUploading(!uploading)
    }

    return (

        <div className={`md:w-9/12 w-12/12`}>

            <div className={`w-full grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-5 ${uploading && 'blur-sm'}`}>

                {
                    files.map((file, index) => {
                        return (

                            <a href={!uploading && file} target='_blank' key={index} className='border-2 rounded-lg w-40 h-52 flex items-center justify-center hover:border-zinc-500'>

                                <img src={file} alt="file_preview_error" />

                            </a>

                        )
                    })
                }

                <button
                    className={`border-4 border-dashed rounded-lg w-40 h-52 flex items-center justify-center text-5xl text-zinc-400 ${!uploading && 'hover:text-black hover:border-black'} transition ease-in delay-50 duration-200`}
                    onClick={UploadFile}
                    disabled={uploading}
                >

                    <AiFillPlusCircle />

                </button>

            </div>


            <div className={uploading ? `absolute md:top-10 top-20 md:left-1/3 md:w-4/12 w-11/12 h-60 rounded-xl bg-white shadow-2xl flex items-center justify-center` : `hidden`}>

                <button
                    className='absolute top-5 right-5 text-xl'
                    onClick={e => { e.preventDefault(); setUploading(false) }}
                >
                    <AiOutlineClose />
                </button>

                <div className='flex flex-col items-center justify-center space-y-5'>

                    <input
                        type="file"
                        className='ms-10 text-sm file:cursor-pointer file:w-32 file:h-10 file:mr-3 file:border-0 file:font-medium file:text-violet-700 file:rounded-xl'
                        onChange={handleInputChange}
                    />
                    < button
                        className={file ?
                            loader ?
                                `h-11 w-40 flex items-center justify-center space-x-3 border-2 border-blue-700 rounded-xl text-white font-medium bg-blue-700 cursor-not-allowed`
                                :
                                `h-11 w-40 flex items-center justify-center space-x-3 border-2 border-blue-700 rounded-xl text-blue-700 font-medium hover:bg-blue-700 hover:text-white`
                            :
                            `h-11 w-40 flex items-center justify-center space-x-3 border-2 border-blue-400 rounded-xl text-blue-400 font-medium cursor-not-allowed`}
                        onClick={file ? loader ? e => e.preventDefault() : uploadFile : e => { e.preventDefault(); toast.error('Select a file first') }}
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

                </div>

            </div>

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

export default Display