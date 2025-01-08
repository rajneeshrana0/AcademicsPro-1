import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";


function Chat() {
  const [messages, setMessages] = useState([]); 
  const [inputValue, setInputValue] = useState(""); 
  const [roomId, setRoomId] = useState(""); 
  const [generatedRoomId, setGeneratedRoomId] = useState(""); 
  const [joined, setJoined] = useState(false); 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:3000");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (e) => {
      // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, e.data]);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
// @ts-ignore
    wsRef.current = ws;

    return () => {
      ws.close(); 
    };
  }, []);

  const handleGenerateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10); 
    setGeneratedRoomId(newRoomId);
    setRoomId(newRoomId);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== "") {
      // @ts-ignore
      wsRef.current.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId,
          },
        })
      );
      setJoined(true);
    }
  };

  const handleSendMessage = () => {
    // @ts-ignore
    if (inputValue.trim() !== "" && wsRef.current.readyState === WebSocket.OPEN) {
  // @ts-ignore
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: inputValue,
          },
        })
      ); // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, `You: ${inputValue}`]); 
      setInputValue(""); 
      console.error("WebSocket is not open or message is empty.");
    }
  };
  
// @ts-ignore
  const handleEmojiClick = (emojiObject) => {
    setInputValue((prevValue) => prevValue + emojiObject.emoji);
  };

  return (
    <div className="p-6  h-screen flex flex-col justify-center items-center">
      {!joined ? (
        <div className="bg-background/50 shadow-lg p-6 rounded-lg w-96">
          <h1 className="text-2xl font-bold mb-4 text-center text-purple-600">
            {generatedRoomId
              ? "Share Room ID with Your Friend"
              : "Create or Join a Room"}
          </h1>

          {!generatedRoomId ? (
            <>
              <Button
                onClick={handleGenerateRoom}
                className="w-full mb-4 p-4 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Generate Room ID
              </Button>
              <div className="text-center text-gray-500 mb-4">OR</div>
              <Input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="p-4 rounded-md border-2 border-purple-200 flex-grow mb-4"
              />
              <Button
                onClick={handleJoinRoom}
                className="w-full p-4 rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                Join Room
              </Button>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold text-center text-gray-800 mb-4">
                Room ID:{" "}
                <span className="text-purple-600 font-bold">
                  {generatedRoomId}
                </span>
              </div>
              <Button
                onClick={() => navigator.clipboard.writeText(generatedRoomId)}
                className="w-full mb-4 p-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Copy Room ID
              </Button>
              <div className="text-center text-gray-500 mb-4">OR</div>
              <Input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="p-4 rounded-md border-2 border-purple-200 flex-grow mb-4"
              />
              <Button
                onClick={handleJoinRoom}
                className="w-full p-4 rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                Join Room
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white- shadow-lg rounded-lg w-full max-w-2xl h-[90vh] flex flex-col">
          <div className="bg-purple-600 text-white p-4 rounded-t-lg text-center text-lg font-bold">
            Chat Room: {roomId}
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`m-2 ${
                  index % 2 === 0
                    ? "text-left text-purple-700"
                    : "text-right text-pink-700"
                }`}
              >
                <span className="inline-block bg-white p-2 rounded-xl shadow">
                  {message}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-4">
            <div className="relative">
              <Button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700"
              >
                😊
              </Button>
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <Input
              type="text"
              placeholder="Type your message here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="p-4 rounded-md border-2 border-purple-200 flex-grow text-black font-bold"
            />
            <Button
              onClick={handleSendMessage}
              className="p-4 rounded-md bg-pink-600 text-white hover:bg-pink-700"
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
