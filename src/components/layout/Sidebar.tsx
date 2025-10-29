import React from 'react';
import { 
  Home, BarChart3, Calendar, BookOpen, CheckCircle2, 
  Settings, User, LogOut, SunMoon, Briefcase, GraduationCap, X, Search, Building2,
  Linkedin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-700 font-medium' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ 
  isMobile, 
  isOpen, 
  setIsOpen,
  isDarkMode,
  toggleDarkMode
}) => {
  const [activeItem, setActiveItem] = React.useState('Dashboard');
  const [showSignOutDialog, setShowSignOutDialog] = React.useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (label: string, path?: string) => {
    setActiveItem(label);
    if (path) {
      navigate(path);
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleJobSeekingClick = () => {
    // Navigate to profile with job status tab active
    navigate('/profile?tab=jobstatus');
    setActiveItem('Job Seeking');
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLinkedInClick = () => {
    // Handle LinkedIn click
  };

  const handleLogout = () => {
    setShowSignOutDialog(true);
  };

  const confirmLogout = () => {
    setShowSignOutDialog(false);
    logout();
  };

  const getProfileIcon = () => {
    switch (user?.profileType) {
      case 'student':
        return <GraduationCap size={18} />;
      case 'company':
        return <Building2 size={18} />;
      default:
        return <Briefcase size={18} />;
    }
  };

  const getMainNavItems = () => {
    const baseItems = [
      { icon: <Home size={18} />, label: 'Dashboard', path: '/' },
      { icon: <CheckCircle2 size={18} />, label: 'Tasks' },
      { icon: <Calendar size={18} />, label: 'Calendar' },
      { icon: <BarChart3 size={18} />, label: 'Analytics' }
    ];

    // Add profile-specific navigation items
    if (user?.profileType === 'student') {
      baseItems.splice(3, 0, { icon: <BookOpen size={18} />, label: 'Courses' });
    } else if (user?.profileType === 'company') {
      baseItems.splice(3, 0, { icon: <Building2 size={18} />, label: 'Integrations' });
    } else {
      baseItems.splice(3, 0, { icon: <Briefcase size={18} />, label: 'Projects' });
      // Job Seeking - Only show for professionals
      baseItems.push({ icon: <Search size={18} />, label: 'Job Seeking', onClick: handleJobSeekingClick });
    }

    return baseItems;
  };

  // Only show the sidebar if it's not mobile or if it's mobile and open
  if (isMobile && !isOpen) return null;

  return (
    <>
      <div 
        className={`
          fixed inset-0 z-40 flex flex-col bg-white border-r border-gray-200
          ${isMobile ? 'animate-in slide-in-from-left duration-300' : 'w-64'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white">
              {getProfileIcon()}
            </div>
            <h1 className="ml-2 text-xl font-semibold text-gray-900">WorkNET</h1>
          </div>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            {getMainNavItems().map((item) => (
              <NavItem 
                key={item.label}
                icon={item.icon} 
                label={item.label} 
                isActive={activeItem === item.label} 
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    handleNavClick(item.label, item.path);
                  }
                }}
              />
            ))}
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              Settings
            </div>
            <nav className="space-y-1">
              <NavItem 
                icon={<User size={18} />} 
                label="Profile" 
                isActive={activeItem === 'Profile'} 
                onClick={() => handleNavClick('Profile', '/profile')}
              />
              <NavItem 
                icon={<Settings size={18} />} 
                label="Settings" 
                isActive={activeItem === 'Settings'} 
                onClick={() => handleNavClick('Settings')}
              />
              <NavItem 
                icon={<SunMoon size={18} />} 
                label={isDarkMode ? "Light Mode" : "Dark Mode"}
                onClick={toggleDarkMode}
              />
              {user?.profileType === 'professional' && (
                <NavItem 
                  icon={<Linkedin size={18} />} 
                  label="LinkedIn" 
                  onClick={handleLinkedInClick}
                />
              )}
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            fullWidth
            icon={<LogOut size={16} />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </div>

      {showSignOutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Out</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowSignOutDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={confirmLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;