import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Comment } from '../../types/build';
import { Send } from 'lucide-react';

interface CommentSectionProps {
  buildId: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    content: "Great build! I have been using this for Steel Path and it works perfectly.",
    author: {
      id: '2',
      username: 'VoidHunter',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80'
    },
    createdAt: '2024-02-28T12:00:00Z',
    updatedAt: '2024-02-28T12:00:00Z'
  }
];

export default function CommentSection({ buildId }: CommentSectionProps) {
  const [comments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement comment submission
    setNewComment('');
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Comments</h2>
      
      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="input flex-1"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="btn-primary"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img
              src={comment.author.avatar}
              alt={comment.author.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{comment.author.username}</span>
                <span className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}