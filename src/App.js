import React from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'

const App = () => {
    return (
        <div className='relative'>
            <Navbar />
            <Home />
        </div>
    )
}

export default App