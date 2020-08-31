import React from 'react'
import norecordfound from './assests/not-found.png'

class Error404 extends React.Component {
    render() {
        return (
            <div className='text-center'>
                <img src={norecordfound} alt='' />
                <h2 className='alert alert-danger'>
                    404 Error Page Not Found!
                </h2>
            </div>
        )
    }
}
 
export default Error404;