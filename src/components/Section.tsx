import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled(motion.section)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 600);
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
}

interface SectionProps {
    id: string;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, children }) => {
    const isMobile = useIsMobile();

    return (
        <SectionWrapper
            id={id}
            initial={ { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.16 }}
            transition={isMobile ? { duration: 0.6 } : { duration: 0.6 }}
        >
            {children}
        </SectionWrapper>
    );
};