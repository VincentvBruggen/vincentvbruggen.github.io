import React from 'react';
import styled from 'styled-components';
import { ProjectCard } from '../components/ProjectCard';
import { projects as projectsData } from '../data/projects';

const ProjectsSection = styled.section`
  padding: 4rem 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Projects: React.FC = () => {
  return (
    <ProjectsSection id="projects">
      <SectionTitle>My Projects</SectionTitle>
      <ProjectGrid>
        {projectsData.map(project => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </ProjectGrid>
    </ProjectsSection>
  );
};
