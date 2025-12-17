import type { ProjectCardProps } from '../components/ProjectCard';

export const projects: ProjectCardProps[] = [
  {
    slug: "game-to-database",
    order: 1,
    title: "Game to Database Prototype",
    description: "This project was my first experience with creating a back end server to store and retrieve game data, I built a Node.js server with an SQL database to handle requests from a Godot game. The prototype was to try and connect a game to a database for storing player stats and game progress.",
    image: "/assets/images/dataDashboard.png",
    tech: ["Node.js", "TailwindCSS", "Svelte-Kit", "mySQL", "Godot", "GDSript"],
    githubUrl: "https://github.com/VincentvBruggen/svelte-db-portal/tree/main",
    // imageClassName: "small-image"
  },
  {
    slug: "ballpit-chase",
    order: 2,
    title: "Ballpit Chase",
    description: "This project was my first dive into local multiplayer game development using Unity's Input System instead of the Input Manager. I created a fast-paced pvp arcade game where players fight to not be the last tagger when the timer runs out.",
    image: "/assets/images/ballpit.png",
    tech: ["Unity", "C#", "URP", "Shader Graph"],
    githubUrl: "https://github.com/GLU-Gaming/Ballpit-Chase",
    liveUrl: "https://joahvds.itch.io/ballpit-chase",
    imageClassName: "small-image"
  },
  {
    slug: "total-warfare",
    order: 3,
    title: "Total Warfare",
    description: "This project was my first experience with online multiplayer using Photon Pun 2, a sci-fi 3rd person RTS game. I implemented core mechanics like base building, resource gathering, and unit orders, though the project was not fully finished and only basic features were completed.",
    image: "/assets/images/TotalWarfare.png",
    tech: ["Unity", "C#", "URP", "Photon Pun 2"],
    githubUrl: "https://github.com/VincentvBruggen/Total-Warfare",
    liveUrl: "https://nt4p.itch.io/total-warfare"
  },
  {
    slug: "gandalfs-magical-adventure",
    order: 4,
    title: "Gandalf's Magical Adventure",
    description: "This project was my first time building a game with a team of developers and artists. I was responsible for the gameplay programming, including the player controller and enemy AI. The game is a 3D shoot 'em up where you play as a wizard who needs to defeat a giant spider.",
    image: "/assets/images/gandalf.png",
    tech: ["Unity", "C#", "URP", "Particle System"],
    githubUrl: "https://github.com/GLU-Gaming/shmup-2024-team-8-tobedetermined",
    liveUrl: "https://nt4p.itch.io/schump",
    imageClassName: "small-image"
  },
  {
    slug: "a-greek-odyssey",
    order: 5,
    title: "A Greek Odyssey",
    description: "This project was a game where we had to make the concept and game from start to finish. I handled multiplayer functionality using Photon Pun 2 for this Mario Party-inspired game. Players compete in mini-games to collect coins and ambrosia, but only the core mechanics were finished.",
    image: "/assets/images/greek.png",
    tech: ["Unity", "C#", "URP", "Photon Pun 2"],
    githubUrl: "https://github.com/VincentvBruggen/Total-Warfare",
    liveUrl: "https://nt4p.itch.io/total-warfare"
  }
];
