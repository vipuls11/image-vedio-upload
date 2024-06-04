import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './ImageVideo.css';
function ImageVideo() {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef({});

    const image = "https://img.freepik.com/free-vector/online-image-upload-landing-page_23-2148282428.jpg";
    const noimage = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    const novideo = "https://synthvibrations.com/wp-content/plugins/lightview-plus/img/novideo.png";
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
            <div className="image_video_upload">
                <h2>Upload Image Or Vedio</h2>
                <img src={image} alt="" style={{ width: '250px' }} />
                <div className="image_video_upload_input">
                    <FontAwesomeIcon icon={faUpload} />
                    <input type="file" accept="image/*,video/*" multiple className='Upload_input' onChange={handleImageChange} />
                </div>
            </div>
            <h2>Images</h2>
            <div>
                {images.length === 0 ? (
                    <div className='NoImage'>
                        <img src={noimage} alt="" style={{ width: '50%', margin: 'auto', background: 'white' }} />
                    </div>) :
                    (<div className='Image'>
                        {images.map((image, index) => (
                            <div key={index} className='images_items'>
                                <img className="img_upload" src={image} alt="" />
                            </div>
                        ))}
                    </div>
                    )}
            </div>
            <h2>Videos</h2>
            <div>
                {videos.length === 0 ? (
                    <div className='NoImage' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={novideo} alt='There is no vedio' style={{ width: '50%', margin: 'auto', }} />
                    </div>) :
                    (<ul className='video'>
                        {videos.map((video, index) => (
                            <li key={index}>
                                <video
                                    ref={(ref) => (videoRefs.current[index] = ref)}
                                    controls
                                    width="300"
                                    height="300"
                                    className="videoPlayer"
                                    muted
                                >
                                    <source src={video} type="video/mp4" />
                                </video>
                            </li>
                        ))}
                    </ul>)
                }
            </div>
        </div>
    );
}

export default ImageVideo;