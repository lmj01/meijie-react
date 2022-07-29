import { Client} from '@stomp/stompjs';

export const mjClient = new Client({
    brokerURL: '/payroll',
    connectHeaders: {
        login: 'user',
        passcode: 'password',
    },
    debug: function (str) {
        console.log('debug', str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

mjClient.onConnect = function(frame) {
    console.log(frame);
};

mjClient.onStompError = function(frame) {
    console.log(frame);
}

export function mjSendMessage(path:string, data:any, options:any={}) {
    const request:any = {
        destination: path,
        headers: {
            priority: '9',
        },
    };
    if (options.isBinary) {
        request.headers['content-type'] = 'application/octet-stream';
        request.binaryBody = data;
    } else if (typeof data === 'string') {
        request.skipContentLengthHeader = true;
        request.body = data;
    }
    mjClient.publish(request);
}

export function mjSubscrible(path:string) {
    return mjClient.subscribe(path, function(frame) {
        console.log('subscription', frame);
    })
}