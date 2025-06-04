import React from 'react';
import Welcome from '../components/Welcome';
import IntegratedEditor from '../components/Editor/IntegratedEditor';

interface HomePageProps {
    currentProject: any;
    selectedChapter: any;
    onSave?: (chapters: any[]) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
    currentProject, 
    selectedChapter, 
    onSave 
}) => {
    // If no project is selected, show welcome screen
    if (!currentProject) {
        return <Welcome />;
    }

    // If project is selected but no chapter, show chapter selection message
    if (!selectedChapter) {
        return (
            <div style={{ 
                padding: '2rem', 
                textAlign: 'center',
                color: '#6c757d',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <h2 style={{ marginBottom: '1rem' }}>Welcome to {currentProject.title}</h2>
                <p>Select a chapter from the sidebar to start writing, or create a new chapter.</p>
            </div>
        );
    }

    // Show the editor for the selected chapter
    return (
        <div style={{ height: '100%', overflow: 'hidden' }}>
            <IntegratedEditor
                key={selectedChapter.id}
                initialChapters={[selectedChapter]}
                onSave={(chapters) => {
                    if (onSave) {
                        onSave(chapters);
                    }
                }}
                autoSave={true}
                autoSaveDelay={2000}
            />
        </div>
    );
};

export default HomePage;