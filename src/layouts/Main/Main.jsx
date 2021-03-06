import React from 'react';

import Navbar from '../../components/Navbar'

import florVideo from '../../assets/videos/flor.mp4'
import arrozVideo from '../../assets/videos/arroz.mp4'
import playaVideo from '../../assets/videos/playa.mp4'
import lighthouseVideo from '../../assets/videos/lighthouse.mp4'

import florImage from '../../assets/images/flor.png'
import arrozImage from '../../assets/images/arroz.png'
import playaImage from '../../assets/images/playa.png'
import lighthouseImage from '../../assets/images/lighthouse.png'

export default function Main() {
    const [video, setVideo] = React.useState(florVideo);
    const [playControl, setPalyControl] = React.useState('play_arrow');
    const [volumeControl, setVolumeControl] = React.useState('volume_up');
    const [currentTimeBar, setcurrentTimeBar] = React.useState(0);

    const [currentTime, setCurrentTime] = React.useState('0:00');
    const [duration, setDuration] = React.useState('0:00');

    const videoControl = React.createRef();

    const playPauseHandle = () => {
        console.log(videoControl.current.duration);
        if (videoControl.current.paused) {
            videoControl.current.play();
            setPalyControl('pause');
        } else {
            videoControl.current.pause();
            setPalyControl('play_arrow');
        }
    }

    const mute = () => {
        if (videoControl.current.muted) {
            videoControl.current.muted = false;
            setVolumeControl('volume_up');
        } else {
            videoControl.current.muted = true;
            setVolumeControl('volume_off');
        }
    }

    const volume = (event) => {
        if (videoControl.current.muted)
            videoControl.current.muted = false;

        if (event.target.value / 100 <= 0.01)
            setVolumeControl('volume_off');
        else
            setVolumeControl('volume_up');

        videoControl.current.volume = event.target.value / 100;
    }

    const fullScreen = () => videoControl.current.requestFullscreen();

    const timeFormat = (time) => {
        const round = Math.ceil(time);
        const sec = round % 60;
        const min = (round / 60).toFixed();

        return sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`;
    }

    const currentTimeUpdate = () => {
        setCurrentTime(timeFormat(videoControl.current.currentTime));
        setcurrentTimeBar((videoControl.current.currentTime / videoControl.current.duration * 100));
    }

    const setCurrentTimeVideo = (event) => videoControl.current.currentTime = event.target.value / 100 * videoControl.current.duration;

    const changeVideo = (video) => {
        setVideo(video);
        setPalyControl('play_arrow');
    }

    return <>
        <Navbar />
        <div className="h-full bg-gradient-to-r from-purple-800 to-purple-500 py-10">
            <div className="flex flex-wrap justify-center">
                <div className="w-1/2 flex justify-center">
                    <video onClick={playPauseHandle} onLoadStart={() => setcurrentTimeBar(0)} onPlaying={() => setDuration(timeFormat(videoControl.current.duration))} onTimeUpdate={currentTimeUpdate} ref={videoControl} id='video' className="rounded-lg" src={video} onChange={() => { console.log(videoControl.current.currentTime) }} ></video>
                </div>
                <div className="flex justify-center items-center w-full mt-5">
                    <div className="flex items-center bg-gray-100 p-3 rounded-lg w-1/2">
                        <div className="w-3/12 flex justify-around items-center">
                            <i class="material-icons text-purple-800 cursor-pointer" onClick={playPauseHandle}>{playControl}</i>
                            <i class="material-icons text-purple-800 cursor-pointer" onClick={() => videoControl.current.currentTime = 0}>stop</i>
                            <i class="material-icons text-purple-800 cursor-pointer" onClick={mute}>{volumeControl}</i>
                            <input type="range" min="0" max="100" onChange={volume} />
                        </div>
                        <div className="w-8/12 flex justify-around items-center">
                            <span className="text-purple-800 font-bold px-1">{currentTime}</span>
                            <input className="w-full mx-2" type="range" min="0" max="100" value={currentTimeBar} onChange={setCurrentTimeVideo} />
                            <span className="text-purple-800 font-bold px-1">{duration}</span>
                        </div>
                        <div className="w-1/12 flex justify-center items-center">
                            <i class="material-icons text-purple-800 cursor-pointer" onClick={fullScreen}>fullscreen</i>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full mt-5">

                    <div className="flex items-center bg-gray-100 p-3 rounded-lg w-1/2 -mx-2">
                        <div className="w-1/4 px-2">
                            <img src={florImage} alt="" className="rounded-lg cursor-pointer" onClick={() => changeVideo(florVideo)} />
                        </div>
                        <div className="w-1/4 px-2">
                            <img src={arrozImage} alt="" className="rounded-lg cursor-pointer" onClick={() => changeVideo(arrozVideo)} />
                        </div>
                        <div className="w-1/4 px-2">
                            <img src={lighthouseImage} alt="" className="rounded-lg cursor-pointer" onClick={() => changeVideo(lighthouseVideo)} />
                        </div>
                        <div className="w-1/4 px-2">
                            <img src={playaImage} alt="" className="rounded-lg cursor-pointer" onClick={() => changeVideo(playaVideo)} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>;
}