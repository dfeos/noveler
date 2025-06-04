import { useState, useEffect } from 'react';
import { Project } from '../types';

export const useDraft = (initialContent = '') => {
    const [draft, setDraft] = useState(initialContent);

    const saveDraft = () => {
        localStorage.setItem('novelDraft', draft);
    };

    useEffect(() => {
        const savedDraft = localStorage.getItem('novelDraft');
        if (savedDraft) {
            setDraft(savedDraft);
        }
    }, []);

    return {
        draft,
        setDraft,
        saveDraft,
    };
};

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const addProject = (project: Project) => {
        setProjects((prevProjects) => [...prevProjects, project]);
    };

    const deleteProject = (projectId: string) => {
        setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
    };

    useEffect(() => {
        // Load projects from localStorage on mount
        const savedProjects = localStorage.getItem('novelProjects');
        if (savedProjects) {
            try {
                const parsedProjects = JSON.parse(savedProjects);
                setProjects(parsedProjects);
            } catch (error) {
                console.error('Error parsing saved projects:', error);
            }
        }
    }, []);

    useEffect(() => {
        // Save projects to localStorage whenever projects change
        localStorage.setItem('novelProjects', JSON.stringify(projects));
    }, [projects]);

    return {
        projects,
        addProject,
        deleteProject,
    };
};