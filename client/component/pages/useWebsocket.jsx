import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addData, addsock} from '../store/data.store';

const useWebSocket = (url) => {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = new WebSocket(url);
        socketInstance.onopen = () => {
            console.log("WebSocket connected");
            setSocket(socketInstance);
            dispatch(addsock({ sock: true }));
        };
        socketInstance.onmessage = (message) => {
            dispatch(addData({ UserData: message.data }));
        };
        socketInstance.onclose = () => {
            console.log("WebSocket disconnected");
        };
        return () => {
            socketInstance.close();
        };
    }, [url, dispatch]);

    return socket;
};

export default useWebSocket;
