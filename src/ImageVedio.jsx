import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './ImageVedio.css';
function ImageVedio() {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef({});
    const image = "https://static.vecteezy.com/system/resources/previews/004/640/699/non_2x/circle-upload-icon-button-isolated-on-white-background-vector.jpg";
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
            <div className="image_vedio_upload_input">
                <FontAwesomeIcon icon={faUpload} />
                <input type="file" multiple className='Upload_input' onChange={handleImageChange} />
            </div>

            {/* <button onClick={() => document.querySelector('input[type="file"]').click()}>Select Images</button> */}
            <h2>Images</h2>
            <div>
                {images.length === 0 ? (
                    <div className='Image'>
                        <h2>Please upload image </h2>
                    </div>) :
                    (<ul className='Image'>
                        {images.map((image, index) => (
                            <li key={index}>
                                <img className="img_upload" src={image} alt="" />
                            </li>
                        ))}
                    </ul>
                    )}
            </div>
            <h2>Videos</h2>
            <div>
                {videos.length === 0 ? (
                    <div className='Image' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src='https://i.ytimg.com/vi/5y2GTQ9jLbw/maxresdefault.jpg' alt='There is no vedio' style={{ width: '50%', margin: 'auto', }} />
                    </div>) :
                    (<ul className='vedio'>
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
                    </ul>)
                }
            </div>
        </div>
    );
}

export default ImageVedio;