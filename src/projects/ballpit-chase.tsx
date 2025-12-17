import ProjectPage from '../components/ProjectPage';
import type { ExtendedProjectData } from '../components/ProjectPage';
import { projects as projectsData } from '../data/projects';

export default function BallpitChase() {
    const baseProject = projectsData.find(p => p.slug === 'ballpit-chase');
    if (!baseProject) return <div>Project not found</div>;

    // Extended project data with additional details for this specific project
    const projectData: ExtendedProjectData = {
        ...baseProject,
        longDescription:
        "Ballpit Chase was my first actual venture into local multiplayer game development in which I used Unity's new Input System to achieve a smooth and responsive gameplay experience. " +
        "Ballpit Chase is a 4-player local multiplayer game where players play tag in a vibrant ball pit arena. " +
        "Each player controls a colorful character trying to avoid being tagged by the assigned tagger, navigating through obstacles and interactive elements." +
        "The game features dynamic arenas, smooth character controls, and engaging visual feedback for a better game feel. ",

        date: "November - December 2024",
        duration: "4 weeks",
        teamSize: "2 developers, 3 artists",
        role: "Lead Gameplay Programmer",
        
        features: [
            "4-player local multiplayer using Unity's Input System",
            "Dynamic arena with interactive elements and obstacles",
            "Smooth character controller with responsive movement",
            "Visual feedback system for player states (tagged/safe)",
            "Countdown timer with tension-building audio cues",
            "Custom shader effects for player highlighting and various other effects"
        ],
        
        tools: ["Unity", "C#", "URP", "Shader Graph", "VFX Graph", "Input System"],
        
        images: [
           "/projectAssets/1/images/BallpitScreenshot1.png",
           "/projectAssets/1/images/BallpitScreenshot2.png",
           "/projectAssets/1/images/BallpitScreenshot3.png",
            "/projectAssets/1/images/BallpitScreenshot4.png",
            "/projectAssets/1/images/BallpitScreenshot5.png"
        ],
        
        videos: [
            "https://youtu.be/uPHAsQa7ArY?si=MnfodplQverjYHCx"
        ],
        
        challenges: [
            "Mastering Unity's new Input System for local multiplayer controls",
            "Ensuring fair gameplay mechanics where players appropriately gain buffs and debuffs",
            "Creating intuitive visual feedback that works with the chaos of multiplayer action"
        ],
        
        learnings: [
            "Mastered Unity's Input System and its advantages over the legacy Input Manager",
            "Gained experience in local multiplayer game design and balancing",
            "Learned the importance of playtesting with real players early and often",
            "Developed skills in creating visual effects using the VFX Graph and Shader Graph"
        ],
        
        codeSnippets: [
            {
                title: "Player Tagging Mechanic",
                description: "This script handles the core tagging mechanic, which the entire game revolves around. When a player is tagged, they become the new tagger and are stunned. The old tagger gains a speed buff, and visual effects occur to indicate the tagger change.",
                language: "csharp",
                video: "/projectAssets/1/videos/tagged.gif", // Keep GIF as-is, or replace with YouTube URL if needed
                code:
                `
                     private void OnCollisionEnter(Collision collision)
                    {
                        PlayerManager otherPlayer = collision.collider.GetComponent<PlayerManager>();
                        if (isTagger && !stunned)
                        {
                            if (collision.collider.CompareTag("Player"))
                            {
                                isTagger = false;
                                StartCoroutine(RunAwayBuff());
                                FindObjectOfType<AudioManager>().Play("Tag");
                                StartCoroutine(otherPlayer.Tagged());
                            }
                        }
                
                        if (collision.gameObject.CompareTag("Ladder"))
                        {
                            anim.SetTrigger("Ladder");
                        }
                    }
                    
                    public IEnumerator RunAwayBuff()
                    {
                        SpeedBuff();
                        yield return new WaitForSeconds(runAwayTime);
                        isBuffed = false;
                        moveSpeed -= speedBuff;
                    }
                    
                    public IEnumerator Tagged()
                    {
                        isTagger = true;
                        stunned = true;
                        anim.SetBool("Stun", true);
                        yield return new WaitForSeconds(stunTime);
                        stunned = false;
                        anim.SetBool("Stun", false);
                    }
                    
                    private void SpeedBuff()
                    {
                        if (!isBuffed)
                        {
                            moveSpeed += speedBuff;
                            isBuffed = true;
                        }
                    }
                `
            },
            {
                title: "Shadow Projection Script",
                description: "This is very important for the gameplay experience as it helps visualize the player's landing when airborne. As a bonus, it can also visualize the currently tagged player by changing its color.",
                language: "csharp",
                image: "/projectAssets/1/images/shadow.png",
                code:
                `
                    public class Shadow : MonoBehaviour
                    {
                        [SerializeField] Transform origin;
                        [SerializeField] LayerMask layermask;
                    
                        void Update()
                        {
                            RaycastHit hit;
                            Ray ray = new Ray(origin.position, Vector3.down);
                    
                            Physics.Raycast(ray, out hit, Mathf.Infinity, layermask);
                    
                            if(hit.collider != null)
                            {
                                transform.position = hit.point;
                                transform.position += Vector3.up * 0.2f;
                            }
                        }
                    }
                `
            }

        ]
    };

    return <ProjectPage projectData={projectData} />;
}
