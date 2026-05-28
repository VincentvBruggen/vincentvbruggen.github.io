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
                title: "Unit Selection Logic",
                description: "This code snippet illustrates the logic for selecting units in the game. It handles both single selection and multi-selection using the shift key, as well as deselection when clicking on empty space or other non-selectable objects. The code also includes logic for issuing orders to selected units when a building is selected. The function is called on Left Click.",
                language: "csharp",
                code: `
    public void OnSelect(InputAction.CallbackContext context)
    {
        if (!context.performed) return;
        if(!GameManager.instance.isGameStarted){ return;}

        Vector3 position = Mouse.current.position.ReadValue();
        Ray ray = Camera.main.ScreenPointToRay(position);
        if (Physics.Raycast(ray, out RaycastHit hit))
        {
            ISelectable selectable = hit.collider.GetComponent<ISelectable>();
            PhotonView selectablePhotonView = hit.collider.GetComponent<PhotonView>();

            if (selectable == null || selectablePhotonView == null)
            {
                if(EventSystem.current.IsPointerOverGameObject()){return;}
                    
                foreach (GameObject unit in selectedUnits)
                {
                    unit.GetComponent<ISelectable>().OnDeselect(gameObject);
                }
                selectedUnits.Clear();
                return;
            }

            GameObject selectedUnit = hit.collider.gameObject;

            if (Keyboard.current.shiftKey.IsPressed())
            {
                if (!selectedUnits.Contains(selectedUnit))
                {
                    selectedUnits.Add(selectedUnit);
                    selectable.OnSelect(gameObject);
                }
                else
                {
                    selectedUnits.Remove(selectedUnit);
                    selectable.OnDeselect(gameObject);
                }
            }
            else
            {
                foreach (GameObject unit in selectedUnits)
                {
                    unit.GetComponent<ISelectable>().OnDeselect(gameObject);
                }
                
                selectedUnits.Clear();
                if (!selectedUnits.Contains(selectedUnit))
                {
                    selectedUnits.Add(selectedUnit);
                    selectable.OnSelect(gameObject);
                }
            }
        }
    }

                `
            },
            {
                title: "Unit Ordering System",
                description: "This code snippet demonstrates the logic for sending orders to units in the game. It checks if the shift key is pressed to determine whether to queue orders or replace existing ones, and it handles clearing orders and resetting unit states accordingly.",
                language: "csharp",
                code: `private void SendingOrder(OrderBase order, BaseUnit unit)
    {
        if (!Keyboard.current.shiftKey.isPressed) //check if shift is pressed, if not then clear orders and reset unit states
            foreach (OrderBase script in unit.GetComponents<OrderBase>())
            {
                script.status = Node.Status.Success;
            }

            if (unit.ordersList.Count > 0)
            {
                unit.ordersList[0].status = Node.Status.Success;
                unit.ordersList[0].enabled = false;
                unit.ordersList.Clear();
            }
            unit.orderTargetPositions.Clear();
            
            unit.state = UnitState.Idle;
        }
        if (unit.ordersList.Count == 0)
        {
            foreach (OrderBase script in unit.GetComponents<OrderBase>())
            {
                script.status = Node.Status.Success;
            }
        }
        
        unit.SendOrder(order, targetPosition); //send order to the unit, with target position if needed
    }`
            }
        ]
    };

    return <ProjectPage projectData={projectData} />;
}
