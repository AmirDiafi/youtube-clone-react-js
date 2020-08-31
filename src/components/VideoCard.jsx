import React from 'react'
import Data from '../data.json'
import Video from './Video'
import './stylesheets/videocard.css'
import * as Icons from 'react-icons/all'

class VideoCard extends React.Component{

    constructor(props) {
        super(props)
        this.currentVideo=React.createRef()
        this.speedplayback=React.createRef()
        this.state = {
            products:[],
            isPlay: false,
            range: 0,
            duration: 0,
            currentTime: 0,
            isLiked: false,
            mainVideo: this.props.location.data,
            isMute: false,
            isHide: true,
            volume: 75,
            speed: 100
        }
    }

    handleData = async () => {
        try {
            let videos = Data.filter(result=>result.tags
                .includes(this.props.location.data.tags)
                &&result.id!==this.props.location.data.id)
            this.setState({
                products: videos,
                isPlay: false,
                isLiked: false,
                isMute: false,
                isHide: true,
                speed: 100,
                mainVideo: this.props.location.data
            })
        } catch (error) {
            alert('please enter correct value')
            console.log(error)
        }
    }

    componentDidMount() {
        this.handleData()
    }

    handleClick = () => {
        window.scrollTo(0,0);
        setTimeout(()=>{
            this.handleData()
            this.setState({
                isPlay: this.state.isPlay,
                isLiked: this.state.isLiked,
            })
        },0)
    }

    handlePlay = () => {
        this.currentVideo.current.volume=(this.state.volume/100);
        (this.currentVideo.current.paused)
        ?this.currentVideo.current.play()
        :this.currentVideo.current.pause();
        this.setState({
            isHide: false,
            speed: this.currentVideo.current.playbackRate*100,
            isPlay: !this.currentVideo.current.paused,
            duration: this.currentVideo.current.duration
        })
        this.currentVideo.current.addEventListener('timeupdate', () => {
            this.setState({
                currentTime:this.currentVideo.current.duration-this.currentVideo.current.currentTime,
            })
            this.currentVideo.current.ended&&this.setState({
                isPlay: false,
                isHide: true
            })
        })
    }

    handleReplay = () => {
        this.currentVideo.current.currentTime-=10
        this.setState({range: this.currentVideo.current.currentTime})
    }

    handleForward = () => {
        this.currentVideo.current.currentTime+=10
        this.setState({range: this.currentVideo.current.currentTime})
    }

    handleRange = () => {
        this.setState({range: this.currentVideo.current.currentTime})
    }

    changeRange = (event) => {
        this.currentVideo.current.currentTime=event.target.value
        this.setState({
            range: this.currentVideo.current.currentTime
        })
    }

    handleLike = () => {
        this.setState({isLiked: !this.state.isLiked})
    }

    handleMute = () => {
        this.currentVideo.current.muted=!this.currentVideo.current.muted
        this.setState({isMute: !this.state.isMute})
    }

    handleShare = async () => {
        let shareData = {
            title: `${this.props.location.data.title}`,
            text: 'this is share video',
            url: `http://localhost:3000/videos/${this.props.location.data.id}`
        }
        try {
            await navigator.share(shareData);
            alert('data shared successfully')
        } catch (error) {
            alert('share failed : '+ error)
        }
    }

    changeVolume = (event) => {
        this.currentVideo.current.volume=(event.target.value/100);
        this.setState({
            volume: event.target.value
        });
        setTimeout(()=>{
            if(this.state.volume>0) {
                this.setState({isMute: false})
            } else {
                this.setState({isMute: true})
            }
        },0)
    }

    speedIncrease = () => {
        if(this.currentVideo.current.playbackRate<2) {
            this.currentVideo.current.playbackRate+=.25
        }
        setTimeout(()=>{
            this.setState({
                speed: this.currentVideo.current.playbackRate*100
            })
        },0)
    }

    speedDeacrese = () => {
        if(this.currentVideo.current.playbackRate>.25) {
            this.currentVideo.current.playbackRate-=.25
        }
        setTimeout(()=>{
            this.setState({
                speed: this.currentVideo.current.playbackRate*100
            })
        },0)
    }

    

    render() {
        let speed;
        if(this.state.speed===100) speed='Normal'
        else if (this.state.speed===200) speed = 'Faster'
        else if (this.state.speed===25) speed = 'Slower'
        else speed=this.state.speed+'%'
        return (
            <React.Fragment>
                {this.state.mainVideo?
                <div className='row video-card'>
                    <div className='item col col-12 col-sm-8'>
                        <div className='video main'>
                            <video 
                                onTimeUpdate={this.handleRange}
                                ref={this.currentVideo}
                                src={'../media/videos/'+this.state.mainVideo.source} 
                                type='video/mp4'
                            />
                            <span 
                                className='play-pause'
                                onClick={this.handlePlay}
                                >{this.state.isPlay
                                ?<Icons.BsPause />
                                :<Icons.BsPlay />}
                            </span>
                            <span 
                                className='replay'
                                onDoubleClick={this.handleReplay}
                                ><Icons.MdReplay10 />
                            </span>
                            <span 
                                className='forward'
                                onDoubleClick={this.handleForward}
                                ><Icons.MdForward10 />
                            </span>
                            <div className='volume'>
                                <span 
                                    className='mute'
                                    onClick={this.handleMute}
                                    >{this.state.isMute
                                        ?<Icons.GoMute />
                                        :<Icons.GoUnmute />}
                                </span>
                                <input 
                                    onChange={this.changeVolume}
                                    type='range' 
                                    value={this.state.volume} 
                                    min='0' 
                                    max='100' 
                                />
                            </div>
                            <div className='playback-rate'>
                                <span 
                                    onClick={this.speedDeacrese}
                                    className="speed plus">
                                    <Icons.AiFillBackward />
                                </span>
                                <span 
                                    onClick={this.speedIncrease}
                                    className="speed plus">
                                    <Icons.AiFillForward />
                                </span>
                                <span className='speed-value'>
                                    {speed}
                                </span>
                            </div>
                            <span 
                                className={this.state.isHide
                                    ?'duration hide':'duration'}
                                >{(this.state.currentTime/60<10)
                                    ?'0'+Math.floor(this.state.currentTime/60)
                                    :Math.floor(this.state.currentTime/60)}
                                :
                                {(this.state.currentTime%60<10)
                                    ?'0'+Math.floor(this.state.currentTime%60)
                                    :Math.floor(this.state.currentTime%60)}
                            </span>
                            
                        </div>
                        <input 
                            onChange={this.changeRange}
                            type='range' 
                            value={this.state.range} 
                            min='0' 
                            max={this.state.duration} 
                        />
                        <div className='info'>
                            <div className='publisher'>
                                <img 
                                    src={'../media/images/'+this.state.mainVideo.picture} 
                                    alt=''
                                />
                                <span>
                                    {this.state.mainVideo.username}
                                </span>
                            </div>
                            <p>
                                {(this.state.mainVideo.title.length>15)
                                ?this.state.mainVideo.title.substr(0,15)+'...'
                                :this.state.mainVideo.title
                            }
                            </p>
                            <div 
                                className='share'
                                onClick={this.handleShare}
                            >
                                <Icons.GrShareOption />
                            </div>
                            <span 
                                onClick={this.handleLike}
                                className={this.state.isLiked?'like':null}
                            >
                                {this.state.mainVideo.likes}
                                <Icons.FaHeart />
                            </span>
                        </div>
                    </div>
                    <hr/>
                    <div 
                        onClick={this.handleClick}
                        className='item related-videos col col-12 col-sm-4'>
                        {this.state.products.map(result=>
                            <Video 
                                key={result.id}
                                data={result}
                                source={'../media/videos/'+result.source}
                            />
                        )}
                    </div>
                </div>
                :<div className='wait'>
                    <img src='../media/images/norecordfound.png' alt=''/>
                    <h3 className='text-center'>There was a problem</h3>
                </div>}
            </React.Fragment>
        )
    }
}

export default VideoCard