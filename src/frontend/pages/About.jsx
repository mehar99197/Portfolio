import React, { useState, useEffect, memo, useMemo } from 'react';

const About = memo(() => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = useMemo(() => {
    if (process.env.NODE_ENV === 'production') {
      return import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/skills`
        : 'https://your-backend-api-url.com/api/skills'; // User will need to update this later
    }
    return window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api/skills'
      : `http://${window.location.hostname}:5000/api/skills`;
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.success) setSkills(data.skills);
      } catch {}
      setLoading(false);
    };
    fetchSkills();
  }, [apiUrl]);

  const getColorByCategory = (category) => {
    const colors = {
      'Frontend': 'text-blue-500',
      'Backend': 'text-green-600',
      'Database': 'text-purple-500',
      'Tools': 'text-orange-500',
      'Other': 'text-gray-400'
    };
    return colors[category] || 'text-green-400';
  };

  return (
    <section id="about" className="min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-green-400">Me</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
             I am a <span className="font-bold  text-green-500  ">Computer Scientist</span> with a strong foundation in programming, logical thinking, and core computer science concepts. Alongside my studies, I work as a Web Developer, building responsive, scalable, and user-focused web applications using modern technologies.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
             I enjoy solving problems, writing clean and maintainable code, and turning ideas into real-world digital solutions. I am continuously improving my skills in software development, algorithms, and system design to grow as a well-rounded engineer.
            </p>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-3">
            Skills & <span className="text-green-400">Technologies</span>
          </h3>
          <p className="text-base sm:text-lg text-gray-400">Technologies I work with</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading skills...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No skills added yet.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800 pb-4">
              <div className="flex gap-4 sm:gap-6 min-w-max px-2">
                {skills.map((skill, index) => (
                  <div
                    key={skill._id}
                    className="bg-gray-800 p-4 sm:p-6 rounded-xl text-center hover:shadow-2xl hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-2 w-32 sm:w-36 flex-shrink-0"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className={`text-4xl sm:text-5xl md:text-6xl ${getColorByCategory(skill.category)} mx-auto mb-2 sm:mb-3 flex items-center justify-center`}>
                      {skill.icon ? (
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                        />
                      ) : (
                        '⚡'
                      )}
                    </div>
                    <p className="font-semibold text-white text-xs sm:text-sm md:text-base">{skill.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{skill.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16">
          <div className="bg-gray-800 p-6 sm:p-8 rounded-xl text-center hover:bg-gray-750 transition-colors duration-300">
            <h4 className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">1+</h4>
            <p className="text-gray-300 text-base sm:text-lg">Years Experience</p>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8 rounded-xl text-center hover:bg-gray-750 transition-colors duration-300">
            <h4 className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">5+</h4>
            <p className="text-gray-300 text-base sm:text-lg">Projects Completed</p>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8 rounded-xl text-center hover:bg-gray-750 transition-colors duration-300">
            <h4 className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">100%</h4>
            <p className="text-gray-300 text-base sm:text-lg">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
