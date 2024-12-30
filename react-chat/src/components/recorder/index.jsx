import { useState, useRef } from 'react'

export const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audio, setAudio] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const startRecording = () => {
    setIsRecording(true)
    audioChunksRef.current = []

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data)
        }
        mediaRecorderRef.current.start()
      })
      .catch((error) => {
        alert('Не удалось получить доступ к микрофону.')
        console.error(error)
      })
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (!mediaRecorderRef.current) return

    mediaRecorderRef.current.stop()
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg' })
      setAudio(audioBlob)
    }
  }

  return [audio, setAudio, isRecording, startRecording, stopRecording]
}
