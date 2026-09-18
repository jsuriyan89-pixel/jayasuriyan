import React, { useState, useEffect } from 'react';
import { ExternalLink, Eye, ArrowRight, GitFork, Star, FolderGit2, Loader2, RefreshCw } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData, personalInfo } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'github'
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repoError, setRepoError] = useState(null);

  // Extract username from personalInfo.github (e.g. 'jsuriyan89-pixel')
  const githubUsername = personalInfo.github ? personalInfo.github.split('/').filter(Boolean).pop() : 'jsuriyan89-pixel';

  const fetchGithubRepos = async () => {
    setLoadingRepos(true);
    setRepoError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`);
      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setGithubRepos(data);
      } else {
        setGithubRepos([]);
      }
    } catch (err) {
      console.error('Error fetching GitHub repos:', err);
      setRepoError('Unable to load live GitHub repositories at the moment.');
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'github' && githubRepos.length === 0) {
      fetchGithubRepos();
    }
  }, [activeTab]);

  return (
    <section id="projects" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
              <span>● SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
              Projects & Code
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${personalInfo.github}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
            >
              <span>GITHUB PROFILE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation: Featured vs Live GitHub */}
        <div className="flex items-center gap-3 mb-10 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'featured'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Featured Highlights ({projectsData.length})
          </button>
          
          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'github'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <GithubIcon className="w-4 h-4" />
            <span>Live GitHub Repos</span>
            {githubRepos.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeTab === 'github' ? 'bg-black text-amber-400' : 'bg-slate-800 text-slate-300'}`}>
                {githubRepos.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: Featured Projects */}
        {activeTab === 'featured' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl overflow-hidden bg-[#0c0e15] border border-amber-500/20 hover:border-amber-500 transition-all duration-300 transform hover:-translate-y-2 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-500 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                      {project.summary}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400"
                  >
                    <Eye className="w-4 h-4" />
                    <span>DETAILS</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 border border-slate-800 transition-colors"
                      title="View GitHub Repository"
                      aria-label="GitHub Code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900 text-amber-500 hover:bg-amber-500 hover:text-black border border-slate-800 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Live GitHub Repos */}
        {activeTab === 'github' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Showing live public repositories from <span className="text-amber-400 font-bold">github.com/{githubUsername}</span>
              </p>
              <button
                onClick={fetchGithubRepos}
                disabled={loadingRepos}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingRepos ? 'animate-spin text-amber-500' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {loadingRepos && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-3" />
                <p className="text-sm font-mono text-slate-400">Fetching live repositories from GitHub...</p>
              </div>
            )}

            {repoError && (
              <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center font-mono text-sm mb-6">
                <p>{repoError}</p>
                <p className="text-xs text-slate-400 mt-2">
                  Visit your profile directly at{' '}
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-amber-400 underline">
                    {personalInfo.github}
                  </a>
                </p>
              </div>
            )}

            {!loadingRepos && githubRepos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="p-6 rounded-2xl bg-[#0c0e15] border border-slate-800/80 hover:border-amber-500/70 transition-all duration-300 transform hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      {/* Repo Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <FolderGit2 className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                          <h4 className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors text-base truncate max-w-[200px]">
                            {repo.name}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                          {repo.visibility || 'public'}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3">
                        {repo.description || 'Python / ML application repository.'}
                      </p>
                    </div>

                    {/* Repo Meta & Link */}
                    <div>
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-4 pt-3 border-t border-slate-900">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500/80" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-slate-500" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-black border border-slate-800 hover:border-amber-500 text-xs font-bold text-slate-200 transition-all group/btn"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>VIEW ON GITHUB</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal Dialog */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
