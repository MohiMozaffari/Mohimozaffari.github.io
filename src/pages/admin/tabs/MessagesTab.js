import React, { useEffect, useState } from 'react';
import { getMessagesAdmin, markMessageRead } from '../../../api/contact';

const MessagesTab = () => {
  const [messages, setMessages] = useState([]);

  const load = () => getMessagesAdmin().then(setMessages);
  useEffect(() => { load(); }, []);

  const handleMarkRead = async (id) => {
    await markMessageRead(id);
    load();
  };

  if (messages.length === 0) return <p className="text-purple-300">No messages yet.</p>;

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`p-4 rounded-xl border ${msg.read ? 'bg-purple-900/20 border-purple-700/30' : 'bg-purple-900/40 border-purple-500'}`}
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <div>
              <span className="text-white font-semibold">{msg.name}</span>
              <span className="ml-2 text-purple-400 text-xs">{msg.email}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-purple-400 text-xs">{new Date(msg.createdAt).toLocaleString()}</span>
              {!msg.read && (
                <button onClick={() => handleMarkRead(msg._id)} className="text-purple-400 hover:text-purple-300 text-xs font-semibold">
                  Mark read
                </button>
              )}
            </div>
          </div>
          <p className="text-purple-200 text-sm whitespace-pre-line">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessagesTab;
