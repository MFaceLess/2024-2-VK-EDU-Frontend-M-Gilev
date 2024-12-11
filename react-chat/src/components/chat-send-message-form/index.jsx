import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRecorder } from '../recorder';

import sendButtonLogo from '/sendButton.svg'
import attachButtonLogo from '/attachButton.svg'
import microLogo from '/micro.svg'

import './index.css'

export const ChatSendMessageForm = ({ id, setImages, setIsModalOpen }) => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const timeoutId = useRef(null);

    // const [isRecording, setIsRecording] = useState(false);
    // const mediaRecorderRef = useRef(null);
    // const audioChunksRef = useRef([]);

    const [audio, setAudio, isRecording, startRecording, stopRecording] = useRecorder();

    const sendMessageHandler = async (audioFile = null) => {
      if (!input.trim() && !audioFile) return;

      let bodyContent;
      let headers = {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      };

      if (audioFile) {
        bodyContent = new FormData();
        bodyContent.append('voice', audioFile, 'voice.ogg');
        bodyContent.append('chat', id);
      } else {
        headers['Content-Type'] = 'application/json';
        bodyContent = JSON.stringify({
          'text': input,
          'chat': id,
        });
      }

      try {
        const response = await fetch('https://vkedu-fullstack-div2.ru/api/messages/', {
          method: 'POST',
          headers,
          body: bodyContent,
        });
        if (!response.ok) throw new Error('Ошибка при посылке сообщения');
        const data = await response.json();
        console.log(data);
        // await updateMes();
        setInput('');
      } catch (error) {
        navigate('/');
      }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessageHandler();
      };

    const handleMouseLeave = () => {
      timeoutId.current = setTimeout(() => setShowMenu(false), 300);
    };

    const handleMouseEnter = () => {
      clearTimeout(timeoutId.current);
      setShowMenu(true);
    };

    const sendLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation не поддерживается вашим браузером.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInput(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
        },
        (error) => {
          alert("Не удалось получить ваше местоположение.");
          console.error(error);
        }
      );
    };

    const handleImageSelect = (e) => {
      e.preventDefault();
      const files = Array.from(e.target.files).slice(0, 5);
      setImages(files);
      setIsModalOpen(true);
    };

    // const handleVoiceStart = () => {
    //   setIsRecording(true);
    //   audioChunksRef.current = [];

    //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    //     mediaRecorderRef.current = new MediaRecorder(stream);
    //     mediaRecorderRef.current.ondataavailable = (event) => {
    //         audioChunksRef.current.push(event.data);
    //     };
    //     mediaRecorderRef.current.start();
    //   }).catch((error) => {
    //       alert("Не удалось получить доступ к микрофону.");
    //       console.error(error);
    //   });
    // }

    // const handleVoiceStop = () => {
    //   setIsRecording(false);
    //   if (!mediaRecorderRef.current) return;
    //   mediaRecorderRef.current.stop();
    //   mediaRecorderRef.current.onstop = async () => {
    //     const audioBlob = new Blob(audioChunksRef.current, { type: "audio/ogg" });
    //     console.log(audioBlob);
    //     await sendMessageHandler(audioBlob);
    //   };
    // }

    const handleVoiceStop = async () => {
      stopRecording();
      if (audio) {
        await sendMessageHandler(audio);
        setAudio(null);
      }
    };

    return (
      <>

        <form className='form' onSubmit={handleSubmit}>
            <input
              className='form-input'
              name='message-text'
              placeholder='Write a message...'
              autoComplete='off'
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {input.length > 0 && (
              <button className='send-button'>
                <img src={sendButtonLogo}/>
              </button>
            )}
            
            <button
              onMouseDown={startRecording}
              onMouseUp={handleVoiceStop}
              onMouseLeave={handleVoiceStop}
              className={`micro ${isRecording ? 'recording' : ''}`}
            >
              <img src={microLogo}/>
            </button>

            <button 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className='attach-button'
            >
              <img src={attachButtonLogo}/>
            </button>

        </form>

        {showMenu &&
          <div
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            className='attach-menu'
          >
            <ul>
                <li onClick={sendLocation} style={{ userSelect: 'none' }}>Location</li>
                <li>
                  <label htmlFor='attach-img'>
                    Send Photo
                  </label>
                  <input 
                    id="attach-img" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    style={{ display: 'none'}} 
                    onChange={handleImageSelect} 
                  />
                </li>
                {/* <li
                  onMouseDown={handleVoiceStart}
                  onMouseUp={handleVoiceStop}
                  className={isRecording ? 'recording' : ''}
                >
                  Voice
                </li> */}
            </ul>
          </div>
        }
      </>
    );
};


ChatSendMessageForm.propTypes = {
  id: PropTypes.string,
  setImages: PropTypes.func,
  setIsModalOpen: PropTypes.func,
};