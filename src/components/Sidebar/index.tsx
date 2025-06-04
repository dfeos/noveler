import React, { useState, useEffect } from 'react';
import { Project, Chapter, Character } from '../../types';
import { Button, Text, Input, Label, Modal, Card, Icon, Container, Banner, TextEditor } from '../../ui-library';
import './sidebar.css';

interface SidebarProps {
    currentProject?: Project;
    onProjectSelect: (project: Project) => void;
    onProjectCreate: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onProjectDelete: (projectId: string) => void;
    onChapterSelect: (chapter: Chapter) => void;
    onChapterCreate: (chapter: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onChapterDelete: (chapterId: string) => void;
    onCharacterSelect: (character: Character) => void;
    onCharacterCreate: (character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCharacterUpdate: (character: Character) => void;
    onCharacterDelete: (characterId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    currentProject,
    onProjectSelect,
    onProjectCreate,
    onProjectDelete,
    onChapterSelect,
    onChapterCreate,
    onChapterDelete,
    onCharacterSelect,
    onCharacterCreate,
    onCharacterUpdate,
    onCharacterDelete
}) => {
    const [activeTab, setActiveTab] = useState<'projects' | 'chapters' | 'characters'>('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showChapterForm, setShowChapterForm] = useState(false);
    const [showCharacterForm, setShowCharacterForm] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Load projects from localStorage
    useEffect(() => {
        const savedProjects = localStorage.getItem('novel-projects');
        if (savedProjects) {
            try {
                const parsedProjects = JSON.parse(savedProjects);
                setProjects(parsedProjects);
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        }
    }, []);

    // Save projects to localStorage
    useEffect(() => {
        localStorage.setItem('novel-projects', JSON.stringify(projects));
    }, [projects]);

    const handleCreateProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newProject: Project = {
            ...projectData,
            id: `project-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        setProjects(prev => [...prev, newProject]);
        onProjectCreate(projectData);
        setShowProjectForm(false);
    };

    const handleDeleteProject = (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            setProjects(prev => prev.filter(p => p.id !== projectId));
            onProjectDelete(projectId);
        }
    };

    const handleCreateChapter = (chapterData: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!currentProject) return;
        
        const newChapter: Chapter = {
            ...chapterData,
            id: `chapter-${Date.now()}`,
            projectId: currentProject.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        onChapterCreate(chapterData);
        setShowChapterForm(false);
    };

    const handleCreateCharacter = (characterData: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!currentProject) return;
        
        const newCharacter: Character = {
            ...characterData,
            id: `character-${Date.now()}`,
            projectId: currentProject.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        onCharacterCreate(characterData);
        setShowCharacterForm(false);
    };

    const filteredCharacters = currentProject?.characters?.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.role.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const getCharacterIcon = (role: Character['role']) => {
        switch (role) {
            case 'protagonist': return '🦸';
            case 'antagonist': return '🦹';
            case 'supporting': return '👥';
            case 'minor': return '👤';
            default: return '👤';
        }
    };

    return (
        <Container className="sidebar" as="aside">
            <Container className="sidebar-header">
                <Text variant="h2" color="primary">Novel Writer</Text>
                <Container className="sidebar-tabs">
                    <Button 
                        variant={activeTab === 'projects' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setActiveTab('projects')}
                    >
                        <Icon name="📚" /> Projects
                    </Button>
                    <Button 
                        variant={activeTab === 'chapters' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setActiveTab('chapters')}
                        disabled={!currentProject}
                    >
                        <Icon name="📖" /> Chapters
                    </Button>
                    <Button 
                        variant={activeTab === 'characters' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setActiveTab('characters')}
                        disabled={!currentProject}
                    >
                        <Icon name="👥" /> Characters
                    </Button>
                </Container>
            </Container>

            <Container className="sidebar-content">
                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <Container className="projects-section">
                        <Container className="section-header">
                            <Text variant="h3">Projects</Text>
                            <Button 
                                variant="primary"
                                size="sm"
                                onClick={() => setShowProjectForm(true)}
                                aria-label="Create New Project"
                            >
                                <Icon name="➕" />
                            </Button>
                        </Container>
                        
                        <Container className="projects-list">
                            {projects.map(project => (
                                <div 
                                    key={project.id} 
                                    className={`project-item ${currentProject?.id === project.id ? 'active' : ''}`}
                                    onClick={() => onProjectSelect(project)}
                                >
                                    <Card hoverable>
                                        <Container className="project-info">
                                            <Text variant="h4">{project.title}</Text>
                                            <Text variant="p" color="muted">{project.description || 'No description'}</Text>
                                            <Container className="project-stats">
                                                <Text variant="small">{project.chapters?.length || 0} chapters</Text>
                                                <Text variant="small">{project.characters?.length || 0} characters</Text>
                                            </Container>
                                        </Container>
                                        <Button 
                                            variant="danger"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteProject(project.id);
                                            }}
                                            aria-label="Delete Project"
                                        >
                                            <Icon name="🗑️" />
                                        </Button>
                                    </Card>
                                </div>
                            ))}
                        </Container>
                    </Container>
                )}

                {/* Chapters Tab */}
                {activeTab === 'chapters' && currentProject && (
                    <Container className="chapters-section">
                        <Container className="section-header">
                            <Text variant="h3">Chapters</Text>
                            <Button 
                                variant="primary"
                                size="sm"
                                onClick={() => setShowChapterForm(true)}
                                aria-label="Create New Chapter"
                            >
                                <Icon name="➕" />
                            </Button>
                        </Container>
                        
                        <Container className="chapters-list">
                            {currentProject.chapters?.map((chapter, index) => (
                                <div 
                                    key={chapter.id}
                                    className="chapter-item"
                                    onClick={() => onChapterSelect(chapter)}
                                >
                                    <Card hoverable>
                                        <Container className="chapter-info">
                                            <Text variant="h4" className="chapter-number">{index + 1}</Text>
                                            <Container>
                                                <Text variant="h4">{chapter.title}</Text>
                                                <Text variant="small" color="muted">{chapter.wordCount} words</Text>
                                            </Container>
                                        </Container>
                                        <Button 
                                            variant="danger"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onChapterDelete(chapter.id);
                                            }}
                                            aria-label="Delete Chapter"
                                        >
                                            <Icon name="🗑️" />
                                        </Button>
                                    </Card>
                                </div>
                            ))}
                        </Container>
                    </Container>
                )}

                {/* Characters Tab */}
                {activeTab === 'characters' && currentProject && (
                    <Container className="characters-section">
                        <Container className="section-header">
                            <Text variant="h3">Characters</Text>
                            <Button 
                                variant="primary"
                                size="sm"
                                onClick={() => setShowCharacterForm(true)}
                                aria-label="Create New Character"
                            >
                                <Icon name="➕" />
                            </Button>
                        </Container>
                        
                        <Container className="search-box">
                            <Input
                                type="text"
                                placeholder="Search characters..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </Container>
                        
                        <Container className="characters-list">
                            {filteredCharacters.map(character => (
                                <div 
                                    key={character.id}
                                    className={`character-item ${selectedCharacter?.id === character.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCharacter(character);
                                        onCharacterSelect(character);
                                    }}
                                >
                                    <Card hoverable>
                                        <Container className="character-avatar">
                                            {character.imageUrl ? (
                                                <img src={character.imageUrl} alt={character.name} />
                                            ) : (
                                                <Icon name={getCharacterIcon(character.role)} className="character-icon" />
                                            )}
                                        </Container>
                                        <Container className="character-info">
                                            <Text variant="h4">{character.name}</Text>
                                            <Text variant="small" className={`role-badge ${character.role}`}>
                                                {character.role}
                                            </Text>
                                            {character.age && <Text variant="small">Age: {character.age}</Text>}
                                            <Text variant="small" className="character-description" color="muted">
                                                {character.description.length > 50 
                                                    ? `${character.description.substring(0, 50)}...`
                                                    : character.description
                                                }
                                            </Text>
                                        </Container>
                                        <Button 
                                            variant="danger"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCharacterDelete(character.id);
                                            }}
                                            aria-label="Delete Character"
                                        >
                                            <Icon name="🗑️" />
                                        </Button>
                                    </Card>
                                </div>
                            ))}
                        </Container>
                    </Container>
                )}
        </Container>

        {/* Modals */}
            {showProjectForm && (
                <ProjectForm 
                    onSubmit={handleCreateProject}
                    onCancel={() => setShowProjectForm(false)}
                />
            )}

            {showChapterForm && (
                <ChapterForm 
                    onSubmit={handleCreateChapter}
                    onCancel={() => setShowChapterForm(false)}
                    projectId={currentProject?.id || ''}
                />
            )}

            {showCharacterForm && (
                <CharacterForm 
                    onSubmit={handleCreateCharacter}
                    onCancel={() => setShowCharacterForm(false)}
                    projectId={currentProject?.id || ''}
                />
            )}
        </Container>
    );
};

// Project Form Component
interface ProjectFormProps {
    onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            content: '',
            chapters: [],
            characters: [],
            settings: {
                theme: 'light',
                fontSize: 14,
                fontFamily: 'Arial',
                lineHeight: 1.6,
                autoSave: true
            }
        });
    };

    return (
        <Modal isOpen={true} onClose={onCancel} title="Create New Project" size="md">
            <form onSubmit={handleSubmit}>
                <Container className="form-group">
                    <Label htmlFor="project-title" required>Title</Label>
                    <Input
                        id="project-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter project title..."
                        required
                    />
                </Container>
                <Container className="form-group">
                    <Label htmlFor="project-description">Description</Label>
                    <TextEditor
                        value={description}
                        onChange={(value) => setDescription(value)}
                        placeholder="Enter project description..."
                        minHeight="100px"
                    />
                </Container>
                <Container className="form-actions">
                    <Button type="button" onClick={onCancel} variant="secondary">Cancel</Button>
                    <Button type="submit" variant="primary">Create Project</Button>
                </Container>
            </form>
        </Modal>
    );
};

// Chapter Form Component
interface ChapterFormProps {
    onSubmit: (chapter: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    projectId: string;
}

const ChapterForm: React.FC<ChapterFormProps> = ({ onSubmit, onCancel, projectId }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title: title.trim(),
            content: '',
            wordCount: 0,
            order: 0,
            projectId
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create New Chapter</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="chapter-title">Title *</label>
                        <input
                            id="chapter-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter chapter title..."
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onCancel}>Cancel</button>
                        <button type="submit">Create Chapter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Character Form Component
interface CharacterFormProps {
    onSubmit: (character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    projectId: string;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, onCancel, projectId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [appearance, setAppearance] = useState('');
    const [personality, setPersonality] = useState('');
    const [background, setBackground] = useState('');
    const [role, setRole] = useState<Character['role']>('supporting');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        onSubmit({
            name: name.trim(),
            description: description.trim(),
            age: age ? parseInt(age) : undefined,
            appearance: appearance.trim() || undefined,
            personality: personality.trim() || undefined,
            background: background.trim() || undefined,
            role,
            notes: notes.trim() || undefined,
            projectId
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content character-form">
                <h3>Create New Character</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="character-name">Name *</label>
                            <input
                                id="character-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Character name..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="character-age">Age</label>
                            <input
                                id="character-age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Age..."
                                min="0"
                                max="200"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="character-role">Role *</label>
                        <select
                            id="character-role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as Character['role'])}
                            required
                        >
                            <option value="protagonist">Protagonist</option>
                            <option value="antagonist">Antagonist</option>
                            <option value="supporting">Supporting</option>
                            <option value="minor">Minor</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="character-description">Description *</label>
                        <textarea
                            id="character-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief character description..."
                            rows={2}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="character-appearance">Appearance</label>
                        <textarea
                            id="character-appearance"
                            value={appearance}
                            onChange={(e) => setAppearance(e.target.value)}
                            placeholder="Physical appearance..."
                            rows={2}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="character-personality">Personality</label>
                        <textarea
                            id="character-personality"
                            value={personality}
                            onChange={(e) => setPersonality(e.target.value)}
                            placeholder="Personality traits..."
                            rows={2}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="character-background">Background</label>
                        <textarea
                            id="character-background"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            placeholder="Character background and history..."
                            rows={2}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="character-notes">Notes</label>
                        <textarea
                            id="character-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Additional notes..."
                            rows={2}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel}>Cancel</button>
                        <button type="submit">Create Character</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sidebar;