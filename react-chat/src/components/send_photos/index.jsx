import React, { useEffect, useState } from 'react';

import './index.css'

export const SendPhotosForm = ({ initialImages = [], chatId, setIsModalOpen }) => {
    const [images, setImages] = useState(initialImages);
    const [text, setText] = useState('');

    useEffect(() => {
        const loadImages = () => {
            if (!initialImages) return;
            if (initialImages.length === 0) {
                setImages([]);
                return;
            }

            const imageUrls = initialImages.map((img) => 
                typeof img === 'string' ? img : URL.createObjectURL(img)
            );

            setImages(imageUrls);
            return () => {
                imageUrls.forEach(url => URL.revokeObjectURL(url));
            };
        };

        loadImages();
    }, [initialImages]);

    const sendHandler = async () => {
        const formData = new FormData();
        formData.append('chat', chatId);

        initialImages.forEach((file) => {
            formData.append('files', file);
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
            const data = await response.json();
            setIsModalOpen(false);
        } catch (error) {
            alert(`${error.message}`);
        }
    }

    return (
        <>
            {images && (
                <div className="image-gallery">
                    {images.map((img, index) => (
                        <div key={index} className="image-item">
                            <img src={img} alt={`uploaded ${index + 1}`} />
                        </div>
                    ))}
                    <div className='auth-form-group'>
                        <label htmlFor='text'>Text</label>
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