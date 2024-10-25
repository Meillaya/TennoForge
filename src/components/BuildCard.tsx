import React from 'react';
import { ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';

interface BuildCardProps {
  title: string;
  author: string;
  votes: number;
  comments: number;
  image: string;
  tags?: string[];
}

export default function BuildCard({ title, author, votes, comments, image, tags = [] }: BuildCardProps) {
  return (
    <div className="card group cursor-pointer">
      <div className="relative aspect-video mb-4 overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-wf-dark-700 text-wf-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-wf-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400 mb-4">by {author}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-wf-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span>{votes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-wf-primary transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span>{comments}</span>
          </button>
        </div>
        <button className="hover:text-wf-primary transition-colors">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}