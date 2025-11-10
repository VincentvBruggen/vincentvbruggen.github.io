import ProjectPage from '../components/ProjectPage';
import type { ExtendedProjectData } from '../components/ProjectPage';
import projectsData from '../data/projects.json';

export default function Project1() {
    const baseProject = projectsData.find(p => p.id === '1');
    if (!baseProject) return <div>Project not found</div>;

    // Extended project data with additional details for this specific project
    const projectData: ExtendedProjectData = {
        ...baseProject,
        longDescription:
        "Ballpit Chase was my first actual venture into local multiplayer game development using Unity's new Input System." +
        "Ballpit Chase is a 4-player local multiplayer tag game set in a vibrant ball pit arena. " +
        "Where each player controls a colorful character trying to avoid being tagged while navigating through obstacles and interactive elements." +
        "The game features dynamic arenas, smooth character controls, and engaging visual feedback to have a better game feel." +
        "",

        date: "November - December 2024",
        duration: "4 weeks",
        teamSize: "2 developers, 3 artists",
        role: "Lead Gameplay Programmer",
        
        features: [
            "4-player local multiplayer support using Unity's Input System",
            "Dynamic arena with interactive elements and obstacles",
            "Smooth character controller with responsive movement",
            "Visual feedback system for player states (tagged/safe)",
            "Countdown timer with tension-building audio cues",
            "Custom shader effects for player highlighting"
        ],
        
        tools: [
            "Unity Input System",
            "Universal Render Pipeline (URP)",
            "Shader Graph",
            "Cinemachine"
        ],
        
        images: [
            "/assets/images/ballpit-gameplay1.png",
            "/assets/images/ballpit-arena.png",
            "/assets/images/ballpit-ui.png"
        ],
        
        videos: [
            "/assets/videos/ballpit-gameplay.mp4"
        ],
        
        challenges: [
            "Learning Unity's new Input System from scratch and adapting to its event-driven architecture",
            "Ensuring fair gameplay mechanics where all players have equal chances regardless of spawn position",
            "Optimizing performance for 4-player split-screen while maintaining 60fps",
            "Creating intuitive visual feedback that works in the chaos of multiplayer action"
        ],
        
        learnings: [
            "Mastered Unity's Input System and its advantages over the legacy Input Manager",
            "Gained experience in local multiplayer networking and state synchronization",
            "Learned the importance of playtesting with real players early and often",
            "Developed skills in shader programming using Shader Graph for visual effects"
        ],
        
        codeSnippets: [
            {
                title: "Player Controller with Input System",
                description: "Core player movement controller that handles input from multiple players using Unity's Input System. Features smooth movement, jumping, and tagging interactions.",
                language: "csharp",
                image: "/assets/images/ballpit-controller-demo.png",
                code: `using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{
    [Header("Movement Settings")]
    public float moveSpeed = 5f;
    public float jumpForce = 10f;
    
    [Header("Player State")]
    public bool isTagged = false;
    public PlayerInput playerInput;
    
    private Rigidbody rb;
    private Vector2 moveInput;
    private bool isGrounded;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        playerInput = GetComponent<PlayerInput>();
    }
    
    public void OnMove(InputAction.CallbackContext context)
    {
        moveInput = context.ReadValue<Vector2>();
    }
    
    public void OnJump(InputAction.CallbackContext context)
    {
        if (context.performed && isGrounded)
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }
    
    void FixedUpdate()
    {
        // Apply movement
        Vector3 movement = new Vector3(moveInput.x, 0, moveInput.y);
        rb.AddForce(movement * moveSpeed, ForceMode.Force);
        
        // Limit max speed
        Vector3 horizontalVelocity = new Vector3(rb.velocity.x, 0, rb.velocity.z);
        if (horizontalVelocity.magnitude > moveSpeed)
        {
            horizontalVelocity = horizontalVelocity.normalized * moveSpeed;
            rb.velocity = new Vector3(horizontalVelocity.x, rb.velocity.y, horizontalVelocity.z);
        }
    }
}`
            },
            {
                title: "Tagging System",
                description: "The core mechanic that handles player tagging, state changes, and win condition checking. Includes collision detection and visual feedback.",
                language: "csharp",
                video: "/assets/videos/ballpit-tagging-system.mp4",
                code: `using UnityEngine;
using System.Collections;

public class TaggingSystem : MonoBehaviour
{
    [Header("Game Settings")]
    public float gameTime = 60f;
    public float tagCooldown = 2f;
    
    private PlayerController[] players;
    private float currentTime;
    private bool gameActive = false;
    
    void Start()
    {
        players = FindObjectsOfType<PlayerController>();
        StartGame();
    }
    
    public void StartGame()
    {
        gameActive = true;
        currentTime = gameTime;
        
        // Randomly select first tagged player
        int randomPlayer = Random.Range(0, players.Length);
        players[randomPlayer].SetTaggedState(true);
        
        StartCoroutine(GameTimer());
    }
    
    public void HandlePlayerTag(PlayerController tagger, PlayerController target)
    {
        if (!gameActive || !tagger.isTagged || target.isTagged) return;
        
        // Transfer tag
        tagger.SetTaggedState(false);
        target.SetTaggedState(true);
        
        // Visual and audio feedback
        PlayTagEffect(target.transform.position);
        AudioManager.Instance.PlaySound("tag_sound");
        
        // Brief invincibility period
        StartCoroutine(TagCooldown(target));
    }
    
    private IEnumerator TagCooldown(PlayerController player)
    {
        player.SetInvincible(true);
        yield return new WaitForSeconds(tagCooldown);
        player.SetInvincible(false);
    }
    
    private IEnumerator GameTimer()
    {
        while (currentTime > 0 && gameActive)
        {
            currentTime -= Time.deltaTime;
            UIManager.Instance.UpdateTimer(currentTime);
            yield return null;
        }
        
        EndGame();
    }
    
    private void EndGame()
    {
        gameActive = false;
        
        // Find tagged player (loser)
        PlayerController taggedPlayer = System.Array.Find(players, p => p.isTagged);
        
        if (taggedPlayer != null)
        {
            GameManager.Instance.DeclareWinner(taggedPlayer);
        }
    }
}`
            },
            {
                title: "Shader Graph Player Highlighting",
                description: "Custom shader implementation that creates a glowing outline effect for the tagged player, making them easily identifiable during gameplay.",
                language: "hlsl",
                image: "/assets/images/ballpit-shader-graph.png",
                code: `// Custom Outline Shader for Tagged Player
// Created in Unity Shader Graph, converted to HLSL

Shader "Custom/PlayerOutline"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _OutlineColor ("Outline Color", Color) = (1, 0, 0, 1)
        _OutlineWidth ("Outline Width", Range(0, 0.1)) = 0.03
        _GlowIntensity ("Glow Intensity", Range(0, 5)) = 2
        _PulseSpeed ("Pulse Speed", Range(0, 10)) = 3
    }
    
    SubShader
    {
        Tags { "RenderType"="Opaque" "RenderPipeline"="UniversalPipeline" }
        
        // Outline Pass
        Pass
        {
            Name "Outline"
            Cull Front
            ZWrite On
            
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            
            struct Attributes
            {
                float4 positionOS : POSITION;
                float3 normalOS : NORMAL;
            };
            
            struct Varyings
            {
                float4 positionHCS : SV_POSITION;
            };
            
            CBUFFER_START(UnityPerMaterial)
            float4 _OutlineColor;
            float _OutlineWidth;
            float _GlowIntensity;
            float _PulseSpeed;
            CBUFFER_END
            
            Varyings vert(Attributes input)
            {
                Varyings output;
                
                // Pulse effect based on time
                float pulse = sin(_Time.y * _PulseSpeed) * 0.5 + 0.5;
                float width = _OutlineWidth * (1 + pulse * 0.3);
                
                // Expand vertex along normal
                float3 positionWS = TransformObjectToWorld(input.positionOS.xyz);
                float3 normalWS = TransformObjectToWorldNormal(input.normalOS);
                positionWS += normalWS * width;
                
                output.positionHCS = TransformWorldToHClip(positionWS);
                return output;
            }
            
            half4 frag(Varyings input) : SV_Target
            {
                // Animated glow effect
                float pulse = sin(_Time.y * _PulseSpeed) * 0.5 + 0.5;
                float4 glowColor = _OutlineColor * _GlowIntensity * (1 + pulse);
                return glowColor;
            }
            ENDHLSL
        }
    }
}`
            }
        ]
    };

    return <ProjectPage projectData={projectData} />;
}
