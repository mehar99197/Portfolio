import React, { useState, useEffect, memo, useMemo } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = memo(() => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = useMemo(() => {
    return import.meta.env.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/projects`
      : 'http://localhost:5000/api/projects';
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.success) setProjects(data.projects);
      } catch {}
      setLoading(false);
    };
    fetchProjects();
  }, [apiUrl]);

  const colors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-yellow-500 to-orange-600',
    'from-purple-500 to-pink-600'
  ];

  if (loading) {
    return (
      <section id="projects" className="min-h-screen py-16 px-4 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-green-400">Projects</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience 
            in building modern web applications.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800 pb-4">
            <div className="flex gap-6 sm:gap-8 lg:gap-10 min-w-max px-2">
              {projects.length === 0 ? (
                <div className="w-full text-center py-6">
                  <p className="text-gray-400 text-md">No projects yet.</p>
                </div>
              ) : (
                projects.map((project, index) => (
                  <div
                    key={project._id}
                    className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2 group w-80 sm:w-96 flex-shrink-0"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                    }}
                  >
                    <div className="relative h-24 sm:h-40 md:h-40 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-80`}></div>
                      <img
                        src={project.image || ''}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>

                    <div className="p-2 sm:p-4">
                      <h3 className="text-lg sm:text-md font-bold text-white mb-1 group-hover:text-green-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-700 text-green-400 rounded-full text-xs sm:text-sm font-medium hover:bg-green-400 hover:text-gray-900 transition-colors duration-300 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-5">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                          >
                            <FaGithub className="text-lg sm:text-xl" />
                            <span className="font-medium">Code</span>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 sm:px-4 py-2 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                          >
                            <FaExternalLinkAlt className="text-base sm:text-lg" />
                            <span className="font-medium">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <a
            href="https://github.com/mehar99197"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaGithub className="text-xl sm:text-2xl" />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
});

export default Projects;
