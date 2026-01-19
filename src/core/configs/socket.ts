import { io } from 'socket.io-client';

export const socket = io(`${import.meta.env.VITE_API_URL}`, {
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

if (typeof window !== 'undefined') {
    (window as any).__socket = socket;
    socket.on('connect', () => {
        console.debug('[socket] connected', { id: socket.id, url: import.meta.env.VITE_API_URL, connected: socket.connected });
    });
    socket.on('connect_error', (err: any) => {
        console.error('[socket] connect_error', err);
    });
    socket.on('disconnect', (reason: any) => {
        console.warn('[socket] disconnected', reason);
    });
    socket.on('reconnect_attempt', (attempt: number) => {
        console.debug('[socket] reconnect_attempt', attempt);
    });
    socket.onAny((event: string, ...args: any[]) => {
        console.debug('[socket] onAny event=', event, 'args=', args);
    });
}
