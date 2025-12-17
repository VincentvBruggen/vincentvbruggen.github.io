import ProjectPage from '../components/ProjectPage';
import type { ExtendedProjectData } from '../components/ProjectPage';
import { projects as projectsData } from '../data/projects';

// INSTRUCTIONS:
// 1. Copy this entire file to src/projects/[PROJECT_SLUG].tsx (e.g., total-warfare.tsx, etc.)
// 2. Replace [PROJECT_SLUG] in the function name and project find with your actual project slug
// 3. Fill in all the placeholder content marked with "ADD ..." or "REPLACE ..."
// 4. Remove any sections you don't need by deleting the entire property (e.g., if no videos, remove the videos array)
// 5. Add as many code snippets as you want - each project can have different amounts

export default function GandalfsMagicalAdventure() {
    const baseProject = projectsData.find(p => p.slug === 'gandalfs-magical-adventure');
    if (!baseProject) return <div>Project not found</div>;

    // Extended project data with additional details for this specific project
    const projectData: ExtendedProjectData = {
        ...baseProject,
        longDescription: "This project was my first time building a game with a team of developers and artists. I was responsible for most of the gameplay programming, including the player controller, enemy AI, and various game mechanics. The game is a 3D shoot 'em up where you play as a wizard who needs to defeat the giant spider.",
        date: "To be updated",
        duration: "To be updated",
        teamSize: "To be updated",
        role: "To be updated",
        features: [
            "3D shoot 'em up gameplay",
            "Player controller for wizard character",
            "Enemy AI for giant spider boss",
            "Various game mechanics implementation"
        ],
        tools: ["Unity", "C#", "URP", "Particle System"],
        images: ["/assets/images/gandalf.png"],
        videos: [],
        challenges: [
            "Implementing responsive and intuitive player controls in a 3D environment.",
            "Designing and balancing engaging enemy AI behavior for the giant spider.",
            "Integrating various game mechanics cohesively within the team's vision."
        ],
        learnings: [
            "Gained valuable experience working in a collaborative game development team.",
            "Enhanced skills in gameplay programming, covering player, AI, and core mechanics.",
            "Learned to adapt and contribute effectively within a multidisciplinary team of developers and artists."
        ],
        codeSnippets: [
            {
                title: "Placeholder: Player Movement Script",
                description: "This is a placeholder code snippet. It would demonstrate the core logic for the wizard's movement, including input handling and character control in 3D space.",
                language: "csharp",
                code: `
public class PlayerMovement : MonoBehaviour
{
    // [SerializeField] private float moveSpeed = 5f;
    // [SerializeField] private CharacterController controller;
    
    void Update()
    {
        // float horizontal = Input.GetAxis("Horizontal");
        // float vertical = Input.GetAxis("Vertical");
        // Vector3 move = transform.right * horizontal + transform.forward * vertical;
        // controller.Move(move * moveSpeed * Time.deltaTime);
        Debug.Log("Placeholder for player movement logic.");
    }
}
`
            }
        ]
    };

    return <ProjectPage projectData={projectData} />;
}
