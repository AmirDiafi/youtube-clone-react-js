import React from 'react'
import {Link} from 'react-router-dom'
import * as Icons from 'react-icons/all'

class Video extends React.Component{

    render() {
        return (
            <div className='video'>
                <Link 
                    to={{
                        pathname:'/videos/'+this.props.data.id,
                        data: this.props.data
                    }}
                >
                    <video  
                        src={this.props.source} 
                        type='video/mp4' 
                    />
                    <span>
                        <Icons.FaYoutube />
                    </span>
                </Link>
            </div>
        )
    }
}

export default Video