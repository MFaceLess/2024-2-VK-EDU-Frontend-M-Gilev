import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import store from '../../redux/store';

import trashLogo from '/deleteLogo.svg'
import addLogo from '/addLogo.svg'

import './index.css'

export const SendPhotosForm = ({ initialImages = [], setIsModalOpen }) => {
    const [images, setImages] = useState(initialImages);
    const [text, setText] = useState('');

    useEffect(() => {
        const loadImages = () => {
            if (!initialImages) return;
            if (initialImages.length === 0) {
                setImages([]);
                return;
            }

            const imageFiles = initialImages.map((img) => 
                typeof img === 'string' ? {url: img, file: null} : {url: URL.createObjectURL(img), file: img}
            );

            setImages(imageFiles);
        };

        loadImages();
    }, [initialImages]);

    useEffect(() => {
        if (images.length === 0) setIsModalOpen(false);
    }, [images])

    const sendHandler = async () => {
        const formData = new FormData();
        // store.getState().chat.chatId
        formData.append('chat', store.getState().chat.chatId);

        images.forEach((image) => {
            if (image.file) {
                formData.append('files', image.file); 
            }
        });

        formData.append('text', text);

        try {
            const response = await fetch('https://vkedu-fullstack-div2.ru/api/messages/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                body: formData,
            });
            if (!response.ok) throw new Error("Ошибка при отправке фото");
            setIsModalOpen(false);
        } catch (error) {
            alert(`${error.message}`);
        }
    }

    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    const handleAddNewImages = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files).slice(0, 5);
        const newImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    }

    return (
        <>
            {images && (
                <div className="image-gallery">
                    {images.map((img, index) => (
                        <div key={index} className="image-item">
                            <img src={img.url} alt={`uploaded ${index + 1}`} />
                            <button
                                className='delete-image-button'
                                onClick={() => handleDeleteImage(index)}
                            >
                                <img src={trashLogo}/>
                            </button>
                        </div>
                    ))}
                    <div className='add-img-logo'>
                        <label htmlFor='attach-img'>
                            <img src={addLogo}/>
                        </label>
                        <input 
                            id="attach-img" 
                            type="file"
                            multiple 
                            accept="image/*" 
                            style={{ display: 'none'}}
                            onChange={handleAddNewImages} 
                        />
                    </div>
                    <div className='auth-form-group'>
                        <label htmlFor='text'>Comment</label>
                        <input
                        type='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        autoComplete='off'
                        />
                    </div>
                    <button onClick={sendHandler} className='register-button'>Send Photos</button>
                </div>
            )}
        </>
    );
};

SendPhotosForm.propTypes = {
    initialImages: PropTypes.array,
    setIsModalOpen: PropTypes.func,
};