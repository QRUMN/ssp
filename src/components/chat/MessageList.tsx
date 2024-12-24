import React from 'react';
import { format } from 'date-fns';
import { useMessages } from '../../hooks/useMessages';
import { Avatar } from '../ui/Avatar';
import { Spinner } from '../ui/Spinner';
import { useUser } from '../../hooks/useUser';

export function MessageList({ channel }: { channel: string }) {
  const { messages, isLoading } = useMessages(channel);
  const { user } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {messages?.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.author_id === user?.id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.author_id === user?.id
                ? 'bg-sky-500 text-white'
                : 'bg-gray-700 text-gray-100'
            }`}
          >
            <div className="text-sm opacity-75 mb-1">
              {format(new Date(message.created_at), 'p')}
            </div>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}