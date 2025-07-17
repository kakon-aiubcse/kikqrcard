import { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Submitted Messages</h1>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg._id} className="border p-3 rounded shadow">
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
