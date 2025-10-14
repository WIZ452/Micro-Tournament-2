import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Player {
  id: string;
  player_name: string;
  email: string;
  gamertag: string;
  skill_level: string;
  created_at: string;
  updated_at: string;
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  game: string;
  start_date: string;
  status: string;
  max_players: number;
  current_players: number;
  prize_pool: number;
  format: string;
  created_at: string;
}

export interface Match {
  id: string;
  tournament_id: string;
  round: string;
  match_number: number;
  player1_id: string | null;
  player2_id: string | null;
  player1_score: number | null;
  player2_score: number | null;
  winner_id: string | null;
  status: string;
  scheduled_time: string | null;
  completed_at: string | null;
}
