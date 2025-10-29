import { User, Notification, StatCard, Task, Event, ChartData } from '../types';
import { 
  BarChart3, Users, Calendar, Briefcase, 
  PieChart, TrendingUp, Clock, CheckCircle2,
  BookOpen, Building2
} from 'lucide-react';

export const professionalUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@company.com',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
  role: 'Professional',
  profileType: 'professional'
};

export const studentUser: User = {
  id: '2',
  name: 'Jane Smith',
  email: 'jane.smith@university.edu',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
  role: 'Student',
  profileType: 'student'
};

export const companyUser: User = {
  id: '3',
  name: 'ABC Company',
  email: 'admin@abccompany.com',
  avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
  role: 'Company Administrator',
  profileType: 'company'
};

// This will be determined by the auth context
export const getCurrentUser = (): User => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : professionalUser;
};

export const getNotifications = (profileType: 'student' | 'professional' | 'company'): Notification[] => {
  if (profileType === 'company') {
    return companyNotifications;
  } else if (profileType === 'professional') {
    return professionalNotifications;
  } else {
    return studentNotifications;
  }
};

export const getStats = (profileType: 'student' | 'professional' | 'company'): StatCard[] => {
  if (profileType === 'company') {
    return companyStats;
  } else if (profileType === 'professional') {
    return professionalStats;
  } else {
    return studentStats;
  }
};

export const getTasks = (profileType: 'student' | 'professional' | 'company'): Task[] => {
  if (profileType === 'company') {
    return companyTasks;
  } else if (profileType === 'professional') {
    return professionalTasks;
  } else {
    return studentTasks;
  }
};

export const getEvents = (profileType: 'student' | 'professional' | 'company'): Event[] => {
  if (profileType === 'company') {
    return companyEvents;
  } else if (profileType === 'professional') {
    return professionalEvents;
  } else {
    return studentEvents;
  }
};

const companyNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Team Member Onboarding',
    message: '3 new team members starting next week - prepare onboarding materials',
    time: '30 minutes ago',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Project Deadline Approaching',
    message: 'Project Alpha due in 5 days',
    time: '2 hours ago',
    read: false,
    type: 'warning'
  },
  {
    id: '3',
    title: 'Quarterly Performance Review',
    message: 'Q1 performance reviews have been completed for all departments',
    time: '1 day ago',
    read: true,
    type: 'success'
  },
  {
    id: '4',
    title: 'Budget Alert',
    message: 'Department A approaching 85% of quarterly budget',
    time: '2 days ago',
    read: false,
    type: 'warning'
  }
];

const professionalNotifications: Notification[] = [
  {
    id: '1',
    title: 'Project Deadline',
    message: 'Project presentation due in 24 hours',
    time: '1 hour ago',
    read: false,
    type: 'warning'
  },
  {
    id: '2',
    title: 'New Task Assigned',
    message: 'You have been assigned to Project Beta',
    time: '3 hours ago',
    read: true,
    type: 'info'
  },
  {
    id: '3',
    title: 'Performance Review',
    message: 'Your quarterly review has been completed',
    time: '1 day ago',
    read: true,
    type: 'success'
  },
  {
    id: '4',
    title: 'System Update',
    message: 'System maintenance scheduled for tonight',
    time: '2 days ago',
    read: false,
    type: 'error'
  }
];

const studentNotifications: Notification[] = [
  {
    id: '1',
    title: 'Assignment Due',
    message: 'Your Course A assignment is due in 24 hours',
    time: '1 hour ago',
    read: false,
    type: 'warning'
  },
  {
    id: '2',
    title: 'New Announcement',
    message: 'Professor posted a new announcement',
    time: '3 hours ago',
    read: true,
    type: 'info'
  },
  {
    id: '3',
    title: 'Grade Posted',
    message: 'Your exam has been graded',
    time: '1 day ago',
    read: true,
    type: 'success'
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'The portal will be down for maintenance on Sunday',
    time: '2 days ago',
    read: false,
    type: 'error'
  }
];

const companyStats: StatCard[] = [
  {
    id: '1',
    title: 'Total Employees',
    value: '250',
    change: 12.3,
    icon: 'Users',
    color: 'blue'
  },
  {
    id: '2',
    title: 'Active Projects',
    value: 12,
    change: 8.1,
    icon: 'Briefcase',
    color: 'green'
  },
  {
    id: '3',
    title: 'Annual Revenue',
    value: '$5.2M',
    change: 23.4,
    icon: 'TrendingUp',
    color: 'purple'
  },
  {
    id: '4',
    title: 'Team Satisfaction',
    value: '94%',
    change: 2.1,
    icon: 'CheckCircle2',
    color: 'orange'
  }
];

const professionalStats: StatCard[] = [
  {
    id: '1',
    title: 'Active Projects',
    value: 5,
    change: 2,
    icon: 'Briefcase',
    color: 'blue'
  },
  {
    id: '2',
    title: 'Tasks Completed',
    value: 18,
    change: 5,
    icon: 'CheckCircle2',
    color: 'green'
  },
  {
    id: '3',
    title: 'Hours Tracked',
    value: 120,
    change: 12.5,
    icon: 'Clock',
    color: 'purple'
  },
  {
    id: '4',
    title: 'Productivity',
    value: '92%',
    change: 3.2,
    icon: 'TrendingUp',
    color: 'orange'
  }
];

const studentStats: StatCard[] = [
  {
    id: '1',
    title: 'Courses',
    value: 5,
    change: 0,
    icon: 'BookOpen',
    color: 'blue'
  },
  {
    id: '2',
    title: 'Assignments',
    value: 8,
    change: 2,
    icon: 'CheckCircle2',
    color: 'green'
  },
  {
    id: '3',
    title: 'Study Hours',
    value: 25,
    change: 5.2,
    icon: 'Clock',
    color: 'purple'
  },
  {
    id: '4',
    title: 'GPA',
    value: 3.8,
    change: 0.2,
    icon: 'TrendingUp',
    color: 'orange'
  }
];

const companyTasks: Task[] = [
  {
    id: '1',
    title: 'Q1 Performance Reviews',
    description: 'Complete performance evaluations for all team leads',
    dueDate: '2025-04-18',
    priority: 'high',
    completed: false,
    category: 'Human Resources'
  },
  {
    id: '2',
    title: 'Quarterly Budget Review',
    description: 'Quarterly budget review and planning for Q2',
    dueDate: '2025-04-15',
    priority: 'high',
    completed: false,
    category: 'Finance'
  },
  {
    id: '3',
    title: 'New Team Member Setup',
    description: 'Prepare onboarding materials for 3 new team members',
    dueDate: '2025-04-12',
    priority: 'medium',
    completed: false,
    category: 'Human Resources'
  },
  {
    id: '4',
    title: 'Contract Review',
    description: 'Review and renew contracts with key partners',
    dueDate: '2025-04-20',
    priority: 'high',
    completed: true,
    category: 'Operations'
  }
];

const professionalTasks: Task[] = [
  {
    id: '1',
    title: 'Project Presentation',
    description: 'Prepare quarterly results presentation',
    dueDate: '2025-04-18',
    priority: 'high',
    completed: false,
    category: 'Presentations'
  },
  {
    id: '2',
    title: 'Project Proposal',
    description: 'Draft proposal for new project initiative',
    dueDate: '2025-04-15',
    priority: 'high',
    completed: false,
    category: 'Documentation'
  },
  {
    id: '3',
    title: 'Team Sync',
    description: 'Weekly team status meeting',
    dueDate: '2025-04-12',
    priority: 'medium',
    completed: false,
    category: 'Meetings'
  },
  {
    id: '4',
    title: 'Technical Review',
    description: 'Review technical documentation and updates',
    dueDate: '2025-04-20',
    priority: 'low',
    completed: true,
    category: 'Technical'
  },
  {
    id: '5',
    title: 'Expense Report',
    description: 'Update quarterly project expenses',
    dueDate: '2025-04-11',
    priority: 'medium',
    completed: true,
    category: 'Finance'
  }
];

const studentTasks: Task[] = [
  {
    id: '1',
    title: 'Research Assignment',
    description: 'Complete the research and analysis section',
    dueDate: '2025-04-18',
    priority: 'high',
    completed: false,
    category: 'Coursework'
  },
  {
    id: '2',
    title: 'Exam Preparation',
    description: 'Review course materials for upcoming exam',
    dueDate: '2025-04-15',
    priority: 'high',
    completed: false,
    category: 'Exam Prep'
  },
  {
    id: '3',
    title: 'Group Meeting',
    description: 'Discuss project progress and next steps',
    dueDate: '2025-04-12',
    priority: 'medium',
    completed: false,
    category: 'Meetings'
  },
  {
    id: '4',
    title: 'Portfolio Update',
    description: 'Update portfolio with recent work',
    dueDate: '2025-04-20',
    priority: 'low',
    completed: true,
    category: 'Personal'
  },
  {
    id: '5',
    title: 'Online Assessment',
    description: 'Complete module assessment',
    dueDate: '2025-04-11',
    priority: 'medium',
    completed: true,
    category: 'Coursework'
  }
];

const companyEvents: Event[] = [
  {
    id: '1',
    title: 'Company Meeting',
    date: '2025-04-12',
    time: '10:00 - 11:30',
    location: 'Conference Room A',
    description: 'Quarterly company update and planning session'
  },
  {
    id: '2',
    title: 'Management Workshop',
    date: '2025-04-13',
    time: '14:00 - 16:00',
    location: 'Training Center',
    description: 'Leadership skills workshop for managers'
  },
  {
    id: '3',
    title: 'Project Launch',
    date: '2025-04-14',
    time: '13:00 - 14:30',
    location: 'Auditorium',
    description: 'Launch presentation for new project'
  },
  {
    id: '4',
    title: 'Industry Conference',
    date: '2025-04-16',
    time: '09:00 - 17:00',
    location: 'Convention Center',
    description: 'Annual industry conference'
  }
];

const professionalEvents: Event[] = [
  {
    id: '1',
    title: 'Project Meeting',
    date: '2025-04-12',
    time: '10:00 - 11:30',
    location: 'Conference Room A',
    description: 'Quarterly progress review meeting'
  },
  {
    id: '2',
    title: 'Team Workshop',
    date: '2025-04-13',
    time: '14:00 - 16:00',
    location: 'Training Room',
    description: 'Team skills training session'
  },
  {
    id: '3',
    title: 'Project Kickoff',
    date: '2025-04-14',
    time: '13:00 - 14:30',
    location: 'Virtual Meeting',
    description: 'New project initialization meeting'
  },
  {
    id: '4',
    title: 'Industry Conference',
    date: '2025-04-16',
    time: '09:00 - 17:00',
    location: 'Convention Center',
    description: 'Annual industry conference'
  }
];

const studentEvents: Event[] = [
  {
    id: '1',
    title: 'Course Lecture',
    date: '2025-04-12',
    time: '10:00 - 11:30',
    location: 'Lecture Hall B',
    description: 'Weekly course lecture'
  },
  {
    id: '2',
    title: 'Study Group',
    date: '2025-04-13',
    time: '14:00 - 16:00',
    location: 'Library, Room 204',
    description: 'Group study session'
  },
  {
    id: '3',
    title: 'Office Hours',
    date: '2025-04-14',
    time: '13:00 - 14:30',
    location: 'Professor\'s Office',
    description: 'Academic support session'
  },
  {
    id: '4',
    title: 'Job Fair',
    date: '2025-04-16',
    time: '09:00 - 15:00',
    location: 'University Center',
    description: 'Annual career fair event'
  }
];

export const performanceData = {
  professional: {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
      {
        label: 'Performance Score',
        data: [85, 88, 92, 90, 94, 96],
        backgroundColor: ['rgba(10, 132, 255, 0.6)'],
        borderColor: ['rgba(10, 132, 255, 1)'],
        borderWidth: 2
      }
    ]
  },
  student: {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
      {
        label: 'Academic Performance',
        data: [85, 88, 92, 90, 94, 96],
        backgroundColor: ['rgba(10, 132, 255, 0.6)'],
        borderColor: ['rgba(10, 132, 255, 1)'],
        borderWidth: 2
      }
    ]
  },
  company: {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
      {
        label: 'Business Performance',
        data: [95, 97, 94, 98, 96, 99],
        backgroundColor: ['rgba(10, 132, 255, 0.6)'],
        borderColor: ['rgba(10, 132, 255, 1)'],
        borderWidth: 2
      }
    ]
  }
};

export const courseWorkload = {
  professional: {
    labels: ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 'Project Echo', 'Project Foxtrot'],
    datasets: [
      {
        label: 'Hours per Project',
        data: [12, 8, 10, 6, 9, 7],
        backgroundColor: [
          'rgba(10, 132, 255, 0.7)',
          'rgba(175, 82, 222, 0.7)',
          'rgba(48, 209, 88, 0.7)',
          'rgba(255, 159, 10, 0.7)',
          'rgba(94, 92, 230, 0.7)',
          'rgba(255, 69, 58, 0.7)'
        ]
      }
    ]
  },
  student: {
    labels: ['Course A', 'Course B', 'Course C', 'Course D', 'Course E', 'Course F'],
    datasets: [
      {
        label: 'Hours per Course',
        data: [8, 6, 7, 4, 5, 3],
        backgroundColor: [
          'rgba(10, 132, 255, 0.7)',
          'rgba(175, 82, 222, 0.7)',
          'rgba(48, 209, 88, 0.7)',
          'rgba(255, 159, 10, 0.7)',
          'rgba(94, 92, 230, 0.7)',
          'rgba(255, 69, 58, 0.7)'
        ]
      }
    ]
  },
  company: {
    labels: ['Department A', 'Department B', 'Department C', 'Department D', 'Department E', 'Department F'],
    datasets: [
      {
        label: 'Department Budget (M)',
        data: [3.2, 1.8, 1.2, 0.85, 1.1, 0.9],
        backgroundColor: [
          'rgba(10, 132, 255, 0.7)',
          'rgba(175, 82, 222, 0.7)',
          'rgba(48, 209, 88, 0.7)',
          'rgba(255, 159, 10, 0.7)',
          'rgba(94, 92, 230, 0.7)',
          'rgba(255, 69, 58, 0.7)'
        ]
      }
    ]
  }
};

export const upcomingDeadlines = {
  professional: {
    labels: ['Deliverables', 'Meetings', 'Reviews', 'Reports'],
    datasets: [
      {
        label: 'Count',
        data: [6, 8, 4, 5],
        backgroundColor: [
          'rgba(10, 132, 255, 0.7)',
          'rgba(175, 82, 222, 0.7)',
          'rgba(255, 69, 58, 0.7)',
          'rgba(48, 209, 88, 0.7)'
        ]
      }
    ]
  },
  student: {
    labels: ['Assignments', 'Projects', 'Exams', 'Assessments'],
    datasets: [
      {
        label: 'Count',
        data: [8, 3, 2, 5],
        backgroundColor: [
          'rgba(10, 132, 255, 0.7)',
          'rgba(175, 82, 222, 0.7)',
          'rgba(255, 69, 58, 0.7)',
          'rgba(48, 209, 88, 0.7)'
        ]
      }
    ]
  },
  company: {
    labels: ['HR Tasks', 'Budget Reviews', 'Meetings', 'Project Deadlines'],
    datasets: [
      {
        label: 'Count',
        data: [4, 2, 6, 8],
        backgroundColor: [
          'rgba(10, 132, 255, 0.7)',
          'rgba(175, 82, 222, 0.7)',
          'rgba(255, 69, 58, 0.7)',
          'rgba(48, 209, 88, 0.7)'
        ]
      }
    ]
  }
};

export const iconMap = {
  BarChart3,
  Users,
  Calendar,
  Briefcase,
  PieChart,
  TrendingUp,
  Clock,
  CheckCircle2,
  BookOpen,
  Building2
};