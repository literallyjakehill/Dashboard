import React, { useState } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { getCurrentUser, getNotifications } from '../../data/mockData';
import { getNotificationColor } from '../../utils/formatters';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const currentUser = getCurrentUser();
  const notifications = getNotifications(currentUser.profileType);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 px-4 border-b border-gray-200 bg-white flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden mr-2"
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </Button>
        
        <div className="relative hidden md:flex items-center max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 h-9 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                {unreadCount}
              </span>
            )}
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in-0 zoom-in-95 duration-100">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-500">
                    Mark all as read
                  </button>
                </div>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center">
                    <p className="text-sm text-gray-500">No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 transition-colors ${getNotificationColor(notification.type)} ${
                          notification.read ? 'opacity-75' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button className="text-sm text-center w-full text-blue-600 hover:text-blue-500">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.name}
            name={currentUser.name}
            size="sm"
            status="online"
          />
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;