import { Centrifuge } from 'centrifuge'
import { addMessages, removeMessages } from '../../redux/slices/chatSlice'

let centrifugeInstance = null
let subscription

export const setupCentrifugo = (uuid, saveFetch, navigate) => (dispatch) => {
  const accessToken = localStorage.getItem('access')
  if (!accessToken) {
    navigate('/auth')
    return
  }

  if (centrifugeInstance && subscription) {
    return
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json'
  }

  const handleCentrifugePush = (ctx) => {
    const { event, message } = ctx.data

    if (event === 'create') {
      const newMessage = {
        sender: `${message.sender.first_name} ${message.sender.last_name}`,
        time: new Date(message.created_at).toLocaleString(),
        text: message.text,
        id: message.id,
        senderId: message.sender.id,
        files: message.files ? message.files.map((file) => file.item) : [],
        voice: message.voice || null
      }
      dispatch(addMessages(newMessage))
    } else if (event === 'delete') {
      dispatch(removeMessages(message.id))
    }
  }

  // if (!centrifugeInstance) {
  //   centrifugeInstance = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
  //     getToken: (ctx) =>
  //         new  Promise((resolve, reject)  =>
  //         saveFetch('https://vkedu-fullstack-div2.ru/api/centrifugo/connect/', {
  //         body: JSON.stringify(ctx),
  //         method: 'POST',
  //         headers: headers,
  //       })
  //       // .then((res) => res.json())
  //       .then((data) => resolve(data.token))
  //       .catch((err) => reject(err))
  //     )
  //   });

  //   centrifugeInstance.connect();
  // }

  if (!centrifugeInstance || centrifugeInstance.status === Centrifuge.CLOSED || centrifugeInstance.status === Centrifuge.CLOSING) {
    centrifugeInstance = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
      getToken: (ctx) => {
        return new Promise((resolve, reject) => {
          saveFetch('https://vkedu-fullstack-div2.ru/api/centrifugo/connect/', {
            body: JSON.stringify(ctx),
            method: 'POST',
            headers
          })
            .then((data) => resolve(data.token))
            .catch((err) => reject(err))
        })
      }
    })

    centrifugeInstance.connect()
  }

  if (!subscription) {
    subscription = centrifugeInstance.newSubscription(uuid, {
      getToken: (ctx) =>
        new Promise((resolve, reject) =>
          saveFetch('https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/', {
            body: JSON.stringify(ctx),
            method: 'POST',
            headers
          })
          // .then((res) => res.json())
            .then((data) => resolve(data.token))
            .catch((err) => reject(err))
        )
    })

    subscription.on('publication', handleCentrifugePush)
    subscription.subscribe()
  }

  // const unconnect = () => {
  //   centrifuge.disconnect();
  //   subscription.removeAllListeners();
  //   subscription.unsubscribe();
  // }
}

export const unconnect = async () => {
  if (centrifugeInstance) await centrifugeInstance.disconnect()
  if (subscription) {
    await subscription.removeAllListeners()
    await subscription.unsubscribe()
  }
  centrifugeInstance = null
  subscription = null
}
