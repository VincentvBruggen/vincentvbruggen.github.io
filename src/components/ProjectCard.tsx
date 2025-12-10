import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
    background: ${({ theme }) => theme.colors.cardBg};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    height: 100%; // Ensure cards take full height of grid cell

    &:hover {
        transform: translateY(-5px);
    }
`;

const Placeholder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${ ({ theme }) => theme.colors.secondary}20; /* 20 is for alpha transparency */
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    font-weight: bold;
    border-radius: 12px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    position: relative;

    img, video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Content = styled.div`
    padding: ${({ theme }) => theme.spacing.medium};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const Title = styled.h3`
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.small};
    color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textDark};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    flex-grow: 1;
`;

const TechList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.small};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TechItem = styled.li`
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: 0.8rem;
    background: ${({ theme }) => theme.colors.primary}20; /* 20 is for alpha transparency */
    color: ${({ theme }) => theme.colors.primary};
    padding: 3px 8px;
    border-radius: 5px;
`;

const Links = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.medium};
    margin-top: auto; /* Pushes to the bottom */

    a {
        color: ${({ theme }) => theme.colors.text};
        font-size: 1.5rem;
        &:hover {
            color: ${({ theme }) => theme.colors.secondary};
        }
    }
`;


export interface ProjectCardProps {
    slug: string;
    order: number;
    title: string;
    description: string;
    image: string; // URL to an image or GIF
    tech: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageClassName?: string; // Optional class for custom styling
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ slug, title, description, image, tech, githubUrl, liveUrl, imageClassName }) => {
    return (
        <Link to={`/projects/${slug}`} style={{ textDecoration: 'none' }}>
            <Card>
                <ImageWrapper>
                {image
                ? (image.endsWith('.mp4') || image.endsWith('.webm')
                    ? <video src={image} autoPlay loop muted playsInline/>
                    : <img src={image || "/assets/images/project1.png"} alt={title} className={imageClassName}/>)
                : <Placeholder>{title}</Placeholder>
                }
                </ImageWrapper>
                <Content>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                    <TechList>
                    {tech.map(t => <TechItem key={t}>{t}</TechItem>)}
                    </TechList>
                    <Links>
                    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer"><FaGithub/></a>}
                    {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt/></a>}
                    </Links>
                </Content>
            </Card>
        </Link>
    );
};