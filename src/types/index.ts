export interface Project {
    id: string;
    title: string;
    description?: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    chapters: Chapter[];
    characters: Character[];
    settings: ProjectSettings;
}

export interface Chapter {
    id: string;
    title: string;
    content: string;
    wordCount: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    projectId: string;
}

export interface Character {
    id: string;
    name: string;
    description: string;
    age?: number;
    appearance?: string;
    personality?: string;
    background?: string;
    role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
    notes?: string;
    imageUrl?: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectSettings {
    theme: 'light' | 'dark';
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    autoSave: boolean;
    wordTarget?: number;
    dailyGoal?: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface EditorState {
    text: string;
    formatting: {
        bold: boolean;
        italic: boolean;
        underline: boolean;
    };
    cursorPosition: number;
}