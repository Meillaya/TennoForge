import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import LoginForm from './components/auth/LoginForm';
import BuildForm from './components/builds/BuildForm';
import BuildDetail from './components/builds/BuildDetail';
import BuildsPage from './components/builds/BuildsPage';
import BuildEditor from './components/builds/editor/BuildEditor';
import UserProfile from './components/profile/UserProfile';
import WarframePage from './components/warframes/WarframePage';
import WeaponsPage from './components/weapons/WeaponsPage';
import WarframeDetail from './components/warframes/WarframeDetail';
import WeaponDetail from './components/weapons/WeaponDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/ui/ErrorBoundary';
import PageTransition from './components/ui/PageTransition';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-gradient-radial from-wf-dark-900 via-wf-dark to-wf-dark-900">
            <div className="fixed inset-0 bg-gradient-conic from-wf-primary/10 via-transparent to-transparent opacity-30 pointer-events-none" />
            
            <Navbar />
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#222222',
                  color: '#fff',
                  border: '1px solid #333333',
                },
              }} 
            />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px]">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/builds" element={<BuildsPage />} />
                  <Route path="/builds/new" element={
                    <ProtectedRoute>
                      <BuildEditor />
                    </ProtectedRoute>
                  } />
                  <Route path="/builds/:id" element={<BuildDetail />} />
                  <Route path="/warframes" element={<WarframePage />} />
                  <Route path="/warframes/:id" element={<WarframeDetail />} />
                  <Route path="/weapons" element={<WeaponsPage />} />
                  <Route path="/weapons/:id" element={<WeaponDetail />} />
                  <Route path="/profile/:username" element={<UserProfile />} />
                </Routes>
              </PageTransition>
            </main>
          </div>
        </ErrorBoundary>
      </Router>
    </DndProvider>
  );
}

export default App;