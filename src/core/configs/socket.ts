import { io } from 'socket.io-client';

export const socket = io(`${import.meta.env.VITE_API_URL}`, {
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

// Debug logs to diagnose connection issues (will appear in browser console)
if (typeof window !== 'undefined') {
    // expose for manual testing: in browser console you can access `window.__socket`
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

    // Log any incoming event name + args to help identify which events server emits
    socket.onAny((event: string, ...args: any[]) => {
        console.debug('[socket] onAny event=', event, 'args=', args);
    });
}
