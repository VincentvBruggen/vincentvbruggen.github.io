import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export interface ProjectPageProps {
    title: string;
    description: string;
    image: string;
    tech: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const Layout = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const TechList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const TechItem = styled.li`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 5px 10px;
  border-radius: 5px;
`;

const Links = styled.div`
  margin-top: 20px;
  a {
    margin: 0 10px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const ProjectLayout: React.FC<ProjectPageProps> = ({ title, description, image, tech, githubUrl, liveUrl }) => (
    <Layout>
        <h1>{title}</h1>
        <Image src={image} alt={title} />
        <p>{description}</p>
        <TechList>
            {tech.map((t, index) => (
                <TechItem key={index}>{t}</TechItem>
            ))}
        </TechList>
        <Links>
            {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
            )}
            {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                </a>
            )}
        </Links>
    </Layout>
);