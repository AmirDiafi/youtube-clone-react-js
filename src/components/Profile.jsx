import React from 'react'
import './stylesheets/profile.css'
import {FaCamera, FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom'

class Profile extends React.Component {

    constructor() {
        super()
        this.backgroundView = React.createRef()
        this.backgroundFile = React.createRef()
        this.BackgroundButton = React.createRef()
        this.picFile = React.createRef()
        this.picView = React.createRef()
        this.picButton = React.createRef()
        this.state = {
            backgroundViewSource: '',
            backgroundSource: '',
            userPicture: 'media/defaultUser.jpeg',
            userPicViewSource: '',
            isWaiting: false,
            isWaitingPic: false
        }
    }

    handleBackgroundChange = (event) => {
        let target = event.currentTarget
        if(target.name ==='backgroundChange') {
            this.backgroundView.current.style.display = 'none'
            this.setState({backgroundSource: this.state.backgroundViewSource})
            setTimeout(() => {
                this.setState({
                    backgroundViewSource: '',
                    isWaiting: false
            })
                this.backgroundFile.current.value = null
            }, 0)
        } else if(target.name ==='pictureChange') {
            this.picView.current.style.display = 'none'
            this.setState({userPicture: this.state.userPicViewSource})
            setTimeout(() => {
                this.setState({
                    userPicViewSource: '',
                    isWaitingPic: false
            })
                this.picFile.current.value = null
            }, 0)
        }
    }

    handleCancle = (event) => {
        let target = event.currentTarget
        console.log(target.id)
        if(target.id ==='backgroundCancel') {
            this.backgroundView.current.style.display = 'none'
            this.backgroundFile.current.value = null
            this.setState({
                backgroundViewSource: '',
                isWaiting: false
            })
        } else if(target.id ==='pictureCancel') {
            this.picView.current.style.display = 'none'
            this.picFile.current.value = null
            this.setState({
                userPicViewSource: '',
                isWaitingPic: false
            })
        }
     
    }

    handleBackground = (event) => {
        let target = event.currentTarget
        if(target.name ==='background') {
            try{
                let file = event.target.files[0]
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadstart = () => {
                    this.setState({isWaiting: true})
                }
                reader.onloadend = () => {
                    if(reader.readyState===2) {
                        this.backgroundView.current.style.display = 'block'
                        this.setState({
                            backgroundViewSource: reader.result
                        })
                    }
                }
            } catch (error) {
                console.log(error)
                alert('you should select a file!')
            }
        } else if(target.name ==='picture') {
            try{
                let file = target.files[0]
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadstart = () => {
                    this.setState({isWaitingPic: true})
                }
                reader.onloadend = () => {
                    if(reader.readyState===2) {
                        this.picView.current.style.display = 'block'
                        this.setState({
                            userPicViewSource: reader.result
                        })
                    }
                }
            } catch (error) {
                console.log(error)
                alert('you should select a file!')
            }
        }
    }

   
    render() { 
        return ( 
            <div className='profile'>
                <div ref={this.backgroundView} className='background-view'>
                    <div className='view'>
                        <img src={this.state.backgroundViewSource} alt=""/>
                        <button 
                            name='backgroundChange' 
                            className='btn' 
                            onClick={this.handleBackgroundChange}
                        >Change</button>
                        <span 
                            onClick={this.handleCancle}
                            id='backgroundCancel'
                        ><FaTimes/></span>
                    </div>
                </div>
                <div ref={this.picView} className='picture-view'>
                    <div className='view'>
                        <img src={this.state.userPicViewSource} alt=""/>
                        <button 
                            name='pictureChange' 
                            className='btn' 
                            onClick={this.handleBackgroundChange}
                        >Change</button>
                        <span 
                            onClick={this.handleCancle}
                            id='pictureCancel'
                        ><FaTimes/></span>
                    </div>
                </div>
                <div className="user">
                    <div className="background">
                        <form className='background-form'>
                            <span>
                                {this.state.isWaiting?<img src='media/wait.gif' alt='' />:<FaCamera/>}
                            </span>
                            <input 
                                type='file'
                                name='background'
                                accept='image/*'
                                ref={this.backgroundFile}
                                onChange={this.handleBackground}
                            />
                        </form>
                        <img src={this.state.backgroundSource} alt="" />
                    </div>
                    <div className="picture">
                    <form className='picture-form'>
                            <span>
                                {this.state.isWaitingPic?<img src='media/wait.gif' alt='' />:<FaCamera/>}
                            </span>
                            <input 
                                type='file'
                                name='picture'
                                accept='image/*'
                                ref={this.picFile}
                                onChange={this.handleBackground}
                            />
                        </form>
                        <img src={this.state.userPicture} alt=""/>
                    </div>
                </div>
                <div className='alert text-center'>
                    <h3>There is no post yet</h3>
                    <p>
                        Upload your post now! <Link to='/'>Upload</Link>
                    </p>
                </div>
            </div>
         )
    }
}
 
export default Profile;