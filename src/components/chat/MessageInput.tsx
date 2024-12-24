import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useMessages } from '../../hooks/useMessages';
import { useUser } from '../../hooks/useUser';

export function MessageInput({ channel }: { channel: string }) {
  const [message, setMessage] = useState('');
  const { sendMessage } = useMessages(channel);
  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;

    sendMessage({
      author_id: user.id,
      content: message.trim(),
      channel,
    });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button type="submit" disabled={!message.trim()}>
        <Send className="w-4 h-4 mr-2" />
        Send
      </Button>
    </form>
  );
}