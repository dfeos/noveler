import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks';
import { Container, Text, Button, Card, Icon } from '../ui-library';
import './dashboard.css';

const Dashboard = () => {
    const { projects, deleteProject } = useProjects();

    return (
        <Container className="dashboard">
            <Text variant="h1">Your Novel Projects</Text>
            <Container>
                {projects.map(project => (
                    <Card key={project.id} hoverable>
                        <Container className="project-item">
                            <Link to={`/project/${project.id}`}>
                                <Text variant="h3">{project.title}</Text>
                            </Link>
                            <Button 
                                onClick={() => deleteProject(project.id)} 
                                variant="danger" 
                                size="sm"
                                aria-label="Delete Project"
                            >
                                <Icon name="🗑️" />
                            </Button>
                        </Container>
                    </Card>
                ))}
            </Container>
            <Button as={Link} to="/new-project" variant="primary">
                <Icon name="➕" /> Create New Project
            </Button>
        </Container>
    );
};

export default Dashboard;