import React from 'react';
import Editor from '../components/Editor';
import { Container, Text } from '../ui-library';

const ProjectPage = () => {
    return (
        <Container>
            <Text variant="h1">Edit Your Novel Project</Text>
            <Editor />
        </Container>
    );
};

export default ProjectPage;