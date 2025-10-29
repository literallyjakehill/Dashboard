import React, { useState } from 'react';
import { 
  BarChart, Calendar as CalendarIcon, Plus, 
  Search, FileText, X, Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import StatCard from '../components/dashboard/StatCard';
import TaskItem from '../components/dashboard/TaskItem';
import EventCard from '../components/dashboard/EventCard';
import AIAssistant from '../components/dashboard/AIAssistant';
import { getStats, getTasks, getEvents } from '../data/mockData';
import { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const profileType = user?.profileType || 'professional';
  
  const [tasks, setTasks] = useState<Task[]>(getTasks(profileType));
  const [searchQuery, setSearchQuery] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  const stats = getStats(profileType);
  const events = getEvents(profileType);
  
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleComplete = (id: string, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed } : task
    ));
  };
  
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      completed: false,
      category: profileType === 'student' ? 'Coursework' : 'Tasks'
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            icon={<BarChart size={16} />}
          >
            Analytics
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            icon={<CalendarIcon size={16} />}
          >
            Calendar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Tasks</CardTitle>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search size={16} />}
                  className="w-[200px]"
                />
                <Button 
                  variant="primary" 
                  size="sm"
                  icon={<Plus size={16} />}
                  onClick={() => setIsAddingTask(true)}
                >
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isAddingTask && (
                <div className="flex items-center space-x-2 mb-4 p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <Input
                    placeholder="Task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    fullWidth
                    autoFocus
                  />
                  <Button 
                    variant="primary" 
                    size="sm"
                    icon={<Check size={16} />}
                    onClick={handleAddTask}
                  >
                    Add
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    icon={<X size={16} />}
                    onClick={() => {
                      setIsAddingTask(false);
                      setNewTaskTitle('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
              
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery 
                      ? "Try a different search term or clear the search" 
                      : "Get started by creating a new task"}
                  </p>
                  {searchQuery && (
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSearchQuery('')}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 max-h-[560px] overflow-y-auto pr-2">
                  {filteredTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center p-6">
                  <BarChart className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Performance Chart</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Charts would be displayed here using a charting library
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <AIAssistant />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 3).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    fullWidth
                    icon={<CalendarIcon size={16} />}
                  >
                    View Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" fullWidth>
                  {profileType === 'student' ? 'Library' : 'Projects'}
                </Button>
                <Button variant="outline" fullWidth>Resources</Button>
                <Button variant="outline" fullWidth>Help Center</Button>
                <Button variant="outline" fullWidth>Forums</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;