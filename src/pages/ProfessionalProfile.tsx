import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Award, CreditCard as Edit3, Save, X, Camera, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import { useAuth } from '../contexts/AuthContext';

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Tool';
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate?: string;
}

interface ProfessionalInfo {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  professionalInfo: {
    currentPosition: string;
    currentCompany: string;
    experienceLevel: string;
    industry: string;
    summary: string;
    availability: string;
    salaryExpectation: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  jobSeeking: {
    isActivelyLooking: boolean;
    preferredRoles: string[];
    preferredLocations: string[];
    workArrangement: string;
    noticePeriod: string;
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
  };
  preferences: {
    notifications: boolean;
    profileVisibility: string;
    contactPreference: string;
  };
}

const ProfessionalProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [professionalInfo, setProfessionalInfo] = useState<ProfessionalInfo>({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'City, State',
      website: 'https://johndoe.dev',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    },
    professionalInfo: {
      currentPosition: 'Senior Developer',
      currentCompany: 'Tech Company Inc.',
      experienceLevel: 'Senior (5+ years)',
      industry: 'Technology',
      summary: 'Experienced professional with expertise in software development and project management. Passionate about creating innovative solutions and leading high-performing teams.',
      availability: 'Available in 2 weeks',
      salaryExpectation: '$80,000 - $120,000'
    },
    workExperience: [
      {
        id: '1',
        company: 'Tech Company Inc.',
        position: 'Senior Developer',
        startDate: '2022-01-01',
        endDate: '',
        current: true,
        description: 'Lead development of web applications and manage technical projects.',
        achievements: [
          'Led team of 5 developers on major project',
          'Improved system performance by 40%',
          'Implemented new development processes'
        ]
      },
      {
        id: '2',
        company: 'Previous Company LLC',
        position: 'Software Developer',
        startDate: '2020-03-01',
        endDate: '2021-12-31',
        current: false,
        description: 'Developed and maintained software applications using modern technologies.',
        achievements: [
          'Built 3 major features from scratch',
          'Reduced bug reports by 30%',
          'Mentored junior developers'
        ]
      }
    ],
    education: [
      {
        id: '1',
        institution: 'State University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016-08-01',
        endDate: '2020-05-15',
        gpa: '3.8',
        honors: 'Magna Cum Laude'
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript', level: 'Expert', category: 'Technical' },
      { id: '2', name: 'React', level: 'Advanced', category: 'Technical' },
      { id: '3', name: 'Node.js', level: 'Advanced', category: 'Technical' },
      { id: '4', name: 'Python', level: 'Intermediate', category: 'Technical' },
      { id: '5', name: 'Leadership', level: 'Advanced', category: 'Soft' },
      { id: '6', name: 'Project Management', level: 'Advanced', category: 'Soft' },
      { id: '7', name: 'Git', level: 'Expert', category: 'Tool' },
      { id: '8', name: 'Docker', level: 'Intermediate', category: 'Tool' }
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with modern UI and robust backend.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'https://demo-project.com',
        github: 'https://github.com/johndoe/ecommerce',
        startDate: '2023-01-01',
        endDate: '2023-06-01'
      },
      {
        id: '2',
        name: 'Task Management App',
        description: 'Collaborative task management application with real-time updates.',
        technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
        github: 'https://github.com/johndoe/taskapp',
        startDate: '2022-08-01',
        endDate: '2022-12-01'
      }
    ],
    jobSeeking: {
      isActivelyLooking: true,
      preferredRoles: ['Senior Developer', 'Tech Lead', 'Engineering Manager'],
      preferredLocations: ['Remote', 'City, State', 'Major City'],
      workArrangement: 'Hybrid',
      noticePeriod: '2 weeks',
      salaryRange: {
        min: 80000,
        max: 120000,
        currency: 'USD'
      }
    },
    preferences: {
      notifications: true,
      profileVisibility: 'Public',
      contactPreference: 'Email'
    }
  });

  const [editedInfo, setEditedInfo] = useState<ProfessionalInfo>(professionalInfo);

  const handleSave = () => {
    setProfessionalInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(professionalInfo);
    setIsEditing(false);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setEditedInfo(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateProfessionalInfo = (field: string, value: string) => {
    setEditedInfo(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        [field]: value
      }
    }));
  };

  const updateJobSeeking = (field: string, value: any) => {
    setEditedInfo(prev => ({
      ...prev,
      jobSeeking: {
        ...prev.jobSeeking,
        [field]: value
      }
    }));
  };

  const updatePreferences = (field: string, value: string | boolean) => {
    setEditedInfo(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    setEditedInfo(prev => ({
      ...prev,
      workExperience: [newExperience, ...prev.workExperience]
    }));
  };

  const updateWorkExperience = (id: string, field: string, value: any) => {
    setEditedInfo(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    setEditedInfo(prev => ({
      ...prev,
      education: [newEducation, ...prev.education]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setEditedInfo(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner',
      category: 'Technical'
    };
    setEditedInfo(prev => ({
      ...prev,
      skills: [newSkill, ...prev.skills]
    }));
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setEditedInfo(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      startDate: '',
      endDate: ''
    };
    setEditedInfo(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id: string, field: string, value: any) => {
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

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Beginner':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-purple-100 text-purple-800';
      case 'Soft':
        return 'bg-green-100 text-green-800';
      case 'Language':
        return 'bg-blue-100 text-blue-800';
      case 'Tool':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const currentInfo = isEditing ? editedInfo : professionalInfo;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Professional Profile</h1>
          <p className="text-gray-600">Manage your professional information and career details</p>
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

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                name={user?.name}
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
                {currentInfo.personalInfo.firstName} {currentInfo.personalInfo.lastName}
              </h2>
              <p className="text-blue-600 font-medium">{currentInfo.professionalInfo.currentPosition}</p>
              <p className="text-gray-600">{currentInfo.professionalInfo.currentCompany}</p>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{currentInfo.personalInfo.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>{currentInfo.professionalInfo.experienceLevel}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span>{currentInfo.professionalInfo.industry}</span>
                </div>
              </div>

              {currentInfo.professionalInfo.summary && (
                <p className="mt-4 text-gray-700 max-w-2xl">
                  {currentInfo.professionalInfo.summary}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'personal', label: 'Personal Info', icon: User },
            { id: 'professional', label: 'Professional Info', icon: Briefcase },
            { id: 'experience', label: 'Work Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: Award },
            { id: 'skills', label: 'Skills', icon: Award },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'jobstatus', label: 'Job Seeking', icon: Briefcase },
            { id: 'preferences', label: 'Preferences', icon: Edit3 }
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
      {activeTab === 'personal' && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                value={currentInfo.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                disabled={!isEditing}
                icon={<User size={16} />}
              />
              <Input
                label="Last Name"
                value={currentInfo.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                disabled={!isEditing}
                icon={<User size={16} />}
              />
              <Input
                label="Email"
                type="email"
                value={currentInfo.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                disabled={!isEditing}
                icon={<Mail size={16} />}
              />
              <Input
                label="Phone"
                value={currentInfo.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                disabled={!isEditing}
                icon={<Phone size={16} />}
              />
              <Input
                label="Location"
                value={currentInfo.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                disabled={!isEditing}
                icon={<MapPin size={16} />}
              />
              <Input
                label="Website"
                value={currentInfo.personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                disabled={!isEditing}
                icon={<ExternalLink size={16} />}
              />
              <Input
                label="LinkedIn"
                value={currentInfo.personalInfo.linkedin || ''}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                disabled={!isEditing}
                icon={<ExternalLink size={16} />}
              />
              <Input
                label="GitHub"
                value={currentInfo.personalInfo.github || ''}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                disabled={!isEditing}
                icon={<ExternalLink size={16} />}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'professional' && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Current Position"
                value={currentInfo.professionalInfo.currentPosition}
                onChange={(e) => updateProfessionalInfo('currentPosition', e.target.value)}
                disabled={!isEditing}
                icon={<Briefcase size={16} />}
              />
              <Input
                label="Current Company"
                value={currentInfo.professionalInfo.currentCompany}
                onChange={(e) => updateProfessionalInfo('currentCompany', e.target.value)}
                disabled={!isEditing}
                icon={<Briefcase size={16} />}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={currentInfo.professionalInfo.experienceLevel}
                  onChange={(e) => updateProfessionalInfo('experienceLevel', e.target.value)}
                  disabled={!isEditing}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                  <option value="Mid Level (2-5 years)">Mid Level (2-5 years)</option>
                  <option value="Senior (5+ years)">Senior (5+ years)</option>
                  <option value="Lead/Manager (8+ years)">Lead/Manager (8+ years)</option>
                  <option value="Executive (10+ years)">Executive (10+ years)</option>
                </select>
              </div>
              <Input
                label="Industry"
                value={currentInfo.professionalInfo.industry}
                onChange={(e) => updateProfessionalInfo('industry', e.target.value)}
                disabled={!isEditing}
                icon={<Award size={16} />}
              />
              <Input
                label="Availability"
                value={currentInfo.professionalInfo.availability}
                onChange={(e) => updateProfessionalInfo('availability', e.target.value)}
                disabled={!isEditing}
                icon={<Calendar size={16} />}
              />
              <Input
                label="Salary Expectation"
                value={currentInfo.professionalInfo.salaryExpectation}
                onChange={(e) => updateProfessionalInfo('salaryExpectation', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., $80,000 - $120,000"
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary
                </label>
                <textarea
                  value={currentInfo.professionalInfo.summary}
                  onChange={(e) => updateProfessionalInfo('summary', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Brief summary of your professional background and goals..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'experience' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Work Experience</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addWorkExperience}>
                Add Experience
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentInfo.workExperience.map((experience) => (
                <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Company"
                            value={experience.company}
                            onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                            icon={<Briefcase size={16} />}
                          />
                          <Input
                            label="Position"
                            value={experience.position}
                            onChange={(e) => updateWorkExperience(experience.id, 'position', e.target.value)}
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="Start Date"
                            type="date"
                            value={experience.startDate}
                            onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <div className="flex items-center space-x-2">
                            <Input
                              label="End Date"
                              type="date"
                              value={experience.endDate}
                              onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                              disabled={experience.current}
                              icon={<Calendar size={16} />}
                            />
                            <label className="flex items-center mt-6">
                              <input
                                type="checkbox"
                                checked={experience.current}
                                onChange={(e) => updateWorkExperience(experience.id, 'current', e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm">Current</span>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">{experience.position}</h3>
                          <p className="text-blue-600 font-medium">{experience.company}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(experience.startDate).toLocaleDateString()} - {experience.current ? 'Present' : new Date(experience.endDate).toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeWorkExperience(experience.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={experience.description}
                          onChange={(e) => updateWorkExperience(experience.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700">{experience.description}</p>
                      )}
                    </div>

                    {experience.achievements.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Key Achievements
                        </label>
                        <ul className="list-disc list-inside space-y-1">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="text-gray-700 text-sm">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'education' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addEducation}>
                Add Education
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentInfo.education.map((edu) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Institution"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="Degree"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="Field of Study"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="GPA"
                            value={edu.gpa || ''}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="e.g., 3.8"
                          />
                          <Input
                            label="Start Date"
                            type="date"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <Input
                            label="End Date"
                            type="date"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <div className="md:col-span-2">
                            <Input
                              label="Honors/Awards"
                              value={edu.honors || ''}
                              onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                              placeholder="e.g., Magna Cum Laude, Dean's List"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                          <p className="text-blue-600 font-medium">{edu.institution}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                            {edu.gpa && <span><strong>GPA:</strong> {edu.gpa}</span>}
                            {edu.honors && <span><strong>Honors:</strong> {edu.honors}</span>}
                          </div>
                        </>
                      )}
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'skills' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addSkill}>
                Add Skill
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  {currentInfo.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <Input
                        label="Skill Name"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        className="flex-1"
                      />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                        <select
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                          className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={skill.category}
                          onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                          className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Technical">Technical</option>
                          <option value="Soft">Soft</option>
                          <option value="Language">Language</option>
                          <option value="Tool">Tool</option>
                        </select>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {['Technical', 'Soft', 'Tool', 'Language'].map((category) => {
                    const categorySkills = currentInfo.skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">{category} Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill) => (
                            <div key={skill.id} className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getSkillCategoryColor(skill.category)}`}>
                                {skill.name}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getSkillLevelColor(skill.level)}`}>
                                {skill.level}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'projects' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projects</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addProject}>
                Add Project
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentInfo.projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Project Name"
                            value={project.name}
                            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                          />
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
                            value={project.endDate || ''}
                            onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <Input
                            label="Project URL"
                            value={project.url || ''}
                            onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                            icon={<ExternalLink size={16} />}
                          />
                          <Input
                            label="GitHub URL"
                            value={project.github || ''}
                            onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                            icon={<ExternalLink size={16} />}
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
                        <>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                            {project.url && (
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                <ExternalLink size={16} />
                              </a>
                            )}
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{project.description}</p>
                          <p className="text-sm text-gray-500 mb-3">
                            {new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Ongoing'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeProject(project.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'jobstatus' && (
        <Card>
          <CardHeader>
            <CardTitle>Job Seeking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Actively Looking for Opportunities</h4>
                  <p className="text-sm text-gray-500">Let recruiters know you're open to new opportunities</p>
                </div>
                <button
                  onClick={() => updateJobSeeking('isActivelyLooking', !currentInfo.jobSeeking.isActivelyLooking)}
                  disabled={!isEditing}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    currentInfo.jobSeeking.isActivelyLooking ? 'bg-green-600' : 'bg-gray-200'
                  } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      currentInfo.jobSeeking.isActivelyLooking ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Roles
                  </label>
                  <div className="space-y-2">
                    {currentInfo.jobSeeking.preferredRoles.map((role, index) => (
                      <div key={index} className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                          {role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Arrangement
                  </label>
                  <select
                    value={currentInfo.jobSeeking.workArrangement}
                    onChange={(e) => updateJobSeeking('workArrangement', e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <Input
                  label="Notice Period"
                  value={currentInfo.jobSeeking.noticePeriod}
                  onChange={(e) => updateJobSeeking('noticePeriod', e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., 2 weeks, 1 month"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={currentInfo.jobSeeking.salaryRange.min}
                      onChange={(e) => updateJobSeeking('salaryRange', {
                        ...currentInfo.jobSeeking.salaryRange,
                        min: parseInt(e.target.value) || 0
                      })}
                      disabled={!isEditing}
                      placeholder="Min"
                      className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span className="flex items-center text-gray-500">-</span>
                    <input
                      type="number"
                      value={currentInfo.jobSeeking.salaryRange.max}
                      onChange={(e) => updateJobSeeking('salaryRange', {
                        ...currentInfo.jobSeeking.salaryRange,
                        max: parseInt(e.target.value) || 0
                      })}
                      disabled={!isEditing}
                      placeholder="Max"
                      className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Locations
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentInfo.jobSeeking.preferredLocations.map((location, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'preferences' && (
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email updates about job opportunities and messages</p>
                </div>
                <button
                  onClick={() => updatePreferences('notifications', !currentInfo.preferences.notifications)}
                  disabled={!isEditing}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    currentInfo.preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'
                  } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      currentInfo.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={currentInfo.preferences.profileVisibility}
                    onChange={(e) => updatePreferences('profileVisibility', e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Connections Only">Connections Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Preference
                  </label>
                  <select
                    value={currentInfo.preferences.contactPreference}
                    onChange={(e) => updatePreferences('contactPreference', e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Career Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Career Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">5+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Skills Mastered</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">Profile Completeness</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalProfile;