import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

interface VoteButtonProps {
  buildId: string;
  initialVotes: number;
  hasVoted?: boolean;
}

export default function VoteButton({ buildId, initialVotes, hasVoted = false }: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(hasVoted);
  const { user } = useAuthStore();

  const handleVote = async () => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      // API call will be implemented here
      setVoted(!voted);
      setVotes(voted ? votes - 1 : votes + 1);
    } catch (error) {
      toast.error('Failed to register vote');
    }
  };

  return (
    <button
      onClick={handleVote}
      className={`flex items-center gap-1 transition-colors ${
        voted ? 'text-wf-primary' : 'text-gray-400 hover:text-wf-primary'
      }`}
    >
      <ThumbsUp className={`h-4 w-4 ${voted ? 'fill-current' : ''}`} />
      <span>{votes}</span>
    </button>
  );
}