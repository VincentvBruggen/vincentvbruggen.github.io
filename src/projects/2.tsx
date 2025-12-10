import ProjectPage from '../components/ProjectPage';
import type { ExtendedProjectData } from '../components/ProjectPage';
import projectsData from '../data/projects.json';

// INSTRUCTIONS:
// 1. Copy this entire file to src/projects/[PROJECT_ID].tsx (e.g., 2.tsx, 3.tsx, etc.)
// 2. Replace [PROJECT_ID] in the function name and project find with your actual project ID
// 3. Fill in all the placeholder content marked with "ADD ..." or "REPLACE ..."
// 4. Remove any sections you don't need by deleting the entire property (e.g., if no videos, remove the videos array)
// 5. Add as many code snippets as you want - each project can have different amounts

export default function Project2() {
    const baseProject = projectsData.find(p => p.id === '2');
    if (!baseProject) return <div>Project not found</div>;

    // Extended project data with additional details for this specific project
    const projectData: ExtendedProjectData = {
        ...baseProject,
        
        // REQUIRED: Extended description - tell the full story of your project
        longDescription: `ADD DETAILED PROJECT DESCRIPTION HERE
        
        Explain what the project was about, what challenges you faced, what you learned, and what makes it special. 
        This can be multiple paragraphs and should give much more detail than the basic description from the JSON file.
        
        Talk about your development process, key decisions you made, and what you're most proud of in this project.`,
        
        // Project metadata - fill in what applies
        date: "ADD DATE HERE (e.g., 'Spring 2024', 'Fall 2023')",
        duration: "ADD DURATION HERE (e.g., '2 months', '6 weeks')",
        teamSize: "ADD TEAM SIZE HERE (e.g., '5 developers, 3 artists', 'Solo project')",
        role: "ADD YOUR ROLE HERE (e.g., 'Lead Programmer', 'Gameplay Developer')",
        
        // Key features - what makes your project special?
        features: [
            "ADD FEATURE 1 HERE",
            "ADD FEATURE 2 HERE", 
            "ADD FEATURE 3 HERE",
            "ADD MORE FEATURES AS NEEDED"
            // Remove this comment and add as many features as you want
        ],
        
        // Additional tools beyond the main tech stack
        tools: [
            "ADD ADDITIONAL TOOL 1 HERE",
            "ADD ADDITIONAL TOOL 2 HERE"
            // Remove this if no additional tools beyond main tech stack
        ],
        
        // Media files - add paths to your images and videos
        images: [
            "/assets/images/ADD_IMAGE_1_FILENAME_HERE.png",
            "/assets/images/ADD_IMAGE_2_FILENAME_HERE.png",
            "/assets/images/ADD_IMAGE_3_FILENAME_HERE.png"
            // Add as many images as you have, remove if no additional images
        ],
        
        videos: [
            "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE", // Use YouTube URL to avoid Git size limits
            "https://youtu.be/YOUR_VIDEO_ID_HERE" // Both YouTube formats work
            // Or use local paths for small videos: "/assets/videos/small-video.mp4"
            // Add as many videos as you have, remove if no videos
        ],
        
        // Technical challenges you overcame
        challenges: [
            "ADD CHALLENGE 1 HERE - describe a technical problem you had to solve",
            "ADD CHALLENGE 2 HERE - explain another difficulty you faced",
            "ADD CHALLENGE 3 HERE - mention any other obstacles"
            // Add more challenges or remove if you prefer not to include this section
        ],
        
        // What you learned from this project
        learnings: [
            "ADD LEARNING 1 HERE - what new skill or knowledge did you gain?",
            "ADD LEARNING 2 HERE - what would you do differently next time?",
            "ADD LEARNING 3 HERE - what are you most proud of learning?"
            // Add more learnings or remove if you prefer not to include this section
        ],
        
        // Code snippets - the heart of showing your technical skills
        codeSnippets: [
            {
                title: "ADD CODE SNIPPET 1 TITLE HERE",
                description: "ADD DESCRIPTION OF WHAT THIS CODE DOES AND WHY IT'S IMPORTANT",
                language: "csharp", // Change to: csharp, javascript, typescript, python, hlsl, etc.
                image: "/assets/images/ADD_IMAGE_FOR_CODE_1.png", // Optional - remove line if no image
                // video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // Optional - use YouTube URL or local path
                code: `// ADD YOUR ACTUAL CODE HERE
// This is where you paste the real code from your project
// Make sure to format it properly and include comments

public class ExampleClass : MonoBehaviour
{
    // Replace this entire code block with your actual code
    public void ExampleMethod()
    {
        Debug.Log("Replace this with your real implementation");
    }
}`
            },
            {
                title: "ADD CODE SNIPPET 2 TITLE HERE", 
                description: "ADD DESCRIPTION OF WHAT THIS CODE DOES",
                language: "csharp", // Change language as needed
                // image: "/assets/images/ADD_IMAGE_FOR_CODE_2.png", // Optional
                video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // Optional - YouTube URL or local path for small videos
                code: `// ADD YOUR SECOND CODE SNIPPET HERE
// You can have as many code snippets as you want
// Each one will be a collapsible section on your project page

using UnityEngine;

public class AnotherExample : MonoBehaviour
{
    // Replace with your actual code
    void Start()
    {
        // Your implementation here
    }
}`
            },
            {
                title: "ADD CODE SNIPPET 3 TITLE HERE",
                description: "ADD DESCRIPTION FOR THIRD CODE EXAMPLE", 
                language: "hlsl", // Example of different language
                image: "/assets/images/ADD_SHADER_EXAMPLE.png",
                code: `// Example shader code - replace with your actual shader
Shader "Custom/ExampleShader"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Color ("Color", Color) = (1,1,1,1)
    }
    
    // Replace this entire shader with your actual implementation
}`
            }
            // ADD MORE CODE SNIPPETS BY COPYING THE PATTERN ABOVE
            // Each project can have different amounts - some might have 1, others might have 10+
        ]
    };

    return <ProjectPage projectData={projectData} />;
}
