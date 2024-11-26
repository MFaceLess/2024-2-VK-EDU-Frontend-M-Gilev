import { Centrifuge } from 'centrifuge';
import { addMessages, removeMessages, setMessages } from '../../redux/slices/chatSlice';


let centrifugeInstance = null;

export const setupCentrifugo = (uuid) => (dispatch) => {

  if (centrifugeInstance) {
    return () => {};
  }

  centrifugeInstance = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
    getToken: (ctx) =>
      fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/connect/', {
        body: JSON.stringify(ctx),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => data.token),
  });

  const subscription = centrifugeInstance.newSubscription(uuid, {
    getToken: (ctx) =>
      fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/', {
        body: JSON.stringify(ctx),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => data.token),
  });

  const handleCentrifugePush = (ctx) => {
    const { event, message } = ctx.data;

    if (event === 'create') {
      const newMessage = {
        sender: `${message.sender.first_name} ${message.sender.last_name}`,
        time: new Date(message.created_at).toLocaleString(),
        text: message.text,
        id: message.id,
        senderId: message.sender.id,
        files: message.files ? message.files.map((file) => file.item) : [],
        voice: message.voice || null,
      };
      dispatch(addMessages(newMessage));
    } else if (event === 'delete') {
      dispatch(removeMessages(message.id));
    }
  };

  subscription.on('publication', handleCentrifugePush);
  subscription.subscribe();
  centrifugeInstance.connect();
  
  return () => {
    centrifuge.disconnect();
    centrifugeInstance = null;
  }
}
