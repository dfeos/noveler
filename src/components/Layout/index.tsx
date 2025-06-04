import React, { useState, useEffect, ReactNode } from 'react';
import Sidebar from '../Sidebar';
import CharacterDetail from '../Sidebar/CharacterDetail';
import HomePage from '../../pages/index';
import UIShowcase from '../../pages/ui-showcase';
import { Project, Chapter, Character } from '../../types';
import { Button, Text, Container, Banner } from '../../ui-library';
import './layout.css';

const Layout: React.FC = () => {
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentView, setCurrentView] = useState<'editor' | 'showcase'>('editor');
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    // Load projects from localStorage on mount
    useEffect(() => {
        const savedProjects = localStorage.getItem('novel-projects');
        if (savedProjects) {
            try {
                const parsedProjects = JSON.parse(savedProjects);
                setProjects(parsedProjects);
                if (parsedProjects.length > 0) {
                    setCurrentProject(parsedProjects[0]);
                }
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        }
    }, []);

    // Save projects to localStorage when they change
    useEffect(() => {
        localStorage.setItem('novel-projects', JSON.stringify(projects));
    }, [projects]);

    const handleProjectSelect = (project: Project) => {
        setCurrentProject(project);
        setSelectedCharacter(null); // Clear character selection when switching projects
    };

    const handleProjectCreate = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newProject: Project = {
            ...projectData,
            id: `project-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        setProjects(prev => [...prev, newProject]);
        setCurrentProject(newProject);
        setShowSuccessBanner(true);
        setTimeout(() => setShowSuccessBanner(false), 3000);
    };

    const handleProjectDelete = (projectId: string) => {
        setProjects(prev => prev.filter(p => p.id !== projectId));
        if (currentProject?.id === projectId) {
            const remainingProjects = projects.filter(p => p.id !== projectId);
            setCurrentProject(remainingProjects.length > 0 ? remainingProjects[0] : null);
        }
    };

    const handleChapterSelect = (chapter: Chapter) => {
        setSelectedChapter(chapter);
        console.log('Chapter selected:', chapter);
    };

    const handleChapterCreate = (chapterData: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!currentProject) return;

        const newChapter: Chapter = {
            ...chapterData,
            id: `chapter-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const updatedProject = {
            ...currentProject,
            chapters: [...(currentProject.chapters || []), newChapter],
            updatedAt: new Date()
        };

        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p));
    };

    const handleChapterDelete = (chapterId: string) => {
        if (!currentProject) return;

        const updatedProject = {
            ...currentProject,
            chapters: currentProject.chapters?.filter(c => c.id !== chapterId) || [],
            updatedAt: new Date()
        };

        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p));
    };

    const handleChapterSave = (chapters: Chapter[]) => {
        if (!currentProject || !selectedChapter) return;
        
        // Update the selected chapter in the current project
        const updatedChapter = chapters[0]; // We pass single chapter to editor
        if (updatedChapter) {
            const updatedProject = {
                ...currentProject,
                chapters: currentProject.chapters?.map(c => 
                    c.id === selectedChapter.id ? { ...updatedChapter, updatedAt: new Date() } : c
                ) || [],
                updatedAt: new Date()
            };

            setCurrentProject(updatedProject);
            setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p));
            setSelectedChapter({ ...updatedChapter, updatedAt: new Date() });
        }
    };

    const handleCharacterSelect = (character: Character) => {
        setSelectedCharacter(character);
    };

    const handleCharacterCreate = (characterData: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!currentProject) return;

        const newCharacter: Character = {
            ...characterData,
            id: `character-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const updatedProject = {
            ...currentProject,
            characters: [...(currentProject.characters || []), newCharacter],
            updatedAt: new Date()
        };

        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p));
    };

    const handleCharacterUpdate = (updatedCharacter: Character) => {
        if (!currentProject) return;

        const updatedProject = {
            ...currentProject,
            characters: currentProject.characters?.map(c => 
                c.id === updatedCharacter.id ? { ...updatedCharacter, updatedAt: new Date() } : c
            ) || [],
            updatedAt: new Date()
        };

        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p));
        setSelectedCharacter(updatedCharacter);
    };

    const handleCharacterDelete = (characterId: string) => {
        if (!currentProject) return;

        const updatedProject = {
            ...currentProject,
            characters: currentProject.characters?.filter(c => c.id !== characterId) || [],
            updatedAt: new Date()
        };

        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p));
        
        if (selectedCharacter?.id === characterId) {
            setSelectedCharacter(null);
        }
    };

    return (
        <div className="layout">
            <header className="header">
                <Container size="full" className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Text variant="h2" className="text-white">Novel Writer</Text>
                        {currentProject && (
                            <div className="header-project-info">
                                <Text variant="body" className="text-gray-200">{currentProject.title}</Text>
                                <div className="project-stats flex space-x-4 text-sm text-gray-300">
                                    <span>{currentProject.chapters?.length || 0} chapters</span>
                                    <span>{currentProject.characters?.length || 0} characters</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Navigation */}
                    <div className="flex space-x-2">
                        <Button 
                            variant={currentView === 'editor' ? 'primary' : 'ghost'}
                            onClick={() => setCurrentView('editor')}
                            size="sm"
                        >
                            Editor
                        </Button>
                        <Button 
                            variant={currentView === 'showcase' ? 'primary' : 'ghost'}
                            onClick={() => setCurrentView('showcase')}
                            size="sm"
                        >
                            UI Showcase
                        </Button>
                    </div>
                </Container>
            </header>

            {/* Success Banner */}
            {showSuccessBanner && (
                <Banner 
                    variant="success" 
                    icon="success"
                    onDismiss={() => setShowSuccessBanner(false)}
                >
                    Project created successfully!
                </Banner>
            )}

            <div className="main-content">
                {currentView === 'editor' && (
                    <>
                        <Sidebar
                            currentProject={currentProject || undefined}
                            onProjectSelect={handleProjectSelect}
                            onProjectCreate={handleProjectCreate}
                            onProjectDelete={handleProjectDelete}
                            onChapterSelect={handleChapterSelect}
                            onChapterCreate={handleChapterCreate}
                            onChapterDelete={handleChapterDelete}
                            onCharacterSelect={handleCharacterSelect}
                            onCharacterCreate={handleCharacterCreate}
                            onCharacterUpdate={handleCharacterUpdate}
                            onCharacterDelete={handleCharacterDelete}
                        />
                        <main className="content">
                            <HomePage 
                                currentProject={currentProject}
                                selectedChapter={selectedChapter}
                                onSave={handleChapterSave}
                            />
                        </main>
                    </>
                )}
                
                {currentView === 'showcase' && (
                    <main className="content" style={{ width: '100%', overflow: 'auto' }}>
                        <UIShowcase />
                    </main>
                )}
            </div>
            
            {/* Character Detail Panel */}
            {selectedCharacter && currentView === 'editor' && (
                <CharacterDetail
                    character={selectedCharacter}
                    onUpdate={handleCharacterUpdate}
                    onClose={() => setSelectedCharacter(null)}
                />
            )}
        </div>
    );
};

export default Layout;