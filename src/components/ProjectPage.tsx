import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaUsers, FaClock, FaChevronDown, FaChevronUp, FaCode } from 'react-icons/fa';

// Base project data interface (from your JSON)
export interface BaseProject {
    id: string;
    title: string;
    description: string;
    image: string;
    tech: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageClassName?: string;
}

// Code snippet interface
export interface CodeSnippet {
    title: string;
    description?: string;
    code: string;
    language: string; // e.g., 'csharp', 'javascript', 'typescript'
    image?: string;   // Optional image to go with the code
    video?: string;   // Optional video to go with the code
}

// Extended project data interface for detailed pages
export interface ExtendedProjectData extends BaseProject {
    longDescription?: string;
    features?: string[];
    challenges?: string[];
    learnings?: string[];
    images?: string[];      // Additional images/screenshots
    videos?: string[];      // Video URLs
    duration?: string;      // e.g., "2 months"
    teamSize?: string;      // e.g., "5 developers, 3 artists"
    date?: string;          // e.g., "Spring 2023"
    role?: string;          // e.g., "Lead Gameplay Programmer"
    tools?: string[];       // Additional tools beyond main tech stack
    codeSnippets?: CodeSnippet[]; // Array of code snippets with toggle functionality
}

interface ProjectPageProps {
    projectData: ExtendedProjectData;
}

const CodeToggle: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <CodeToggleWrapper>
            <CodeToggleHeader onClick={() => setIsOpen(!isOpen)}>
                <CodeToggleTitle>
                    <FaCode /> {snippet.title}
                </CodeToggleTitle>
                <ChevronIcon>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </ChevronIcon>
            </CodeToggleHeader>
            
            <AnimatePresence>
                {isOpen && (
                    <CodeToggleContent
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CodeToggleInner>
                            {snippet.description && (
                                <CodeDescription>{snippet.description}</CodeDescription>
                            )}
                            
                            {/* Media content (image or video) */}
                            {snippet.image && (
                                <CodeMedia>
                                    <img src={snippet.image} alt={snippet.title} />
                                </CodeMedia>
                            )}
                            {snippet.video && (
                                <CodeMedia>
                                    <video src={snippet.video} controls />
                                </CodeMedia>
                            )}
                            
                            {/* Code block */}
                            <CodeBlock>
                                <CodeHeader>
                                    <CodeLanguage>{snippet.language}</CodeLanguage>
                                </CodeHeader>
                                <CodeContent>
                                    <pre><code>{snippet.code}</code></pre>
                                </CodeContent>
                            </CodeBlock>
                        </CodeToggleInner>
                    </CodeToggleContent>
                )}
            </AnimatePresence>
        </CodeToggleWrapper>
    );
};

export default function ProjectPage({ projectData }: ProjectPageProps) {
    const {
        title,
        description,
        longDescription,
        image,
        images = [],
        videos = [],
        tech,
        features,
        challenges,
        learnings,
        githubUrl,
        liveUrl,
        duration,
        teamSize,
        date,
        role,
        tools,
        codeSnippets = []
    } = projectData;

    return (
        <PageContainer>
            {/* Header */}
            <Header>
                <BackButton to="/">
                    <FaArrowLeft /> Back to Portfolio
                </BackButton>
            </Header>

            <ProjectContent>
                {/* Hero Section */}
                <HeroSection>
                    <HeroImage>
                        {image ? (
                            image.endsWith('.mp4') || image.endsWith('.webm') ? (
                                <video src={image} autoPlay loop muted playsInline />
                            ) : (
                                <img src={image} alt={title} />
                            )
                        ) : (
                            <ImagePlaceholder>{title}</ImagePlaceholder>
                        )}
                    </HeroImage>
                    <HeroContent>
                        <ProjectTitle>{title}</ProjectTitle>
                        <ProjectMeta>
                            {date && (
                                <MetaItem>
                                    <FaCalendar /> {date}
                                </MetaItem>
                            )}
                            {duration && (
                                <MetaItem>
                                    <FaClock /> {duration}
                                </MetaItem>
                            )}
                            {teamSize && (
                                <MetaItem>
                                    <FaUsers /> {teamSize}
                                </MetaItem>
                            )}
                        </ProjectMeta>
                        {role && <Role>Role: {role}</Role>}
                    </HeroContent>
                </HeroSection>

                {/* Main Content */}
                <MainContent>
                    {/* Description */}
                    <Section>
                        <SectionTitle>About This Project</SectionTitle>
                        <Description>{longDescription || description}</Description>
                    </Section>

                    {/* Tech Stack */}
                    <Section>
                        <SectionTitle>Technologies Used</SectionTitle>
                        <TechGrid>
                            {/*{tech.map((technology, index) => (*/}
                            {/*    <TechItem key={index} $primary>*/}
                            {/*        {technology}*/}
                            {/*    </TechItem>*/}
                            {/*))}*/}
                            {tools && tools.map((tool, index) => (
                                <TechItem key={`tool-${index}`}>
                                    {tool}
                                </TechItem>
                            ))}
                        </TechGrid>
                    </Section>

                    {/* Features */}
                    {features && features.length > 0 && (
                        <Section>
                            <SectionTitle>Key Features</SectionTitle>
                            <FeaturesList>
                                {features.map((feature, index) => (
                                    <FeatureItem key={index}>
                                        <FeatureBullet>•</FeatureBullet> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                        </Section>
                    )}

                    {/* Additional Media */}
                    {(images.length > 0 || videos.length > 0) && (
                        <Section>
                            <SectionTitle>Screenshots & Media</SectionTitle>
                            <MediaGrid>
                                {images.map((img, index) => (
                                    <MediaItem key={index}>
                                        <img src={img} alt={`${title} screenshot ${index + 1}`} />
                                    </MediaItem>
                                ))}
                                {videos.map((video, index) => (
                                    <MediaItem key={`video-${index}`}>
                                        <video src={video} controls />
                                    </MediaItem>
                                ))}
                            </MediaGrid>
                        </Section>
                    )}

                    {/* Code Snippets */}
                    {codeSnippets.length > 0 && (
                        <Section>
                            <SectionTitle>Code Implementation</SectionTitle>
                            <CodeSnippetsContainer>
                                {codeSnippets.map((snippet, index) => (
                                    <CodeToggle key={index} snippet={snippet} />
                                ))}
                            </CodeSnippetsContainer>
                        </Section>
                    )}

                    {/* Challenges */}
                    {challenges && challenges.length > 0 && (
                        <Section>
                            <SectionTitle>Technical Challenges</SectionTitle>
                            <ChallengesList>
                                {challenges.map((challenge, index) => (
                                    <ChallengeItem key={index}>
                                        <ChallengeBullet>•</ChallengeBullet> {challenge}
                                    </ChallengeItem>
                                ))}
                            </ChallengesList>
                        </Section>
                    )}

                    {/* Learnings */}
                    {learnings && learnings.length > 0 && (
                        <Section>
                            <SectionTitle>What I Learned</SectionTitle>
                            <LearningsList>
                                {learnings.map((learning, index) => (
                                    <LearningItem key={index}>
                                        <LearningBullet>•</LearningBullet> {learning}
                                    </LearningItem>
                                ))}
                            </LearningsList>
                        </Section>
                    )}

                    {/* Links */}
                    <Section>
                        <SectionTitle>Project Links</SectionTitle>
                        <ProjectLinks>
                            {githubUrl && (
                                <ProjectLink href={githubUrl} target="_blank" rel="noopener noreferrer">
                                    <FaGithub /> View Source Code
                                </ProjectLink>
                            )}
                            {liveUrl && (
                                <ProjectLink href={liveUrl} target="_blank" rel="noopener noreferrer">
                                    <FaExternalLinkAlt /> Play Game
                                </ProjectLink>
                            )}
                        </ProjectLinks>
                    </Section>
                </MainContent>
            </ProjectContent>
        </PageContainer>
    );
}

// === STYLED COMPONENTS ===

const PageContainer = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding-top: 60px; /* Account for fixed header */
`;

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: ${({ theme }) => theme.colors.background}99;
    backdrop-filter: blur(10px);
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 0 ${({ theme }) => theme.spacing.medium};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

const BackButton = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.small};
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.code};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    
    &:hover {
        color: ${({ theme }) => theme.colors.secondary};
        text-shadow: 0 0 10px ${({ theme }) => theme.colors.secondary};
    }
`;

const ProjectContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.large};
    
    @media (max-width: 600px) {
        padding: ${({ theme }) => theme.spacing.medium};
    }
`;

const HeroSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.large};
    align-items: center;
    margin-bottom: 80px;
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        text-align: center;
        gap: ${({ theme }) => theme.spacing.medium};
    }
`;

const HeroImage = styled.div`
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    
    img, video {
        width: 100%;
        height: auto;
        display: block;
    }
`;

const ImagePlaceholder = styled.div`
    aspect-ratio: 16/9;
    background: ${({ theme }) => theme.colors.cardBg};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textDark};
`;

const HeroContent = styled.div`
    @media (max-width: 900px) {
        order: -1;
    }
`;

const ProjectTitle = styled.h1`
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    color: ${({ theme }) => theme.colors.text};
    text-shadow: none;
`;

const ProjectMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.medium};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    
    @media (max-width: 600px) {
        justify-content: center;
    }
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.small};
    font-family: ${({ theme }) => theme.fonts.code};
    color: ${({ theme }) => theme.colors.textDark};
    font-size: 0.9rem;
`;

const Role = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 60px;
`;

const Section = styled.div`
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary}20;
        padding-bottom: 40px;
    }
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.large};
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 3px;
        background: ${({ theme }) => theme.colors.secondary};
        box-shadow: 0 0 8px ${({ theme }) => theme.colors.secondary};
    }
`;

const Description = styled.p`
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textDark};
    max-width: 800px;
`;

const TechGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.small};
`;

const TechItem = styled.span<{ $primary?: boolean }>`
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: 0.9rem;
    padding: 6px 12px;
    border-radius: 5px;
    background: ${({ theme, $primary }) => 
        $primary ? theme.colors.primary + '20' : theme.colors.cardBg};
    color: ${({ theme, $primary }) => 
        $primary ? theme.colors.primary : theme.colors.textDark};
    border: 1px solid ${({ theme, $primary }) => 
        $primary ? theme.colors.primary + '40' : theme.colors.textDark + '20'};
`;

const FeaturesList = styled.ul`
    list-style: none;
    display: grid;
    gap: ${({ theme }) => theme.spacing.small};
    max-width: 800px;
`;

const FeatureItem = styled.li`
    color: ${({ theme }) => theme.colors.textDark};
    line-height: 1.5;
`;

const FeatureBullet = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.small};
`;

const MediaGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.medium};
`;

const MediaItem = styled.div`
    border-radius: 8px;
    overflow: hidden;
    
    img, video {
        width: 100%;
        height: auto;
        display: block;
    }
`;

const CodeSnippetsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.medium};
`;

const CodeToggleWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.primary}20;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.cardBg};
    overflow: hidden;
`;

const CodeToggleHeader = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.medium};
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background: ${({ theme }) => theme.colors.primary}10;
    }
`;

const CodeToggleTitle = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.small};
    font-family: ${({ theme }) => theme.fonts.code};
    font-weight: bold;
    font-size: 1.1rem;
`;

const ChevronIcon = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    transition: transform 0.3s ease;
`;

const CodeToggleContent = styled(motion.div)`
    overflow: hidden;
`;

const CodeToggleInner = styled.div`
    padding: 0 ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.medium};
`;

const CodeDescription = styled.p`
    color: ${({ theme }) => theme.colors.textDark};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    line-height: 1.6;
`;

const CodeMedia = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    border-radius: 6px;
    overflow: hidden;
    
    img, video {
        width: 100%;
        height: auto;
        display: block;
    }
`;

const CodeBlock = styled.div`
    background: #1a1a2e;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.primary}30;
`;

const CodeHeader = styled.div`
    background: ${({ theme }) => theme.colors.primary}20;
    padding: 8px ${({ theme }) => theme.spacing.medium};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary}30;
`;

const CodeLanguage = styled.span`
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
    font-weight: bold;
`;

const CodeContent = styled.div`
    padding: ${({ theme }) => theme.spacing.medium};
    overflow-x: auto;
    
    pre {
        margin: 0;
        font-family: ${({ theme }) => theme.fonts.code};
        font-size: 0.9rem;
        line-height: 1.5;
        
        code {
            color: ${({ theme }) => theme.colors.text};
            white-space: pre;
        }
    }
`;

const ChallengesList = styled.ul`
    list-style: none;
    display: grid;
    gap: ${({ theme }) => theme.spacing.small};
    max-width: 800px;
`;

const ChallengeItem = styled.li`
    color: ${({ theme }) => theme.colors.textDark};
    line-height: 1.5;
`;

const ChallengeBullet = styled.span`
    color: ${({ theme }) => theme.colors.secondary};
    margin-right: ${({ theme }) => theme.spacing.small};
`;

const LearningsList = styled.ul`
    list-style: none;
    display: grid;
    gap: ${({ theme }) => theme.spacing.small};
    max-width: 800px;
`;

const LearningItem = styled.li`
    color: ${({ theme }) => theme.colors.textDark};
    line-height: 1.5;
`;

const LearningBullet = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.small};
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.medium};
    flex-wrap: wrap;
`;

const ProjectLink = styled.a`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.small};
    padding: 12px 24px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border-radius: 5px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.colors.secondary};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px ${({ theme }) => theme.colors.secondary}40;
    }
`;
