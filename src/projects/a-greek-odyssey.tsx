import ProjectPage from '../components/ProjectPage';
import type { ExtendedProjectData } from '../components/ProjectPage';
import { projects as projectsData } from '../data/projects';

// INSTRUCTIONS:
// 1. Copy this entire file to src/projects/[PROJECT_SLUG].tsx (e.g., total-warfare.tsx, etc.)
// 2. Replace [PROJECT_SLUG] in the function name and project find with your actual project slug
// 3. Fill in all the placeholder content marked with "ADD ..." or "REPLACE ..."
// 4. Remove any sections you don't need by deleting the entire property (e.g., if no videos, remove the videos array)
// 5. Add as many code snippets as you want - each project can have different amounts

export default function AGreekOdyssey() {
    const baseProject = projectsData.find(p => p.slug === 'a-greek-odyssey');
    if (!baseProject) return <div>Project not found</div>;

    // Extended project data with additional details for this specific project
    const projectData: ExtendedProjectData = {
        ...baseProject,
        longDescription: "This project was my first time creating a complete game from scratch within a team of developers and artists. I was responsible for the multiplayer functionality since I had some experience with Photon Pun 2. The game is a Mario Party inspired game where players compete in various mini-games to collect coins and ambrosia, the one with the most ambrosia wins.",
        date: "To be updated",
        duration: "To be updated",
        teamSize: "To be updated",
        role: "To be updated",
        features: [
            "Mario Party-inspired social multiplayer gameplay",
            "Multiplayer functionality implemented with Photon Pun 2",
            "Collection of diverse mini-games with unique mechanics",
            "Coin and ambrosia collection system with victory conditions"
        ],
        tools: ["Unity", "C#", "URP", "Photon Pun 2"],
        images: ["/assets/images/greek.png"],
        videos: [],
        challenges: [
            "Implementing robust and synchronized multiplayer functionality for various mini-games.",
            "Balancing mini-game fairness and player engagement to ensure a fun experience for all.",
            "Coordinating development efforts within a multidisciplinary team to deliver a cohesive game."
        ],
        learnings: [
            "Gained comprehensive experience across the full game development lifecycle within a team.",
            "Deepened understanding of multiplayer game design principles and Photon Pun 2 implementation.",
            "Developed skills in creating engaging and balanced mini-game mechanics for social play."
        ],
        codeSnippets: [
            {
                title: "Placeholder: Multiplayer Minigame Synchronization",
                description: "This is a placeholder code snippet. It would illustrate how a specific mini-game's state is synchronized across the network using Photon Pun 2, ensuring all players experience the same events simultaneously.",
                language: "csharp",
                code: `
public class MinigameManager : MonoBehaviourPunCallbacks
{
    // [PunRPC]
    // void SyncMinigameState(int state, float timer)
    // {
    //     // Logic to update minigame state on all clients
    //     Debug.Log("Placeholder for minigame synchronization logic.");
    // }
    
    // void StartMinigame()
    // {
    //     if (PhotonNetwork.IsMasterClient)
    //     {
    //         // photonView.RPC("SyncMinigameState", RpcTarget.All, initial_state, initial_timer);
    //     }
    // }
}
`
            }
        ]
    };

    return <ProjectPage projectData={projectData} />;
}
