import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, GraduationCap, Award, CreditCard as Edit3, Save, X, Camera, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import { useAuth } from '../contexts/AuthContext';

interface AcademicRecord {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  honors: string;
  relevantCourses: string[];
  thesis?: string;
}

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  semester: string;
  year: string;
  grade: string;
  credits: number;
}

interface StudentInfo {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
  };
  academicInfo: {
    studentId: string;
    major: string;
    minor: string;
    year: string;
    gpa: string;
    expectedGraduation: string;
    advisor: string;
  };
  academicRecords: AcademicRecord[];
  courses: Course[];
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    timezone: string;
  };
}

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@university.edu',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '2000-01-15',
      address: '123 Main St, City, ST 12345'
    },
    academicInfo: {
      studentId: 'STU001234',
      major: 'Computer Science',
      minor: 'Mathematics',
      year: 'Senior',
      gpa: '3.8',
      expectedGraduation: '2025-05-15',
      advisor: 'Dr. Academic Advisor'
    },
    academicRecords: [
      {
        id: '1',
        institution: 'University Name',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2021-08-01',
        endDate: '2025-05-15',
        gpa: '3.8',
        honors: 'Dean\'s List',
        relevantCourses: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Web Development', 'Advanced Topics'],
        thesis: 'Senior Capstone Project'
      },
      {
        id: '2',
        institution: 'Previous Institution',
        degree: 'Associate of Science',
        field: 'General Studies',
        startDate: '2019-08-01',
        endDate: '2021-05-20',
        gpa: '3.9',
        honors: 'Honor Society',
        relevantCourses: ['Mathematics', 'Science', 'English', 'Social Studies', 'Electives'],
        thesis: ''
      }
    ],
    courses: [
      {
        id: '1',
        courseCode: 'COURSE 101',
        courseName: 'Advanced Course A',
        instructor: 'Professor A',
        semester: 'Fall',
        year: '2024',
        grade: 'A',
        credits: 3
      },
      {
        id: '2',
        courseCode: 'COURSE 102',
        courseName: 'Advanced Course B',
        instructor: 'Professor B',
        semester: 'Fall',
        year: '2024',
        grade: 'A-',
        credits: 4
      },
      {
        id: '3',
        courseCode: 'COURSE 103',
        courseName: 'Mathematics Course',
        instructor: 'Professor C',
        semester: 'Fall',
        year: '2024',
        grade: 'B+',
        credits: 3
      },
      {
        id: '4',
        courseCode: 'COURSE 104',
        courseName: 'Technical Course A',
        instructor: 'Professor D',
        semester: 'Spring',
        year: '2024',
        grade: 'A',
        credits: 3
      },
      {
        id: '5',
        courseCode: 'COURSE 105',
        courseName: 'Technical Course B',
        instructor: 'Professor E',
        semester: 'Spring',
        year: '2024',
        grade: 'A-',
        credits: 3
      }
    ],
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'English',
      timezone: 'EST'
    }
  });

  const [editedInfo, setEditedInfo] = useState<StudentInfo>(studentInfo);

  const handleSave = () => {
    setStudentInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(studentInfo);
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

  const updateAcademicInfo = (field: string, value: string) => {
    setEditedInfo(prev => ({
      ...prev,
      academicInfo: {
        ...prev.academicInfo,
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

  const addAcademicRecord = () => {
    const newRecord: AcademicRecord = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
      relevantCourses: [],
      thesis: ''
    };
    setEditedInfo(prev => ({
      ...prev,
      academicRecords: [newRecord, ...prev.academicRecords]
    }));
  };

  const updateAcademicRecord = (id: string, field: string, value: string | string[]) => {
    setEditedInfo(prev => ({
      ...prev,
      academicRecords: prev.academicRecords.map(record =>
        record.id === id ? { ...record, [field]: value } : record
      )
    }));
  };

  const removeAcademicRecord = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      academicRecords: prev.academicRecords.filter(record => record.id !== id)
    }));
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      courseCode: '',
      courseName: '',
      instructor: '',
      semester: '',
      year: '',
      grade: '',
      credits: 0
    };
    setEditedInfo(prev => ({
      ...prev,
      courses: [newCourse, ...prev.courses]
    }));
  };

  const updateCourse = (id: string, field: string, value: string | number) => {
    setEditedInfo(prev => ({
      ...prev,
      courses: prev.courses.map(course =>
        course.id === id ? { ...course, [field]: value } : course
      )
    }));
  };

  const removeCourse = (id: string) => {
    setEditedInfo(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== id)
    }));
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800';
    if (grade.startsWith('F')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const currentInfo = isEditing ? editedInfo : studentInfo;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
          <p className="text-gray-600">Manage your academic and personal information</p>
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
              <p className="text-gray-600">{currentInfo.academicInfo.major}</p>
              <p className="text-sm text-gray-500">Student ID: {currentInfo.academicInfo.studentId}</p>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span>{currentInfo.academicInfo.year}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span>GPA: {currentInfo.academicInfo.gpa}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Graduating {new Date(currentInfo.academicInfo.expectedGraduation).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'personal', label: 'Personal Info', icon: User },
            { id: 'academic', label: 'Academic Info', icon: BookOpen },
            { id: 'records', label: 'Academic Records', icon: GraduationCap },
            { id: 'courses', label: 'Course History', icon: BookOpen },
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
                label="Date of Birth"
                type="date"
                value={currentInfo.personalInfo.dateOfBirth}
                onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                icon={<Calendar size={16} />}
              />
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  value={currentInfo.personalInfo.address}
                  onChange={(e) => updatePersonalInfo('address', e.target.value)}
                  disabled={!isEditing}
                  icon={<MapPin size={16} />}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'academic' && (
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Student ID"
                value={currentInfo.academicInfo.studentId}
                disabled={true}
                icon={<BookOpen size={16} />}
              />
              <Input
                label="Major"
                value={currentInfo.academicInfo.major}
                onChange={(e) => updateAcademicInfo('major', e.target.value)}
                disabled={!isEditing}
                icon={<GraduationCap size={16} />}
              />
              <Input
                label="Minor"
                value={currentInfo.academicInfo.minor}
                onChange={(e) => updateAcademicInfo('minor', e.target.value)}
                disabled={!isEditing}
                icon={<BookOpen size={16} />}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year
                </label>
                <select
                  value={currentInfo.academicInfo.year}
                  onChange={(e) => updateAcademicInfo('year', e.target.value)}
                  disabled={!isEditing}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <Input
                label="GPA"
                value={currentInfo.academicInfo.gpa}
                onChange={(e) => updateAcademicInfo('gpa', e.target.value)}
                disabled={!isEditing}
                icon={<Award size={16} />}
              />
              <Input
                label="Expected Graduation"
                type="date"
                value={currentInfo.academicInfo.expectedGraduation}
                onChange={(e) => updateAcademicInfo('expectedGraduation', e.target.value)}
                disabled={!isEditing}
                icon={<Calendar size={16} />}
              />
              <Input
                label="Academic Advisor"
                value={currentInfo.academicInfo.advisor}
                onChange={(e) => updateAcademicInfo('advisor', e.target.value)}
                disabled={!isEditing}
                icon={<User size={16} />}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'records' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Academic Records</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addAcademicRecord}>
                Add Record
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentInfo.academicRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Institution"
                            value={record.institution}
                            onChange={(e) => updateAcademicRecord(record.id, 'institution', e.target.value)}
                            icon={<GraduationCap size={16} />}
                          />
                          <Input
                            label="Degree"
                            value={record.degree}
                            onChange={(e) => updateAcademicRecord(record.id, 'degree', e.target.value)}
                            placeholder="e.g., Bachelor of Science, Associate of Arts"
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="Field of Study"
                            value={record.field}
                            onChange={(e) => updateAcademicRecord(record.id, 'field', e.target.value)}
                            placeholder="e.g., Computer Science, Mathematics"
                            icon={<BookOpen size={16} />}
                          />
                          <Input
                            label="GPA"
                            value={record.gpa}
                            onChange={(e) => updateAcademicRecord(record.id, 'gpa', e.target.value)}
                            placeholder="e.g., 3.8"
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="Start Date"
                            type="date"
                            value={record.startDate}
                            onChange={(e) => updateAcademicRecord(record.id, 'startDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <Input
                            label="End Date"
                            type="date"
                            value={record.endDate}
                            onChange={(e) => updateAcademicRecord(record.id, 'endDate', e.target.value)}
                            icon={<Calendar size={16} />}
                          />
                          <Input
                            label="Honors/Awards"
                            value={record.honors}
                            onChange={(e) => updateAcademicRecord(record.id, 'honors', e.target.value)}
                            placeholder="e.g., Dean's List, Magna Cum Laude"
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="Thesis/Capstone"
                            value={record.thesis || ''}
                            onChange={(e) => updateAcademicRecord(record.id, 'thesis', e.target.value)}
                            placeholder="Title of thesis or capstone project"
                            icon={<BookOpen size={16} />}
                          />
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">{record.degree} in {record.field}</h3>
                          <p className="text-blue-600 font-medium">{record.institution}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(record.startDate).getFullYear()} - {new Date(record.endDate).getFullYear()}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                            <span><strong>GPA:</strong> {record.gpa}</span>
                            {record.honors && <span><strong>Honors:</strong> {record.honors}</span>}
                          </div>
                          {record.thesis && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600"><strong>Thesis:</strong> {record.thesis}</p>
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
                        onClick={() => removeAcademicRecord(record.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                    )}
                  </div>

                  {!isEditing && record.relevantCourses.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.relevantCourses.map((course, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'courses' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Course History</CardTitle>
            {isEditing && (
              <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={addCourse}>
                Add Course
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentInfo.courses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            label="Course Code"
                            value={course.courseCode}
                            onChange={(e) => updateCourse(course.id, 'courseCode', e.target.value)}
                            placeholder="e.g., CS 301"
                            icon={<BookOpen size={16} />}
                          />
                          <div className="md:col-span-2">
                            <Input
                              label="Course Name"
                              value={course.courseName}
                              onChange={(e) => updateCourse(course.id, 'courseName', e.target.value)}
                              placeholder="e.g., Advanced Data Structures"
                              icon={<BookOpen size={16} />}
                            />
                          </div>
                          <Input
                            label="Instructor"
                            value={course.instructor}
                            onChange={(e) => updateCourse(course.id, 'instructor', e.target.value)}
                            placeholder="e.g., Dr. Smith"
                            icon={<User size={16} />}
                          />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Semester
                            </label>
                            <select
                              value={course.semester}
                              onChange={(e) => updateCourse(course.id, 'semester', e.target.value)}
                              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select Semester</option>
                              <option value="Spring">Spring</option>
                              <option value="Summer">Summer</option>
                              <option value="Fall">Fall</option>
                              <option value="Winter">Winter</option>
                            </select>
                          </div>
                          <Input
                            label="Year"
                            value={course.year}
                            onChange={(e) => updateCourse(course.id, 'year', e.target.value)}
                            placeholder="e.g., 2024"
                            icon={<Calendar size={16} />}
                          />
                          <Input
                            label="Grade"
                            value={course.grade}
                            onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                            placeholder="e.g., A, B+, C"
                            icon={<Award size={16} />}
                          />
                          <Input
                            label="Credits"
                            type="number"
                            value={course.credits.toString()}
                            onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                            placeholder="e.g., 3"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{course.courseCode}: {course.courseName}</h3>
                            <p className="text-sm text-gray-600">{course.instructor}</p>
                            <p className="text-sm text-gray-500">{course.semester} {course.year} • {course.credits} credits</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeCourse(course.id)}
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
                  <p className="text-sm text-gray-500">Receive email updates about assignments and announcements</p>
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
                    Language
                  </label>
                  <select
                    value={currentInfo.preferences.language}
                    onChange={(e) => updatePreferences('language', e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={currentInfo.preferences.timezone}
                    onChange={(e) => updatePreferences('timezone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Academic Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">126</div>
              <div className="text-sm text-gray-600">Credits Earned</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3.8</div>
              <div className="text-sm text-gray-600">Current GPA</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <div className="text-sm text-gray-600">Program Progress</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">15</div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;