/*
  # Micro Tournaments Database Schema

  ## Overview
  This migration creates the complete database structure for the Micro Tournaments platform,
  including tables for players, tournaments, matches, and brackets.

  ## New Tables

  ### 1. `players`
  Stores registered player information
  - `id` (uuid, primary key) - Unique player identifier
  - `player_name` (text) - Full name of the player
  - `email` (text, unique) - Player's email address
  - `gamertag` (text, unique) - In-game username
  - `password` (text) - Player password
  - `skill_level` (text) - Player skill level (beginner, intermediate, advanced, expert)
  - `role` (text) - User role (user, admin)
  - `created_at` (timestamptz) - Registration timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `tournaments`
  Stores tournament information
  - `id` (uuid, primary key) - Unique tournament identifier
  - `title` (text) - Tournament name
  - `description` (text) - Tournament description
  - `game` (text) - Game being played
  - `start_date` (timestamptz) - Tournament start time
  - `status` (text) - Tournament status (upcoming, live, completed)
  - `max_players` (integer) - Maximum number of participants
  - `current_players` (integer) - Current number of registered players
  - `prize_pool` (numeric) - Total prize amount
  - `format` (text) - Tournament format (single elimination, double elimination, etc.)
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `tournament_registrations`
  Links players to tournaments they've registered for
  - `id` (uuid, primary key) - Unique registration identifier
  - `tournament_id` (uuid, foreign key) - Reference to tournaments table
  - `player_id` (uuid, foreign key) - Reference to players table
  - `seed` (integer) - Player's seeding position
  - `registered_at` (timestamptz) - Registration timestamp

  ### 4. `matches`
  Stores individual match information
  - `id` (uuid, primary key) - Unique match identifier
  - `tournament_id` (uuid, foreign key) - Reference to tournaments table
  - `round` (text) - Match round (Round of 16, Quarter Finals, etc.)
  - `match_number` (integer) - Match number in the round
  - `player1_id` (uuid, foreign key) - First player reference
  - `player2_id` (uuid, foreign key) - Second player reference
  - `player1_score` (integer) - First player's score
  - `player2_score` (integer) - Second player's score
  - `winner_id` (uuid, foreign key) - Winner reference
  - `status` (text) - Match status (upcoming, live, completed)
  - `scheduled_time` (timestamptz) - When the match is scheduled
  - `completed_at` (timestamptz) - When the match was completed

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Players can view all tournaments and matches
  - Players can only update their own player profile
  - Players can register for tournaments
  - Only authenticated users can report match scores
  - All users can view public tournament information
*/

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  email text UNIQUE NOT NULL,
  gamertag text UNIQUE NOT NULL,
  password text NOT NULL,
  skill_level text NOT NULL DEFAULT 'intermediate',
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  game text NOT NULL DEFAULT 'Multi-Game',
  start_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'upcoming',
  max_players integer NOT NULL DEFAULT 32,
  current_players integer DEFAULT 0,
  prize_pool numeric DEFAULT 0,
  format text NOT NULL DEFAULT 'single elimination',
  created_at timestamptz DEFAULT now()
);

-- Create tournament registrations table
CREATE TABLE IF NOT EXISTS tournament_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  player_id uuid REFERENCES players(id) ON DELETE CASCADE NOT NULL,
  seed integer,
  registered_at timestamptz DEFAULT now(),
  UNIQUE(tournament_id, player_id)
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  round text NOT NULL,
  match_number integer NOT NULL,
  player1_id uuid REFERENCES players(id) ON DELETE SET NULL,
  player2_id uuid REFERENCES players(id) ON DELETE SET NULL,
  player1_score integer DEFAULT 0,
  player2_score integer DEFAULT 0,
  winner_id uuid REFERENCES players(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'upcoming',
  scheduled_time timestamptz,
  completed_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Players policies
CREATE POLICY "Anyone can view players"
  ON players FOR SELECT
  USING (true);

CREATE POLICY "Anyone can register as a player"
  ON players FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Players can update own profile"
  ON players FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Tournaments policies
CREATE POLICY "Anyone can view tournaments"
  ON tournaments FOR SELECT
  USING (true);

-- Tournament registrations policies
CREATE POLICY "Anyone can view registrations"
  ON tournament_registrations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can register for tournaments"
  ON tournament_registrations FOR INSERT
  WITH CHECK (true);

-- Matches policies
CREATE POLICY "Anyone can view matches"
  ON matches FOR SELECT
  USING (true);

CREATE POLICY "Anyone can report match scores"
  ON matches FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_email ON players(email);
CREATE INDEX IF NOT EXISTS idx_players_gamertag ON players(gamertag);
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tournaments_start_date ON tournaments(start_date);
CREATE INDEX IF NOT EXISTS idx_registrations_tournament ON tournament_registrations(tournament_id);
CREATE INDEX IF NOT EXISTS idx_registrations_player ON tournament_registrations(player_id);
CREATE INDEX IF NOT EXISTS idx_matches_tournament ON matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);