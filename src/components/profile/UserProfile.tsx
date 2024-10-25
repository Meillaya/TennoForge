import React from 'react';
import { useParams } from 'react-router-dom';
import { User, Settings, Star, BookMarked } from 'lucide-react';
import BuildCard from '../builds/BuildCard';
import PageTransition from '../ui/PageTransition';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useAuthStore } from '../../stores/authStore';

// ... (MOCK_BUILDS array remains the same)

export default function UserProfile() {
  const { username } = useParams();
  const { user } = useAuthStore();
  const isOwnProfile = user?.username === username;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Profile', href: '/profile' },
            { label: username || '' }
          ]}
        />

        {/* Rest of the UserProfile component remains the same */}
      </div>
    </PageTransition>
  );
}