import React, { useState, useEffect, useRef } from 'react';
import './ImageVedio.css';
function ImageVedio() {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef({});

    useEffect(() => {
        const handleScroll = () => {
            Object.keys(videoRefs.current).forEach((key) => {
                const video = videoRefs.current[key];
                const rect = video.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [videoRefs]);

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = [];
        const newVideos = [];

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.startsWith('image/')) {
                newImages.push(URL.createObjectURL(files[i]));
            } else if (files[i].type.startsWith('video/')) {
                newVideos.push(URL.createObjectURL(files[i]));
            }
        }

        setImages((prevImages) => [...prevImages, ...newImages]);
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleImageChange} />
            {/* <button onClick={() => document.querySelector('input[type="file"]').click()}>Select Images</button> */}
            <h2>Images</h2>
            <ul className='Image'>
                {images.map((image, index) => (
                    <li key={index}>
                        <img src={image} alt="" />
                    </li>
                ))}
            </ul>
            <h2>Videos</h2>
            <ul className='vedio'>
                {videos.map((video, index) => (
                    <li key={index}>
                        <video
                            ref={(ref) => (videoRefs.current[index] = ref)}
                            controls
                            width="300"
                            height="300"
                            className="videoPlayer"
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ImageVedio;