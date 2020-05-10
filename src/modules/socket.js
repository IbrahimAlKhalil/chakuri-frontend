import io from 'socket.io-client';
import {retrieveToken} from '@/modules/tokenizer';
import config from '@/config';

const url = new URL(config.baseURL);

url.protocol = process.env.NODE_ENV === 'development' ? 'ws:' : 'wss:';

let socket = null;

export default function () {
    if (socket && socket.connected) {
        return socket;
    }

    socket = io.connect(url.href, {
        path: process.env.NODE_ENV === 'development' ? '/socket.io' : '/socketio',
        query: {
            'token': retrieveToken()
        },
        transports: ['websocket']
    });

    return socket;
};
