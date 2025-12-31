import React, { useEffect, useState, memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaSignOutAlt, FaProjectDiagram, FaLightbulb, FaPlus, FaEdit, FaTrash, FaTimes, FaGithub, FaExternalLinkAlt, FaLock, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

const Dashboard = memo(() => {
  const { user, logout, loading, token } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    github: '',
    live: ''
  });
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    level: 'Intermediate',
    icon: ''
  });
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    bio: '',
    profilePicture: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (user) {
      setProfileForm({
        name: user.name || '',
        bio: user.bio || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user, loading, navigate]);

  const apiUrl = useMemo(() => 'http://localhost:5000/api', []);

  const handlePasswordChange = useCallback(async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setPasswordMessage({ type: '', text: '' }), 5000);
      } else {
        setPasswordMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    }
  }, [passwordForm, apiUrl, token]);

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchSkills();
    }
  }, [user]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/projects`);
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      
    }
  }, [apiUrl]);

  const fetchSkills = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/skills`);
      const data = await response.json();
      if (data.success) {
        setSkills(data.skills);
      }
    } catch (error) {
      
    }
  }, [apiUrl]);

  const handleProjectSubmit = useCallback(async (e) => {
    e.preventDefault();
    const url = editingProject 
      ? `${apiUrl}/projects/${editingProject._id}` 
      : `${apiUrl}/projects`;
    const method = editingProject ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...projectForm,
          technologies: projectForm.technologies.split(',').map(t => t.trim())
        })
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchProjects();
        setShowProjectForm(false);
        setEditingProject(null);
        setProjectForm({ title: '', description: '', technologies: '', image: '', github: '', live: '' });
      }
    } catch (error) {
      alert('Error saving project');
    }
  }, [editingProject, apiUrl, token, projectForm, fetchProjects]);

  const handleSkillImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSkillForm(prev => ({...prev, icon: reader.result}));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (PNG, JPG, etc.)');
    }
  }, []);

  const handleProfilePictureChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({...prev, profilePicture: reader.result}));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (PNG, JPG, etc.)');
    }
  }, []);

  const handleProfileUpdate = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      const data = await response.json();
      if (data.success) {
        alert('Profile updated successfully!');
        setShowProfileForm(false);
        window.location.reload();
      }
    } catch (error) {
      alert('Error updating profile');
    }
  }, [apiUrl, token, profileForm]);

  const handleSkillSubmit = useCallback(async (e) => {
    e.preventDefault();
    const url = editingSkill 
      ? `${apiUrl}/skills/${editingSkill._id}` 
      : `${apiUrl}/skills`;
    const method = editingSkill ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(skillForm)
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchSkills();
        setShowSkillForm(false);
        setEditingSkill(null);
        setSkillForm({ name: '', category: 'Frontend', level: 'Intermediate', icon: '' });
      }
    } catch (error) {
      alert('Error saving skill');
    }
  }, [editingSkill, apiUrl, token, skillForm, fetchSkills]);

  const deleteProject = useCallback(async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`${apiUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchProjects();
      }
    } catch (error) {
      alert('Error deleting project');
    }
  }, [apiUrl, token, fetchProjects]);

  const deleteSkill = useCallback(async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      const response = await fetch(`${apiUrl}/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchSkills();
      }
    } catch (error) {
      alert('Error deleting skill');
    }
  }, [apiUrl, token, fetchSkills]);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-6 md:p-8 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative group">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-green-500"
                  />
                ) : (
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center border-2 border-green-500">
                    <span className="text-2xl md:text-3xl font-bold text-white">{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    setProfileForm({
                      name: user.name,
                      bio: user.bio || '',
                      profilePicture: user.profilePicture || ''
                    });
                    setShowProfileForm(true);
                  }}
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Edit Profile"
                >
                  <FaEdit />
                </button>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-400">Manage your portfolio content</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <FaProjectDiagram className="text-3xl text-blue-500" />
              </div>
              <span className="text-3xl font-bold text-white">{projects.length}</span>
            </div>
            <h3 className="text-gray-400 text-sm">Total Projects</h3>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <FaLightbulb className="text-3xl text-green-500" />
              </div>
              <span className="text-3xl font-bold text-white">{skills.length}</span>
            </div>
            <h3 className="text-gray-400 text-sm">Total Skills</h3>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <FaUser className="text-3xl text-purple-500" />
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{user.role}</p>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">Account Type</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'overview' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'projects' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'skills' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'settings' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
                  <FaUser className="text-2xl text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white font-semibold">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
                  <FaEnvelope className="text-2xl text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-semibold">{user.email}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                View Portfolio
              </button>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => { setActiveTab('projects'); setShowProjectForm(true); }}
                  className="w-full p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition flex items-center justify-between"
                >
                  <span>Add New Project</span>
                  <FaPlus className="text-green-400" />
                </button>
                <button
                  onClick={() => { setActiveTab('skills'); setShowSkillForm(true); }}
                  className="w-full p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition flex items-center justify-between"
                >
                  <span>Add New Skill</span>
                  <FaPlus className="text-green-400" />
                </button>
              </div>
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                <p className="text-green-400 text-sm">
                  💡 <strong>Tip:</strong> Keep your portfolio updated regularly to showcase your latest work!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
              <button
                onClick={() => setShowProjectForm(true)}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
              >
                <FaPlus /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { 
                        setEditingProject(project); 
                        setProjectForm({ 
                          ...project, 
                          technologies: project.technologies.join(', ') 
                        }); 
                        setShowProjectForm(true); 
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
              <button
                onClick={() => setShowSkillForm(true)}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
              >
                <FaPlus /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skills.map(skill => (
                <div key={skill._id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      {skill.icon && (
                        <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
                      )}
                      <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                    </div>
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{skill.level}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { 
                        setEditingSkill(skill); 
                        setSkillForm(skill); 
                        setShowSkillForm(true); 
                      }}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                      <FaEdit className="inline" />
                    </button>
                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                    >
                      <FaTrash className="inline" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <FaLock className="text-3xl text-green-400" />
                <h2 className="text-2xl font-bold text-white">Change Password</h2>
              </div>

              {passwordMessage.text && (
                <div className={`mb-6 p-4 rounded-lg ${
                  passwordMessage.type === 'success' 
                    ? 'bg-green-500/10 border border-green-500 text-green-500' 
                    : 'bg-red-500/10 border border-red-500 text-red-500'
                }`}>
                  {passwordMessage.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-white font-medium mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      id="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                    >
                      {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-white font-medium mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      id="newPassword"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      placeholder="Enter new password (min 6 characters)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                    >
                      {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      id="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                    >
                      {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        )}

        {showProjectForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button onClick={() => { setShowProjectForm(false); setEditingProject(null); setProjectForm({ title: '', description: '', technologies: '', image: '', github: '', live: '' }); }} className="text-gray-400 hover:text-white">
                  <FaTimes className="text-2xl" />
                </button>
              </div>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg h-24"
                  required
                />
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={projectForm.github}
                  onChange={(e) => setProjectForm({...projectForm, github: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                />
                <input
                  type="url"
                  placeholder="Live Demo URL"
                  value={projectForm.live}
                  onChange={(e) => setProjectForm({...projectForm, live: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                />
                <button type="submit" className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </form>
            </div>
          </div>
        )}

        {showSkillForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button onClick={() => { setShowSkillForm(false); setEditingSkill(null); setSkillForm({ name: '', category: 'Frontend', level: 'Intermediate', icon: '' }); }} className="text-gray-400 hover:text-white">
                  <FaTimes className="text-2xl" />
                </button>
              </div>
              <form onSubmit={handleSkillSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                  required
                />
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({...skillForm, level: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <div>
                  <label className="block text-gray-300 mb-2">Skill Icon (PNG/JPG)</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                    onChange={handleSkillImageChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 file:cursor-pointer"
                  />
                  {skillForm.icon && (
                    <div className="mt-3 flex items-center gap-3">
                      <img src={skillForm.icon} alt="Preview" className="w-16 h-16 object-contain bg-white/10 rounded-lg p-2" />
                      <button
                        type="button"
                        onClick={() => setSkillForm({...skillForm, icon: ''})}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
              </form>
            </div>
          </div>
        )}

        {showProfileForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                <button onClick={() => setShowProfileForm(false)} className="text-gray-400 hover:text-white">
                  <FaTimes className="text-2xl" />
                </button>
              </div>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleProfilePictureChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                  />
                  {profileForm.profilePicture && (
                    <div className="mt-3 flex items-center gap-3">
                      <img src={profileForm.profilePicture} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-blue-500" />
                      <button
                        type="button"
                        onClick={() => setProfileForm({...profileForm, profilePicture: ''})}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove Picture
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                  required
                />
                <textarea
                  placeholder="Bio (optional)"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
                  rows="3"
                  maxLength="500"
                />
                <button type="submit" className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Dashboard;
