import ProjectPage from '../components/ProjectPage';
import type { ExtendedProjectData } from '../components/ProjectPage';
import { projects as projectsData } from '../data/projects';

// INSTRUCTIONS:
// 1. Copy this entire file to src/projects/[PROJECT_SLUG].tsx (e.g., total-warfare.tsx, etc.)
// 2. Replace [PROJECT_SLUG] in the function name and project find with your actual project slug
// 3. Fill in all the placeholder content marked with "ADD ..." or "REPLACE ..."
// 4. Remove any sections you don't need by deleting the entire property (e.g., if no videos, remove the videos array)
// 5. Add as many code snippets as you want - each project can have different amounts

export default function TotalWarfare() {
    const baseProject = projectsData.find(p => p.slug === 'total-warfare');
    if (!baseProject) return <div>Project not found</div>;

    // Extended project data with additional details for this specific project
    const projectData: ExtendedProjectData = {
        ...baseProject,
        longDescription: "This project was my first experience with online multiplayer game development using Photon Pun 2. I was creating a sci-fi themed 3rd person RTS game with working online multiplayer where players could build bases, gather resources, and use their armies to defeat the enemy. I was able to implement some core gameplay mechanics, such as building placement and ordering units. However, due to time constraints, the project was not completed and remains a work in progress.",
        date: "March - April 2024",
        duration: "5 weeks",
        teamSize: "1",
        role: "Solo Developer",
        features: [
            "Online multiplayer using Photon PUN 2",
            "Real-Time Strategy (RTS) style unit movement and commands",
            "Basic building placement system",
            "Fog of war implementation"
        ],
        tools: ["Unity", "C#", "URP", "Photon Pun 2"],
        images: [],
        videos: ["https://youtu.be/cpAd7SIUvVU?si=YsqBbw2HBgq9YtpU"],
        challenges: [
            "Implementing online multiplayer where players can place objects while playing.",
            "Networking players so that they cannot see each other unless visible in the fog."
        ],
        learnings: [
            "Gained experience with the Photon PUN 2 framework for multiplayer games.",
            "Learned fundamental concepts of network authority and state synchronization.",
            "Developed a deeper understanding of the challenges in designing and building RTS games."
        ],
        codeSnippets: [
            {
                title: "Placeholder: Building Placement System",
                description: "This is a placeholder code snippet. The code below demonstrates the logic for placing buildings in the game world, a core mechanic of the RTS gameplay. It would typically involve raycasting, grid validation, and network instantiation.",
                language: "csharp",
                code: `public class BuildingPlacementSystem : MonoBehaviour
{
    // [SerializeField] private GameObject buildingPrefab;
    
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            // 1. Raycast from camera to the ground
            // 2. Check if the placement is valid (e.g., not on a steep slope, not overlapping)
            // 3. If valid, instantiate the building locally
            // 4. Send an RPC to other players to instantiate the building on their clients
            Debug.Log("Placeholder for building placement logic.");
        }
    }
}`
            }
        ]
    };

    return <ProjectPage projectData={projectData} />;
}
