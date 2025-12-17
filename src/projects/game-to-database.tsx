import ProjectPage from '../components/ProjectPage';
import type { ExtendedProjectData } from '../components/ProjectPage';
import { projects as projectsData } from '../data/projects';

export default function GameToDatabase() {
    const baseProject = projectsData.find(p => p.slug === 'game-to-database');
    if (!baseProject) return <div>Project not found</div>;

    // Extended project data with additional details for this specific project
    const projectData: ExtendedProjectData = {
        ...baseProject,
        longDescription:
        "This project was my first dive into making a web based server with an database, and have a game connect to it to fetch and store data. I built a Node.js server with a mySQL database to handle requests from a Godot game. The prototype was to try and connect a game to a database for storing player stats and game progress. I learned a lot about back end development, databases, and how to connect a game to a server. This project also features a Svelte-Kit based web portal to view and manage the data in the database with graphs and other visuals.",

        date: "September - October 2025",
        duration: "7 weeks",
        teamSize: "1 developer",
        role: "Solo Developer",
        
        features: [
            "A Nose.js server to handle API requests from the game and web portal",
            "A mySQL database to store player stats and game progress",
            "A Godot project that connects to the server to fetch and store data using the HTTPRequest node",
            "A SvelteKit based web portal to view and manage the data in the database with graphs and other visuals"
        ],
        
        tools: ["Godot", "GDScript", "Typescript", "SvelteKit", "Node.js", "mySQL", "TailwindCSS", "Chart.js", "WSL2", "XAMPP"],
        
        images: [
            "/assets/images/dataDashboard.png",
            "/projectAssets/dataGame/images/dataGraph.png"
        ],
        
        videos: [
            "/projectAssets/dataGame/login_screen.gif"
        ],
        
        challenges: [
            "Making a dynamic and scalable database schema to store different types of player data",
            "Implementing secure and efficient API endpoints for data retrieval and storage",
            "Handling asynchronous HTTP requests in Godot and managing responses",
            "Creating a user-friendly web portal to visualize and manage the data in the database"
        ],
        
        learnings: [
            "Gained experience with back end development using Node.js and mySQL",
            "Learned how to design and implement a database schema for game data",
            "Understood how to connect a game to a web server using HTTP requests",
            "Developed skills in building a web portal with SvelteKit and data visualization"
        ],
        
        codeSnippets: [
            {
                title: "API Endpoint for Submitting Player Score",
                description: "This code snippet demonstrates an API endpoint with Node.js that handles POST requests from the game to submit player scores. It validates the incoming data and stores it in the mySQL database.",
                language: "typescript",
                code:
                    `
import type { RequestHandler } from './$types';
import mysql from 'mysql2/promise';
import type { ResultSetHeader } from 'mysql2';
import { env } from '$env/dynamic/private';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept'
};

const pool = mysql.createPool(env.DATABASE_URL!);

export const OPTIONS: RequestHandler = async () =>
  new Response(null, { headers: corsHeaders });

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    const session_id = Number(body.session_id);
    const level_id   = Number(body.level_id);
    const score      = Number(body.score);
    const time_taken = Number(body.time_taken);
    const accuracy   = Number(body.accuracy);

    // Validation
    if (
      !Number.isInteger(session_id) ||
      !Number.isInteger(level_id)   ||
      !Number.isInteger(score)      ||
      !Number.isInteger(time_taken) ||
      Number.isNaN(accuracy)
    ) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid or missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Bestaat de sessie in de tabel?
    const [sessionChk] = await pool.execute<any[]>(
      'SELECT 1 FROM sessions WHERE id = ? LIMIT 1',
      [session_id]
    );
    if (!Array.isArray(sessionChk) || sessionChk.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Session not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Bestaat het level in de tabel?
    const [levelChk] = await pool.execute<any[]>(
      'SELECT 1 FROM levels WHERE id = ? LIMIT 1',
      [level_id]
    );
    if (!Array.isArray(levelChk) || levelChk.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Level not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // INSERT score
    const [res] = await pool.execute<ResultSetHeader>(
      'INSERT INTO scores (session_id, level_id, created_at, score, time_taken, accuracy) VALUES (?, ?, NOW(), ?, ?, ?)',
      [session_id, level_id, score, time_taken, accuracy]
    );

    return new Response(JSON.stringify({ ok: true, score_id: res.insertId }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (err: any) {
    console.error(err);
    
    return new Response(JSON.stringify({ ok: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
                `
            },
            {
                title: "API endpoint to create a new session",
                description: "This code snippet demonstrates an API endpoint with Node.js that handles POST requests to create a new game session for a player. It checks if the user exists and then creates a new session in the database.",
                language: "typescript",
                code: `
import type { RequestHandler } from './$types';
import mysql from 'mysql2/promise';
import type { ResultSetHeader } from 'mysql2';
import { env } from '$env/dynamic/private';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept'
};

const pool = mysql.createPool(env.DATABASE_URL!);

export const OPTIONS: RequestHandler = async () =>
  new Response(null, { headers: corsHeaders });

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'username missing or invalid' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Bestaat de gebruiker?
    const [users] = await pool.execute<any[]>(
      'SELECT id FROM users WHERE username = ? LIMIT 1',
      [username]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const userId = users[0].id as number;

    // Nieuwe sessie aanmaken
    const [res] = await pool.execute<ResultSetHeader>(
      'INSERT INTO sessions (user_id, duration) VALUES (?, 0)',
      [userId]
    );
    const sessionId = res.insertId;

    // JSON response
    return new Response(JSON.stringify({ ok: true, session_id: sessionId }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: 'Internal Server error:' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
                `
            },
            {
                title: "Godot GDScript: requesting to create a new session",
                description: "This code snippet demonstrates how to use Godot's HTTPRequest node to send a POST request to the server to create a new game session for a player. It handles the response and extracts the session ID.",
                language: "gdscript",
                video: "/projectAssets/dataGame/login_screen.gif",
                code: `
extends Node

@onready var http_request: HTTPRequest = $HTTPRequest

var session_id : int
func _ready():
	if not http_request.request_completed.is_connected(self._on_request_completed):
		http_request.request_completed.connect(self._on_request_completed)

func create_session(username: String) -> int:
	print("Creating session for username:", username) 
	var url: String = "http://127.0.0.1:5173/api/create-session"
	var data: Dictionary = { "username": username }
	var json_data: String = JSON.stringify({"username": username})
	var headers: PackedStringArray = [
		"Content-Type: application/json",
		"Accept: application/json"
		]
	var err = http_request.request(
		url,
		headers,
		HTTPClient.METHOD_POST,
		json_data
		)
	print("Request called, result:", err)  # Should be OK (value = 0)
	if err != OK:
		push_error("An error occurred in the HTTP request.")
	var result = await http_request.request_completed
	var response_code = result[1]
	var body = result[3]
	var data_response = {}
	if response_code == 200:
		data_response = JSON.parse_string(body.get_string_from_utf8())
	return response_code

func _on_request_completed(result, response_code, headers, body):
	print("Request completed, HTTP status:", response_code)
	print("Raw body:", body.get_string_from_utf8())
	if response_code == 200:
		var response = JSON.parse_string(body.get_string_from_utf8())
		if response and response.has("ok") and response["ok"]:
			print("Session created. session_id =", response.get("session_id"))
			session_id = response.get("session_id")
		else:
			print("Server did not return ok. Response:", body.get_string_from_utf8())
	else:
		print("HTTP error:", response_code, body.get_string_from_utf8())
`
            }
        ]
    };

    return <ProjectPage projectData={projectData} />;
}
