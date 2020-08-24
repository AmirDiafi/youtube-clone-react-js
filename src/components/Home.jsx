import React from 'react'
import './stylesheets/home.css'
import {FaPlus, FaCheck} from 'react-icons/fa'

class Home extends React.Component {

    constructor() {
        super()
        this.file = React.createRef()
        this.post = React.createRef()
        this.form = React.createRef()
        this.title = React.createRef()
        this.submitButton = React.createRef()
        this.state = {
            value: '',
            isEmpty: true
        }
    }

    handleFile = () => {
        if(this.file.current.value!==null&&this.file.current.files[0].size <= 100000000) {
            this.setState({isEmpty:false})
            this.form.current.style.width='80%'
            let title = this.title.current.style
            title.opacity='1'
            title.width='60%'
        } else {
            alert('file is too big, please select one less than 100MBs')
        }
    }

    handlePost = (event) => {
        event.preventDefault()
        let file = this.file.current.files[0]
        let reader = new FileReader()
        reader.onloadstart = () => {
            this.submitButton.current.innerHTML = 
            `<img src='media/wait.gif' alt='' />`
        }
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                this.submitButton.current.innerHTML = "Post"
                if(file.type.slice(0, 5)==='image') {
                        let post = `
                        <div class='post'>
                            <img src=${reader.result} alt='' />
                            <div class='info'>
                                <p>${this.state.value}</p>
                                <span>&hearts;</span>
                            </div>
                            <div class='post-footer'></div>
                        </div>
                        `
                        this.post.current.insertAdjacentHTML('afterbegin', post)   
                } else if(file.type.slice(0, 5)==='video') {
                        let post = `
                        <div class='post'>
                            <video controls src=${reader.result} type=${file.type}></video>
                            <div class='info'>
                                <p>${this.state.value}</p>
                                <span>&hearts;</span>
                            </div>
                            <div class='post-footer'></div>
                        </div>
                        `
                        this.post.current.insertAdjacentHTML('afterbegin', post)
                }

                setTimeout(()=> {
                    this.file.current.value = null
                    this.setState({value: '', isEmpty: true})
                    this.form.current.style.width='40%'
                    let title = this.title.current.style
                    title.opacity='0'
                    title.width='0'
                }, 0)
                    
            } else {
                alert('There is an error!')
                this.submitButton.current.innerHTML = "Post"
                this.file.current.value = null
                this.setState({value: '', isEmpty: true})
            }
        }
        reader.readAsDataURL(file)
        
    }

    handleValue = (event) => {
        this.setState({
            value: event.target.value
        })
    }
    
    render() {
        return ( 
            <div className='home-container'>
                <div ref={this.form} className="form">
                    <form onSubmit={this.handlePost}>
                        <div className='file-upload'>
                            <span>{this.state.isEmpty?<FaPlus />:<FaCheck />}</span>
                            <input 
                                type="file" 
                                required 
                                ref={this.file}
                                accept='image/*, video/*'
                                onChange={this.handleFile}
                            />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Add Title' 
                            required
                            ref={this.title}
                            value={this.state.value}
                            onChange={this.handleValue}    
                        />
                        <button 
                            type="submit" 
                            ref={this.submitButton}
                            className='btn btn-primary'
                            disabled={this.state.value===''?true:false}
                        >
                            Post
                        </button>
                    </form>
                </div>
                <div className="posts" ref={this.post}></div>
            </div>
        )
    }
}
 
export default Home;