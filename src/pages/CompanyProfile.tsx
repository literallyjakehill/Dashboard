import React, { useState } from 'react';
import { Building2, Users, Globe, Mail, Phone, MapPin, Calendar, CreditCard as Edit3, Save, X, Camera, Plus, Trash2, Settings, UserPlus, Briefcase, DollarSign, TrendingUp, Activity, Clock, Award, Target, BarChart3, FileText, CheckCircle, AlertCircle, User, Search, Filter, Eye, MessageSquare, Star, MapPin as MapPinIcon, GraduationCap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  salary: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar: string;
  manager: string;
  skills: string[];
  performance: number;
}

interface Department {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
  budget: string;
  description: string;
  goals: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  budget: string;
  teamMembers: string[];
  progress: number;
  priority: 'low' | 'medium' | 'high';
}

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  status: 'active' | 'paused' | 'closed';
  applicants: number;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  currentPosition: string;
  experience: string;
  education: string;
  skills: string[];
  resume: string;
  coverLetter: string;
  appliedDate: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  rating: number;
  notes: string;
  jobId: string;
  salary: string;
  availability: string;
  portfolio?: string;
  linkedin?: string;
}

interface CompanyInfo {
  basicInfo: {
    name: string;
    industry: string;
    size: string;
    founded: string;
    website: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    logo: string;
    mission: string;
    values: string[];
  };
  businessMetrics: {
    totalEmployees: number;
    totalRevenue: string;
    growthRate: string;
    customerSatisfaction: string;
    employeeRetention: string;
  };
  employees: Employee[];
  departments: Department[];
  projects: Project[];
  jobPostings: JobPosting[];
  candidates: Candidate[];
}

const CompanyProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [candidateFilter, setCandidateFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    basicInfo: {
      name: 'TechCorp Solutions',
      industry: 'Software Development',
      size: '500-1000 employees',
      founded: '2015',
      website: 'https://techcorp.com',
      email: 'contact@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Innovation Drive, Tech City, TC 12345',
      description: 'Leading provider of enterprise software solutions and digital transformation services for modern businesses.',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      mission: 'To empower businesses through innovative technology solutions that drive growth and efficiency.',
      values: ['Innovation', 'Integrity', 'Collaboration', 'Excellence', 'Customer Focus']
    },
    businessMetrics: {
      totalEmployees: 847,
      totalRevenue: '$12.5M',
      growthRate: '23%',
      customerSatisfaction: '94%',
      employeeRetention: '89%'
    },
    employees: [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        position: 'Senior Software Engineer',
        department: 'Engineering',
        hireDate: '2022-03-15',
        salary: '$95,000',
        status: 'active',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
        manager: 'Mike Chen',
        skills: ['React', 'Node.js', 'Python', 'AWS'],
        performance: 92
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@techcorp.com',
        position: 'Engineering Manager',
        department: 'Engineering',
        hireDate: '2020-01-10',
        salary: '$125,000',
        status: 'active',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
        manager: 'David Wilson',
        skills: ['Leadership', 'Architecture', 'Agile', 'Mentoring'],
        performance: 95
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@techcorp.com',
        position: 'UX Designer',
        department: 'Design',
        hireDate: '2021-08-22',
        salary: '$78,000',
        status: 'active',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600',
        manager: 'Lisa Park',
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
        performance: 88
      },
      {
        id: '4',
        name: 'James Wilson',
        email: 'james.wilson@techcorp.com',
        position: 'Sales Director',
        department: 'Sales',
        hireDate: '2019-05-03',
        salary: '$110,000',
        status: 'active',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
        manager: 'CEO',
        skills: ['Sales Strategy', 'Client Relations', 'Negotiation', 'CRM'],
        performance: 91
      },
      {
        id: '5',
        name: 'Anna Thompson',
        email: 'anna.thompson@techcorp.com',
        position: 'HR Specialist',
        department: 'Human Resources',
        hireDate: '2023-02-14',
        salary: '$65,000',
        status: 'on-leave',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
        manager: 'Jennifer Lee',
        skills: ['Recruitment', 'Employee Relations', 'Benefits', 'Training'],
        performance: 85
      }
    ],
    departments: [
      {
        id: '1',
        name: 'Engineering',
        manager: 'David Wilson',
        employeeCount: 245,
        budget: '$3.2M',
        description: 'Responsible for product development, infrastructure, and technical innovation',
        goals: ['Launch 3 new products', 'Improve system performance by 40%', 'Reduce technical debt']
      },
      {
        id: '2',
        name: 'Sales & Marketing',
        manager: 'Jennifer Martinez',
        employeeCount: 89,
        budget: '$1.8M',
        description: 'Drive revenue growth through customer acquisition and retention strategies',
        goals: ['Increase revenue by 25%', 'Expand to 2 new markets', 'Improve conversion rate']
      },
      {
        id: '3',
        name: 'Human Resources',
        manager: 'Jennifer Lee',
        employeeCount: 23,
        budget: '$850K',
        description: 'Manage talent acquisition, employee development, and organizational culture',
        goals: ['Reduce turnover by 15%', 'Implement new training programs', 'Improve employee satisfaction']
      },
      {
        id: '4',
        name: 'Finance & Operations',
        manager: 'Robert Kim',
        employeeCount: 34,
        budget: '$1.1M',
        description: 'Oversee financial planning, operations, and business process optimization',
        goals: ['Optimize operational costs', 'Implement new ERP system', 'Improve financial reporting']
      }
    ],
    projects: [
      {
        id: '1',
        name: 'Customer Portal Redesign',
        description: 'Complete overhaul of customer-facing portal with modern UI/UX',
        status: 'in-progress',
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        budget: '$450,000',
        teamMembers: ['Sarah Johnson', 'Emily Rodriguez', 'Mike Chen'],
        progress: 65,
        priority: 'high'
      },
      {
        id: '2',
        name: 'Mobile App Development',
        description: 'Native mobile application for iOS and Android platforms',
        status: 'planning',
        startDate: '2024-03-01',
        endDate: '2024-12-15',
        budget: '$680,000',
        teamMembers: ['Mike Chen', 'Sarah Johnson'],
        progress: 15,
        priority: 'high'
      },
      {
        id: '3',
        name: 'Data Analytics Platform',
        description: 'Internal analytics platform for business intelligence and reporting',
        status: 'in-progress',
        startDate: '2023-10-01',
        endDate: '2024-04-30',
        budget: '$320,000',
        teamMembers: ['Sarah Johnson', 'Mike Chen'],
        progress: 80,
        priority: 'medium'
      },
      {
        id: '4',
        name: 'Security Audit & Compliance',
        description: 'Comprehensive security review and compliance certification',
        status: 'completed',
        startDate: '2023-08-01',
        endDate: '2023-12-31',
        budget: '$180,000',
        teamMembers: ['Mike Chen'],
        progress: 100,
        priority: 'high'
      }
    ],
    jobPostings: [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'San Francisco, CA (Remote Available)',
        type: 'full-time',
        level: 'senior',
        salary: '$120,000 - $150,000',
        description: 'We are seeking a talented Senior Full Stack Developer to join our growing engineering team. You will be responsible for developing and maintaining our core platform using modern technologies.',
        requirements: [
          '5+ years of experience in full-stack development',
          'Proficiency in React, Node.js, and TypeScript',
          'Experience with cloud platforms (AWS, Azure, or GCP)',
          'Strong understanding of database design and optimization',
          'Experience with agile development methodologies'
        ],
        benefits: [
          'Competitive salary and equity package',
          'Comprehensive health, dental, and vision insurance',
          'Flexible work arrangements and remote options',
          'Professional development budget',
          'Unlimited PTO policy'
        ],
        postedDate: '2024-01-15',
        deadline: '2024-02-15',
        status: 'active',
        applicants: 47
      },
      {
        id: '2',
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'New York, NY',
        type: 'full-time',
        level: 'mid',
        salary: '$80,000 - $100,000',
        description: 'Join our design team to create intuitive and beautiful user experiences for our enterprise software products.',
        requirements: [
          '3+ years of UX/UI design experience',
          'Proficiency in Figma, Sketch, or Adobe Creative Suite',
          'Strong portfolio demonstrating design thinking',
          'Experience with user research and testing',
          'Understanding of front-end development principles'
        ],
        benefits: [
          'Creative and collaborative work environment',
          'Latest design tools and equipment',
          'Conference and workshop attendance',
          'Mentorship opportunities',
          'Flexible schedule'
        ],
        postedDate: '2024-01-20',
        deadline: '2024-02-20',
        status: 'active',
        applicants: 23
      },
      {
        id: '3',
        title: 'DevOps Engineer',
        department: 'Engineering',
        location: 'Austin, TX (Hybrid)',
        type: 'full-time',
        level: 'mid',
        salary: '$95,000 - $125,000',
        description: 'Help us scale our infrastructure and improve our deployment processes as we grow our platform.',
        requirements: [
          '3+ years of DevOps or infrastructure experience',
          'Experience with containerization (Docker, Kubernetes)',
          'Knowledge of CI/CD pipelines and automation',
          'Familiarity with monitoring and logging tools',
          'Strong scripting skills (Python, Bash, etc.)'
        ],
        benefits: [
          'Cutting-edge technology stack',
          'Learning and development opportunities',
          'Stock options',
          'Health and wellness programs',
          'Team building events'
        ],
        postedDate: '2024-01-10',
        deadline: '2024-02-10',
        status: 'active',
        applicants: 31
      },
      {
        id: '4',
        title: 'Product Marketing Manager',
        department: 'Marketing',
        location: 'Remote',
        type: 'full-time',
        level: 'senior',
        salary: '$100,000 - $130,000',
        description: 'Lead product marketing initiatives and go-to-market strategies for our enterprise software solutions.',
        requirements: [
          '5+ years of product marketing experience',
          'Experience in B2B software marketing',
          'Strong analytical and communication skills',
          'Experience with marketing automation tools',
          'MBA or equivalent experience preferred'
        ],
        benefits: [
          'Fully remote position',
          'Marketing conference budget',
          'Performance bonuses',
          'Comprehensive benefits package',
          'Career advancement opportunities'
        ],
        postedDate: '2024-01-05',
        deadline: '2024-02-05',
        status: 'paused',
        applicants: 18
      }
    ],
    candidates: [
      {
        id: '1',
        name: 'Alex Smith',
        email: 'alex.smith@email.com',
        phone: '+1 (555) 987-6543',
        location: 'San Francisco, CA',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
        currentPosition: 'Senior Software Engineer at TechStart Inc.',
        experience: '6 years',
        education: 'BS Computer Science, Stanford University',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
        resume: 'alex_smith_resume.pdf',
        coverLetter: 'Passionate about building scalable web applications...',
        appliedDate: '2024-01-18',
        status: 'interview',
        rating: 4.5,
        notes: 'Strong technical background, excellent communication skills. Scheduled for final round.',
        jobId: '1',
        salary: '$140,000',
        availability: 'Immediate',
        portfolio: 'https://alexsmith.dev',
        linkedin: 'https://linkedin.com/in/alexsmith'
      },
      {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Austin, TX',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600',
        currentPosition: 'DevOps Engineer at CloudTech Solutions',
        experience: '4 years',
        education: 'MS Computer Engineering, UT Austin',
        skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Python', 'Jenkins'],
        resume: 'maria_garcia_resume.pdf',
        coverLetter: 'Experienced in scaling infrastructure for high-traffic applications...',
        appliedDate: '2024-01-12',
        status: 'offer',
        rating: 4.8,
        notes: 'Exceptional DevOps skills, great cultural fit. Offer extended.',
        jobId: '3',
        salary: '$115,000',
        availability: '2 weeks notice',
        linkedin: 'https://linkedin.com/in/mariagarcia'
      },
      {
        id: '3',
        name: 'David Chen',
        email: 'david.chen@email.com',
        phone: '+1 (555) 234-5678',
        location: 'New York, NY',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
        currentPosition: 'UX Designer at Design Studio Pro',
        experience: '3 years',
        education: 'BFA Interaction Design, Parsons School of Design',
        skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
        resume: 'david_chen_resume.pdf',
        coverLetter: 'Passionate about creating user-centered design solutions...',
        appliedDate: '2024-01-22',
        status: 'screening',
        rating: 4.2,
        notes: 'Strong portfolio, good design thinking. Moving to technical interview.',
        jobId: '2',
        salary: '$90,000',
        availability: '1 month notice',
        portfolio: 'https://davidchen.design',
        linkedin: 'https://linkedin.com/in/davidchen'
      },
      {
        id: '4',
        name: 'Sarah Williams',
        email: 'sarah.williams@email.com',
        phone: '+1 (555) 345-6789',
        location: 'Remote (Chicago, IL)',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
        currentPosition: 'Product Marketing Manager at SaaS Corp',
        experience: '7 years',
        education: 'MBA Marketing, Northwestern Kellogg',
        skills: ['Product Marketing', 'Go-to-Market Strategy', 'Analytics', 'Content Marketing', 'B2B Sales'],
        resume: 'sarah_williams_resume.pdf',
        coverLetter: 'Experienced in launching successful B2B software products...',
        appliedDate: '2024-01-08',
        status: 'hired',
        rating: 4.9,
        notes: 'Excellent experience and cultural fit. Hired for Product Marketing Manager role.',
        jobId: '4',
        salary: '$125,000',
        availability: 'Started',
        linkedin: 'https://linkedin.com/in/sarahwilliams'
      },
      {
        id: '5',
        name: 'Michael Johnson',
        email: 'michael.johnson@email.com',
        phone: '+1 (555) 567-8901',
        location: 'San Francisco, CA',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
        currentPosition: 'Full Stack Developer at StartupXYZ',
        experience: '5 years',
        education: 'BS Software Engineering, UC Berkeley',
        skills: ['React', 'Python', 'Django', 'PostgreSQL', 'Redis', 'GraphQL'],
        resume: 'michael_johnson_resume.pdf',
        coverLetter: 'Passionate about building innovative web applications...',
        appliedDate: '2024-01-16',
        status: 'applied',
        rating: 4.0,
        notes: 'Good technical skills, needs to demonstrate leadership experience.',
        jobId: '1',
        salary: '$130,000',
        availability: '3 weeks notice',
        portfolio: 'https://michaeljohnson.dev',
        linkedin: 'https://linkedin.com/in/michaeljohnson'
      }
    ]
  });

  const [editedInfo, setEditedInfo] = useState<CompanyInfo>(companyInfo);

  const handleSave = () => {
    setCompanyInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(companyInfo);
    setIsEditing(false);
  };

  const updateBasicInfo = (field: string, value: string | string[]) => {
    setEditedInfo(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  const addEmployee = () => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: '',
      email: '',
      position: '',
      department: '',
      hireDate: new Date().toISOString().split('T')[0],
      salary: '',
      status: 'active',
      avatar: '',
      manager: '',
      skills: [],
      performance: 0
    };
    setEditedInfo(prev => ({
      ...prev,
      employees: [newEmployee, ...prev.employees]
    }));
  };

  const updateEmployee = (id: string, field: string, value: string | string[] | number) => {
    setEditedInfo(prev => ({
      ...prev,
      employees: prev.employees.map(employee =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    }));
  };

  const removeEmployee = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      employees: prev.employees.filter(employee => employee.id !== id)
    }));
  };

  const addDepartment = () => {
    const newDepartment: Department = {
      id: Date.now().toString(),
      name: '',
      manager: '',
      employeeCount: 0,
      budget: '',
      description: '',
      goals: []
    };
    setEditedInfo(prev => ({
      ...prev,
      departments: [newDepartment, ...prev.departments]
    }));
  };

  const updateDepartment = (id: string, field: string, value: string | string[] | number) => {
    setEditedInfo(prev => ({
      ...prev,
      departments: prev.departments.map(department =>
        department.id === id ? { ...department, [field]: value } : department
      )
    }));
  };

  const removeDepartment = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      departments: prev.departments.filter(department => department.id !== id)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      status: 'planning',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      budget: '',
      teamMembers: [],
      progress: 0,
      priority: 'medium'
    };
    setEditedInfo(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id: string, field: string, value: string | string[] | number) => {
    setEditedInfo(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addJobPosting = () => {
    const newJob: JobPosting = {
      id: Date.now().toString(),
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      level: 'mid',
      salary: '',
      description: '',
      requirements: [],
      benefits: [],
      postedDate: new Date().toISOString().split('T')[0],
      deadline: '',
      status: 'active',
      applicants: 0
    };
    setEditedInfo(prev => ({
      ...prev,
      jobPostings: [newJob, ...prev.jobPostings]
    }));
  };

  const updateJobPosting = (id: string, field: string, value: string | string[] | number) => {
    setEditedInfo(prev => ({
      ...prev,
      jobPostings: prev.jobPostings.map(job =>
        job.id === id ? { ...job, [field]: value } : job
      )
    }));
  };

  const removeJobPosting = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      jobPostings: prev.jobPostings.filter(job => job.id !== id)
    }));
  };

  const updateCandidateStatus = (id: string, status: string, notes?: string) => {
    setEditedInfo(prev => ({
      ...prev,
      candidates: prev.candidates.map(candidate =>
        candidate.id === id ? { 
          ...candidate, 
          status: status as any,
          notes: notes || candidate.notes
        } : candidate
      )
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'in-progress':
      case 'completed':
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'on-hold':
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'on-leave':
      case 'planning':
      case 'applied':
      case 'screening':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
      case 'offer':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-blue-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredCandidates = companyInfo.candidates.filter(candidate => {
    const matchesFilter = candidateFilter === 'all' || candidate.status === candidateFilter;
    const matchesJob = !selectedJob || candidate.jobId === selectedJob;
    const matchesSearch = !searchTerm || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      candidate.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesJob && matchesSearch;
  });

  const currentInfo = isEditing ? editedInfo : companyInfo;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
          <p className="text-gray-600">Manage your organization, employees, and recruitment</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                icon={<X size={16} />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                icon={<Save size={16} />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              variant="primary" 
              size="sm"
              icon={<Edit3 size={16} />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Company Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar
                src={currentInfo.basicInfo.logo}
                alt={currentInfo.basicInfo.name}
                name={currentInfo.basicInfo.name}
                size="xl"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentInfo.basicInfo.name}
              </h2>
              <p className="text-gray-600">{currentInfo.basicInfo.industry}</p>
              <p className="text-sm text-gray-500">{currentInfo.basicInfo.size} • Founded {currentInfo.basicInfo.founded}</p>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{currentInfo.basicInfo.website}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{currentInfo.basicInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{currentInfo.basicInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{currentInfo.businessMetrics.totalEmployees}</div>
            <div className="text-sm text-gray-600">Total Employees</div>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-xs">+12% this year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{currentInfo.businessMetrics.totalRevenue}</div>
            <div className="text-sm text-gray-600">Annual Revenue</div>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <DollarSign className="w-4 h-4 mr-1" />
              <span className="text-xs">+{currentInfo.businessMetrics.growthRate} growth</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{currentInfo.jobPostings.filter(j => j.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Job Postings</div>
            <div className="flex items-center justify-center mt-2 text-blue-600">
              <Briefcase className="w-4 h-4 mr-1" />
              <span className="text-xs">Hiring now</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">{currentInfo.candidates.length}</div>
            <div className="text-sm text-gray-600">Total Candidates</div>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-xs">{currentInfo.candidates.filter(c => c.status === 'applied').length} new</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">{currentInfo.projects.filter(p => p.status === 'in-progress').length}</div>
            <div className="text-sm text-gray-600">Active Projects</div>
            <div className="flex items-center justify-center mt-2 text-blue-600">
              <Activity className="w-4 h-4 mr-1" />
              <span className="text-xs">In progress</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Company Overview', icon: Building2 },
            { id: 'employees', label: 'Employee Management', icon: Users },
            { id: 'departments', label: 'Departments', icon: Briefcase },
            { id: 'projects', label: 'Projects', icon: Target },
            { id: 'hiring', label: 'Hiring & Recruitment', icon: UserPlus },
            { id: 'analytics', label: 'Business Analytics', icon: BarChart3 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Company Name"
                  value={currentInfo.basicInfo.name}
                  onChange={(e) => updateBasicInfo('name', e.target.value)}
                  disabled={!isEditing}
                  icon={<Building2 size={16} />}
                />
                <Input
                  label="Industry"
                  value={currentInfo.basicInfo.industry}
                  onChange={(e) => updateBasicInfo('industry', e.target.value)}
                  disabled={!isEditing}
                  icon={<Building2 size={16} />}
                />
                <Input
                  label="Company Size"
                  value={currentInfo.basicInfo.size}
                  onChange={(e) => updateBasicInfo('size', e.target.value)}
                  disabled={!isEditing}
                  icon={<Users size={16} />}
                />
                <Input
                  label="Founded"
                  value={currentInfo.basicInfo.founded}
                  onChange={(e) => updateBasicInfo('founded', e.target.value)}
                  disabled={!isEditing}
                  icon={<Calendar size={16} />}
                />
                <Input
                  label="Website"
                  value={currentInfo.basicInfo.website}
                  onChange={(e) => updateBasicInfo('website', e.target.value)}
                  disabled={!isEditing}
                  icon={<Globe size={16} />}
                />
                <Input
                  label="Email"
                  type="email"
                  value={currentInfo.basicInfo.email}
                  onChange={(e) => updateBasicInfo('email', e.target.value)}
                  disabled={!isEditing}
                  icon={<Mail size={16} />}
                />
                <Input
                  label="Phone"
                  value={currentInfo.basicInfo.phone}
                  onChange={(e) => updateBasicInfo('phone', e.target.value)}
                  disabled={!isEditing}
                  icon={<Phone size={16} />}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    value={currentInfo.basicInfo.address}
                    onChange={(e) => updateBasicInfo('address', e.target.value)}
                    disabled={!isEditing}
                    icon={<MapPin size={16} />}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    value={currentInfo.basicInfo.description}
                    onChange={(e) => updateBasicInfo('description', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Mission Statement"
                    value={currentInfo.basicInfo.mission}
                    onChange={(e) => updateBasicInfo('mission', e.target.value)}
                    disabled={!isEditing}
                    icon={<Target size={16} />}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentInfo.basicInfo.values.map((value, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'employees' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Employee Management</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<UserPlus size={16} />} onClick={addEmployee}>
                Add Employee
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentInfo.employees.map((employee) => (
                <div key={employee.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar
                        src={employee.avatar}
                        alt={employee.name}
                        name={employee.name}
                        size="md"
                      />
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                              label="Full Name"
                              value={employee.name}
                              onChange={(e) => updateEmployee(employee.id, 'name', e.target.value)}
                              icon={<User size={16} />}
                            />
                            <Input
                              label="Email"
                              type="email"
                              value={employee.email}
                              onChange={(e) => updateEmployee(employee.id, 'email', e.target.value)}
                              icon={<Mail size={16} />}
                            />
                            <Input
                              label="Position"
                              value={employee.position}
                              onChange={(e) => updateEmployee(employee.id, 'position', e.target.value)}
                              icon={<Briefcase size={16} />}
                            />
                            <Input
                              label="Department"
                              value={employee.department}
                              onChange={(e) => updateEmployee(employee.id, 'department', e.target.value)}
                              icon={<Building2 size={16} />}
                            />
                            <Input
                              label="Hire Date"
                              type="date"
                              value={employee.hireDate}
                              onChange={(e) => updateEmployee(employee.id, 'hireDate', e.target.value)}
                              icon={<Calendar size={16} />}
                            />
                            <Input
                              label="Salary"
                              value={employee.salary}
                              onChange={(e) => updateEmployee(employee.id, 'salary', e.target.value)}
                              icon={<DollarSign size={16} />}
                            />
                            <Input
                              label="Manager"
                              value={employee.manager}
                              onChange={(e) => updateEmployee(employee.id, 'manager', e.target.value)}
                              icon={<User size={16} />}
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                              </label>
                              <select
                                value={employee.status}
                                onChange={(e) => updateEmployee(employee.id, 'status', e.target.value)}
                                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="on-leave">On Leave</option>
                              </select>
                            </div>
                            <Input
                              label="Performance Score"
                              type="number"
                              value={employee.performance.toString()}
                              onChange={(e) => updateEmployee(employee.id, 'performance', parseInt(e.target.value) || 0)}
                              icon={<Award size={16} />}
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                                  {employee.status}
                                </span>
                                <span className={`text-sm font-medium ${getPerformanceColor(employee.performance)}`}>
                                  {employee.performance}% Performance
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
                            <p className="text-sm text-gray-500">{employee.email} • Manager: {employee.manager}</p>
                            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                              <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
                              <span>Salary: {employee.salary}</span>
                            </div>
                            {employee.skills.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {employee.skills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeEmployee(employee.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'departments' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Department Management</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addDepartment}>
                Add Department
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentInfo.departments.map((department) => (
                <div key={department.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-4">
                          <Input
                            label="Department Name"
                            value={department.name}
                            onChange={(e) => updateDepartment(department.id, 'name', e.target.value)}
                            icon={<Building2 size={16} />}
                          />
                          <Input
                            label="Manager"
                            value={department.manager}
                            onChange={(e) => updateDepartment(department.id, 'manager', e.target.value)}
                            icon={<User size={16} />}
                          />
                          <Input
                            label="Employee Count"
                            type="number"
                            value={department.employeeCount.toString()}
                            onChange={(e) => updateDepartment(department.id, 'employeeCount', parseInt(e.target.value) || 0)}
                            icon={<Users size={16} />}
                          />
                          <Input
                            label="Budget"
                            value={department.budget}
                            onChange={(e) => updateDepartment(department.id, 'budget', e.target.value)}
                            icon={<DollarSign size={16} />}
                          />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={department.description}
                              onChange={(e) => updateDepartment(department.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{department.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{department.description}</p>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                              <span>Manager:</span>
                              <span className="font-medium">{department.manager}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Employees:</span>
                              <span className="font-medium">{department.employeeCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Budget:</span>
                              <span className="font-medium">{department.budget}</span>
                            </div>
                          </div>
                          {department.goals.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Department Goals</h4>
                              <ul className="space-y-1">
                                {department.goals.map((goal, index) => (
                                  <li key={index} className="text-xs text-gray-600 flex items-start">
                                    <Target className="w-3 h-3 mr-1 mt-0.5 text-blue-500" />
                                    {goal}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeDepartment(department.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'projects' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Project Management</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addProject}>
                Add Project
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentInfo.projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Project Name"
                            value={project.name}
                            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                            icon={<Target size={16} />}
                          />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Status
                            </label>
                            <select
                              value={project.status}
                              onChange={(e) => updateProject(project.id, 'status', e.target.value)}
                              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="planning">Planning</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="on-hold">On Hold</option>
                            </select>
                          </div>
                          <Input
                            label="Start Date"
                            type="date"
                            value={project.startDate}
                            onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <Input
                            label="End Date"
                            type="date"
                            value={project.endDate}
                            onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <Input
                            label="Budget"
                            value={project.budget}
                            onChange={(e) => updateProject(project.id, 'budget', e.target.value)}
                            icon={<DollarSign size={16} />}
                          />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Priority
                            </label>
                            <select
                              value={project.priority}
                              onChange={(e) => updateProject(project.id, 'priority', e.target.value)}
                              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                          <Input
                            label="Progress (%)"
                            type="number"
                            value={project.progress.toString()}
                            onChange={(e) => updateProject(project.id, 'progress', parseInt(e.target.value) || 0)}
                            icon={<BarChart3 size={16} />}
                          />
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={project.description}
                              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{project.name}</h3>
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                {project.priority} priority
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Start:</span> {new Date(project.startDate).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">End:</span> {new Date(project.endDate).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Budget:</span> {project.budget}
                            </div>
                            <div>
                              <span className="font-medium">Progress:</span> {project.progress}%
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          {project.teamMembers.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Team: </span>
                              <span className="text-sm text-gray-600">{project.teamMembers.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeProject(project.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'hiring' && (
        <div className="space-y-6">
          {/* Job Postings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Job Postings</CardTitle>
              {isEditing && (
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addJobPosting}>
                  Create Job Posting
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentInfo.jobPostings.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{job.applicants} applicants</span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-600">{job.description}</p>
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                          <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                          <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 size={16} />}
                          onClick={() => removeJobPosting(job.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Candidate Management */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Management</CardTitle>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search size={16} />}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Jobs</option>
                    {currentInfo.jobPostings.map((job) => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                  <select
                    value={candidateFilter}
                    onChange={(e) => setCandidateFilter(e.target.value)}
                    className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => {
                  const jobTitle = currentInfo.jobPostings.find(j => j.id === candidate.jobId)?.title || 'Unknown Position';
                  return (
                    <div key={candidate.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar
                            src={candidate.avatar}
                            alt={candidate.name}
                            name={candidate.name}
                            size="md"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  {getRatingStars(candidate.rating)}
                                  <span className="ml-1 text-sm text-gray-600">({candidate.rating})</span>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                                  {candidate.status}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{candidate.currentPosition}</p>
                            <p className="text-sm text-blue-600 font-medium mb-2">Applied for: {jobTitle}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                <span>{candidate.email}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                <span>{candidate.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                <span>{candidate.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{candidate.experience} experience</span>
                              </div>
                              <div className="flex items-center">
                                <GraduationCap className="w-4 h-4 mr-1" />
                                <span>{candidate.education}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                <span>Expected: {candidate.salary}</span>
                              </div>
                            </div>

                            {candidate.skills.length > 0 && (
                              <div className="mb-3">
                                <h4 className="text-sm font-medium text-gray-900 mb-1">Skills</h4>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.map((skill, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {candidate.notes && (
                              <div className="mb-3">
                                <h4 className="text-sm font-medium text-gray-900 mb-1">Notes</h4>
                                <p className="text-sm text-gray-600">{candidate.notes}</p>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">
                                Applied: {new Date(candidate.appliedDate).toLocaleDateString()} • 
                                Available: {candidate.availability}
                              </div>
                              <div className="flex items-center space-x-2">
                                {candidate.portfolio && (
                                  <Button variant="outline" size="sm" icon={<Eye size={16} />}>
                                    Portfolio
                                  </Button>
                                )}
                                <Button variant="outline" size="sm" icon={<FileText size={16} />}>
                                  Resume
                                </Button>
                                <Button variant="outline" size="sm" icon={<MessageSquare size={16} />}>
                                  Contact
                                </Button>
                                <div className="relative">
                                  <select
                                    value={candidate.status}
                                    onChange={(e) => updateCandidateStatus(candidate.id, e.target.value)}
                                    className="h-8 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="applied">Applied</option>
                                    <option value="screening">Screening</option>
                                    <option value="interview">Interview</option>
                                    <option value="offer">Offer</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center p-6">
                  <BarChart3 className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Business Analytics Dashboard</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Real-time analytics showing revenue trends, employee performance, and project success rates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentInfo.employees
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 5)
                    .map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar
                            src={employee.avatar}
                            alt={employee.name}
                            name={employee.name}
                            size="sm"
                          />
                          <div>
                            <span className="text-sm font-medium">{employee.name}</span>
                            <p className="text-xs text-gray-500">{employee.position}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${getPerformanceColor(employee.performance)}`}>
                          {employee.performance}%
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiring Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { status: 'applied', label: 'New Applications', count: currentInfo.candidates.filter(c => c.status === 'applied').length },
                    { status: 'screening', label: 'In Screening', count: currentInfo.candidates.filter(c => c.status === 'screening').length },
                    { status: 'interview', label: 'Interviewing', count: currentInfo.candidates.filter(c => c.status === 'interview').length },
                    { status: 'offer', label: 'Offers Extended', count: currentInfo.candidates.filter(c => c.status === 'offer').length },
                    { status: 'hired', label: 'Recently Hired', count: currentInfo.candidates.filter(c => c.status === 'hired').length }
                  ].map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;