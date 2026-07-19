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

  if (messages.length === 0) return <p className="text-content-faint">No messages yet.</p>;

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`rounded-xl border p-5 ${
            msg.read ? 'border-line bg-surface-raised/50' : 'border-iris-500/40 bg-surface-raised'
          }`}
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-content">{msg.name}</span>
              <span className="ml-2 font-mono text-caption text-content-faint">{msg.email}</span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-caption text-content-faint">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
              {!msg.read && (
                <button
                  onClick={() => handleMarkRead(msg._id)}
                  className="font-mono text-caption font-semibold text-iris-400 transition-colors hover:text-iris-300"
                >
                  Mark read
                </button>
              )}
            </div>
          </div>
          <p className="whitespace-pre-line text-sm text-content-muted">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessagesTab;
