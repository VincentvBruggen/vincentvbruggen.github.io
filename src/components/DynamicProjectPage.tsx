import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import projectsData from '../data/projects.json';

// Dynamic project component loader
const DynamicProjectPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [ProjectComponent, setProjectComponent] = useState<React.ComponentType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadProject = async () => {
            if (!projectId) {
                setError('No project ID provided');
                setLoading(false);
                return;
            }

            // Check if project exists in JSON data
            const projectExists = projectsData.find(p => p.id === projectId);
            if (!projectExists) {
                setError(`Project with ID "${projectId}" not found`);
                setLoading(false);
                return;
            }

            try {
                // Try to dynamically import the project component
                const module = await import(`../projects/${projectId}.tsx`);
                setProjectComponent(() => module.default);
                setLoading(false);
            } catch (importError) {
                console.error(`Failed to load project ${projectId}:`, importError);
                setError(`Project page for "${projectId}" is not yet implemented`);
                setLoading(false);
            }
        };

        loadProject();
    }, [projectId]);

    if (loading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Loading project...</LoadingText>
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <ErrorContainer>
                <ErrorTitle>Project Not Found</ErrorTitle>
                <ErrorMessage>{error}</ErrorMessage>
                <BackButton to="/">← Back to Portfolio</BackButton>
            </ErrorContainer>
        );
    }

    if (ProjectComponent) {
        return <ProjectComponent />;
    }

    return null;
};

export default DynamicProjectPage;

// Styled components for loading and error states
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: 20px;
`;

const LoadingSpinner = styled.div`
    border: 3px solid ${({ theme }) => theme.colors.cardBg};
    border-top: 3px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
    color: ${({ theme }) => theme.colors.textDark};
    font-family: ${({ theme }) => theme.fonts.code};
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: 20px;
    text-align: center;
    padding: 40px;
`;

const ErrorTitle = styled.h1`
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
`;

const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.colors.textDark};
    font-size: 1.1rem;
    max-width: 600px;
`;

const BackButton = styled(Link)`
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.code};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 12px 24px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background};
    }
`;
