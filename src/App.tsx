import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Section } from './components/Section';
import { ProjectCard, type ProjectCardProps } from './components/ProjectCard';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Icons
import { FaUnity, FaLinkedin, FaGithub, FaBars, FaTimes, FaItchIo, FaCubes } from 'react-icons/fa';
import { SiSharp} from 'react-icons/si';

// Assets
import profilePic from './assets/images/profile.jpg';
import otherPic from './assets/images/prayingProfile.jpg';
// import project1Gif from './assets/images/project1.gif';
// import project2Img from './assets/images/project2.png';

// Theming & Particles (Same as before)
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import { useCallback } from 'react';
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

// Data
import { projects as projectsData } from './data/projects';
import DynamicProjectPage from './components/DynamicProjectPage';
import { GlobalStyle } from './styles/GlobalStyle';

// === Main App Component ===
export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const particlesInit = useCallback(async (engine: Engine) => { await loadSlim(engine); }, []);
    const particleOptions = { /* ... (same particle config from previous answer) ... */ };

    // --- YOUR NARRATIVE DATA ---
    // Frame your projects as solutions or learning experiences
    // Sort projects by order field (lower numbers appear first)
    const projects: ProjectCardProps[] = [...projectsData].sort((a, b) => a.order - b.order);
    return (
        <ThemeProvider theme={theme}>
        <GlobalStyle />
            <BrowserRouter>
                <Particles id="tsparticles" init={particlesInit} options={particleOptions}/>

                {/* --- HEADER --- */}
                <Header>
                    <HomeButton href="#hero">
                        <img src={profilePic} alt="Home"/>
                    </HomeButton>
                    <MobileMenuButton onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes/> : <FaBars/>}
                    </MobileMenuButton>
                    <Nav $open={menuOpen}>
                        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                        <a href="#projects" onClick={() => setMenuOpen(false)}>My Work</a>
                        <a href="#philosophy" onClick={() => setMenuOpen(false)}>Philosophy</a>
                        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                    </Nav>
                </Header>

                <Routes>
                    <Route path="/" element={
                        <MainContent>
                            <HeroSection id="hero">
                                <HeroContent>
                                    <h3>Hi, my name is</h3>
                                    <h1>Vincent</h1>
                                    <h2>Creating fun and immersive gameplay from concept to launch.</h2>
                                    <p>I am a game developer that specializes in Gameplay Development. Building engaging
                                        experiences from concept up to reality.</p>
                                    <CTAButton href="#about">Learn More</CTAButton>
                                </HeroContent>
                            </HeroSection>

                            {/* --- ABOUT SECTION (THE PITCH) --- */}
                            <Section id="about">
                                <SectionTitle>About Me</SectionTitle>
                                <AboutContainer>
                                    <AboutText>
                                        <p>
                                            Hello! I am Vincent, a developer with a love for creating fun mechanics,
                                            interesting
                                            systems and entertaining experiences. My journey began with a curiosity for
                                            how
                                            games are made, starting off with simple games using basic web development
                                            and a
                                            Unity tutorial. Doing this I discovered my passion for game development and
                                            the
                                            joy
                                            of bringing ideas to life through code.
                                        </p>
                                        <br/>
                                        <p>
                                            I believe the best games are built by collaborative teams where good
                                            communication
                                            is key. I thrive in environments where I can both contribute my technical
                                            skills
                                            and
                                            learn from other creative minds. My goal is to join a team that focuses on
                                            creating
                                            fun and entertaining gameplay experiences, where I can continue to grow as a
                                            developer and in future create my own games.
                                        </p>
                                        <ul>
                                            <li><span role="img" aria-label="brain">🧠</span> Problem solving</li>
                                            <li><span role="img" aria-label="people">👥</span> Collaborative</li>
                                            <li><span role="img" aria-label="speech">💬</span> Communicative</li>
                                        </ul>
                                    </AboutText>
                                    <AboutImageContainer>
                                        <img className="main" src={profilePic} alt="Vincent alternate"/>
                                        <img className="hover" src={otherPic} alt="Vincent"/>
                                    </AboutImageContainer>
                                </AboutContainer>
                            </Section>

                            {/* --- PROJECTS SECTION (THE PROOF) --- */}
                            <Section id="projects">
                                <SectionTitle>My Work</SectionTitle>
                                <ProjectsGrid>
                                    {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
                                </ProjectsGrid>
                            </Section>

                            {/* --- PHILOSOPHY SECTION (THE HOW) --- */}
                            <Section id="philosophy">
                                <SectionTitle>My Philosophy & Toolkit</SectionTitle>
                                <PhilosophyGrid>
                                    <PhilosophyCard>
                                        <PhilosophyIcon><FaUnity/></PhilosophyIcon>
                                        <h3>Engine Expertise</h3>
                                        <p>I use Unity and I am learning to use Godot to bring ideas to life. Very
                                            comfortable
                                            with Unity to create systems for: Gameplay, UI, and learning Multiplayer and
                                            AI</p>
                                    </PhilosophyCard>
                                    <PhilosophyCard>
                                        <PhilosophyIcon><SiSharp/></PhilosophyIcon>
                                        <h3>Logic & Language</h3>
                                        <p>C# is my primary tool for building performant, and scalable game logic. I
                                            write
                                            clean, maintainable code using concepts such as DRY so that my teammates can
                                            easily
                                            understand and build upon my code.</p>
                                    </PhilosophyCard>
                                    <PhilosophyCard>
                                        <PhilosophyIcon><FaCubes/></PhilosophyIcon>
                                        <h3>From Concept to Creation</h3>
                                        <p>I am comfortable working with different software, using tools like Blender
                                            for
                                            prototyping and Git for version control to ensure a smooth, collaborative
                                            workflow
                                            from the first commit to the final build.</p>
                                    </PhilosophyCard>
                                </PhilosophyGrid>
                            </Section>

                            {/* --- CONTACT SECTION (THE INVITATION) --- */}
                            <Section id="contact">
                                <SectionTitle>Let's Connect</SectionTitle>
                                <ContactText>
                                    I'm currently looking for new opportunities to create amazing games with a
                                    passionate
                                    team.
                                    If you think I'd be a good fit, I'd love to hear from you.
                                </ContactText>
                                <ContactEmail
                                    href="mailto:vincent.vanbruggen@kpnmail.nl">vincent.vanbruggen@kpnmail.nl</ContactEmail>
                                <SocialLinks>
                                    <a href="https://github.com/VincentvBruggen" target="_blank"
                                       rel="noopener noreferrer"><FaGithub/></a>
                                    <a href="https://www.linkedin.com/in/vincent-van-bruggen/" target="_blank"
                                       rel="noopener noreferrer"><FaLinkedin/></a>
                                    <a href="https://nt4p.itch.io/" target="_blank"
                                       rel="noopener noreferrer"><FaItchIo/></a>
                                </SocialLinks>
                            </Section>
                        </MainContent>
                    }/>
                    <Route path="/projects/:slug" element={<DynamicProjectPage/>}/>
                </Routes>
            </BrowserRouter>

        </ThemeProvider>
    );
}

// === STYLED COMPONENTS FOR App.tsx ===

const MainContent = styled.main`
    display: flex;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 120px;
    padding: 0 24px 120px 24px;
    padding-top: 1vh;

    @media (max-width: 600px) {
        gap: 40px;
        padding: 0 8px 60px 8px;
        padding-top: 80px;
    }
`;

const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.textDark};
    position: absolute;
    right: 24px;
    top: 14px;
    z-index: 200;

    @media (max-width: 600px) {
        display: block;
    }
`;

// ... The rest of the styled-components are exactly the same as the previous response ...
const Header = styled.header`
    position: fixed;
    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    padding: ${({ theme }) => theme.spacing.small} 0;
    background: ${({ theme }) => theme.colors.background}99;
    backdrop-filter: blur(10px);
    z-index: 100;
    justify-content: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    @media (max-width: 600px) {
        padding: ${({ theme }) => theme.spacing.small} 24px;
        justify-content: flex-start;
    }
`;

const Nav = styled.nav<{ $open?: boolean }>`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.medium};
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    transition: max-height 0.3s ease, opacity 0.3s ease;

    @media (max-width: 600px) {
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background: ${({ theme }) => theme.colors.background}ee;
        flex-direction: column;
        align-items: center;
        gap: ${({ theme }) => theme.spacing.small};
        max-height: ${({ $open }) => ($open ? '300px' : '0')};
        opacity: ${({ $open }) => ($open ? '1' : '0')};
        overflow: hidden;
        pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
        z-index: 150;
    }

    a {
        font-family: ${({ theme }) => theme.fonts.code};
        color: ${({ theme }) => theme.colors.textDark};
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 8px 16px;
        border-radius: 5px;
        transition: all 0.3s ease;

        &:hover {
            color: ${({ theme }) => theme.colors.background};
            background-color: ${({ theme }) => theme.colors.primary};
            text-shadow: none;
        }

        @media (max-width: 600px) {
            font-size: 0.7rem;
        }
    }
`;

const HomeButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 24px;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        transition: border-color 0.2s;
    }
    &:hover img {
        border-color: ${({ theme }) => theme.colors.secondary};
    }
    @media (max-width: 600px) {
        margin-left: 0;
        height: 40px;
        width: 40px;
    }
`;

const HeroSection = styled.section`
    margin-top: 4vh;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    
    @media (max-aspect-ratio: 3/4) {
        min-height: 40vh;
    }
    @media (max-width: 600px) {
        scroll-margin-top: 1000px;
    }
`;

// All other styled-components (HeroContent, CTAButton, SectionTitle, etc.)
// can remain as they were in the previous code block.
// The single change in MainContent is what resolves the centering issue.
const HeroContent = styled.div`
  max-width: 80%;
  h3 {
    font-family: ${({ theme }) => theme.fonts.code};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    font-weight: 400;
  }
  h1 {
      font-size: clamp(32px, 10vw, 60px);
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.1;
    margin: 0;
    text-shadow: none;
  }
  h2 {
      font-size: clamp(24px, 6vw, 32px);
    color: ${({ theme }) => theme.colors.textDark};
    line-height: 1.1;
    text-shadow: none;
  }
  p {
      margin-top: 20px;
      max-width: 500px;
      color: ${({ theme }) => theme.colors.textDark};
  }

    @media (max-width: 600px) {
        max-width: 100%;
        h3, h1, h2, p {
            text-align: center;
        }
        h2{
            margin-top: 1vh;
            margin-bottom: 2vh;
        }
        p{
            margin-top: 1vh;
        }
    }
        
        
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.large};
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
  }

    @media (max-width: 600px) {
        display: block;
        margin-left: 20vw;
        margin-right: 20vw;
        text-align: center;
    }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.secondary};
  }
`;

const AboutContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 50px;
    align-items: flex-start;
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 30px;
    }
`;

const AboutText = styled.div`
    p { line-height: 1.6; }
    ul {
        margin-top: 20px;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(2, minmax(140px, 200px));
        gap: 10px;
        li {
            font-family: ${({ theme }) => theme.fonts.code};
            span {
                color: ${({ theme }) => theme.colors.primary};
                margin-right: 10px;
            }
        }
    }
`;

const AboutImageContainer = styled.div`
    position: relative;
    max-width: 300px;
    aspect-ratio: 2/3;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        transition: opacity 1s ease;
    }
    img.main {
        opacity: 1;
    }
    img.hover {
        opacity: 0;
    }
    &:hover img.main {
        opacity: 0;
    }
    &:hover img.hover {
        opacity: 1;
    }
    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        top: 15px;
        left: 15px;
        z-index: 1;
        transition: all 0.3s ease-in-out;
    }
    &:hover::after { top: 10px; left: 10px; }
    @media (max-width: 768px) { margin: 50px auto 0; }
`;

const PhilosophyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.large};
`;

const PhilosophyCard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    padding: 30px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid transparent;
    transition: all 0.3s ease;
    &:hover {
        transform: translateY(-5px);
        border-color: ${({ theme }) => theme.colors.primary};
    }
    h3 {
        margin: 20px 0 10px;
        color: ${({ theme }) => theme.colors.text};
        text-shadow: none;
    }
    p {
        color: ${({ theme }) => theme.colors.textDark};
        font-size: 0.9rem;
    }
`;

const PhilosophyIcon = styled.div`
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
`;

const ProjectsGrid = styled.div`
    display: grid;
    flex-wrap: wrap;
    min-width: 0;
    min-height: 0;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.large};

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing.medium};
    }
`;

const ContactText = styled.p`
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.1rem;
`;

const ContactEmail = styled.a`
    display: block;
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing.large};
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: 1.5rem;
    font-weight: bold;
    
    
`;

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
    a {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.textDark};
        &:hover { color: ${({ theme }) => theme.colors.primary}; }
    }
`;