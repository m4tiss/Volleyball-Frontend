export function createWebSocket(url,matchId, onMessage) {
    const socket = new WebSocket(url);
  
    socket.onopen = () => {
      console.log('WebSocket connection opened');
      socket.send(JSON.stringify({ match_id: matchId }))
    };
  
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    return socket;
  }
  