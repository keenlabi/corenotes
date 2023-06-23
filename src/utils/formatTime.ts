export default function formatTime(dateTime:string) {
    const date = new Date(dateTime);
    
    const time = date.toLocaleTimeString('en-us', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return time;
}