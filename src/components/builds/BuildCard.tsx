import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import VoteButton from './VoteButton';

interface BuildCardProps {
  id: string;
  title: string;
  author: string;
  votes: number;
  comments: number;
  image: string;
  tags: string[];
}

function BuildCard({ id, title, author, votes, comments, image, tags }: BuildCardProps) {
  return (
    <Link to={`/builds/${id}`} className="block">
      <div className="card hover:border-wf-primary transition-colors">
        <div className="relative aspect-video mb-4">
          <img
            src={image}
            alt={title}
            className="rounded-lg object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          <div className="absolute bottom-2 left-2 flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-black/40 rounded text-xs font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">by {author}</p>

        <div className="flex items-center justify-between text-sm">
          <VoteButton buildId={id} initialVotes={votes} />
          <div className="flex items-center gap-1 text-gray-400">
            <MessageSquare className="h-4 w-4" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BuildCard;