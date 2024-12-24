import React from 'react';

interface PostContentProps {
  content: string;
  image?: string;
}

export function PostContent({ content, image }: PostContentProps) {
  return (
    <>
      <p className="text-sm text-paper/80 mb-2 whitespace-pre-wrap">{content}</p>
      {image && (
        <img
          src={image}
          alt="Post content"
          className="w-full h-32 object-cover rounded-lg mb-2"
        />
      )}
    </>
  );
}