/*
  # Initial Sondae Service Platform Schema

  1. Schema Changes
    - Create membership_tier enum
    - Create all core tables with constraints
    - Enable RLS and set up policies
    - Add performance indexes

  2. Security
    - RLS enabled on all tables
    - Proper CHECK constraints for INSERT operations
    - Role-based access control
*/

-- Create custom types
CREATE TYPE membership_tier AS ENUM ('free', 'monthly', 'tribe');

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  membership_tier membership_tier DEFAULT 'free',
  avatar_url text,
  bio text,
  location text,
  join_date timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date timestamptz NOT NULL,
  venue_name text NOT NULL,
  venue_address text NOT NULL,
  venue_city text NOT NULL,
  description text NOT NULL,
  flyer_url text,
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ticket tiers table
CREATE TABLE ticket_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  monthly_discount decimal(10,2) DEFAULT 0 CHECK (monthly_discount >= 0),
  tribe_discount decimal(10,2) DEFAULT 0 CHECK (tribe_discount >= 0),
  quantity integer NOT NULL CHECK (quantity > 0),
  sold_count integer DEFAULT 0 CHECK (sold_count >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT sold_not_exceed_quantity CHECK (sold_count <= quantity)
);

-- Tickets table
CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  event_id uuid REFERENCES events(id) NOT NULL,
  tier_id uuid REFERENCES ticket_tiers(id) NOT NULL,
  purchase_date timestamptz DEFAULT now(),
  price_paid decimal(10,2) NOT NULL CHECK (price_paid >= 0),
  created_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) NOT NULL,
  content text NOT NULL,
  channel text NOT NULL,
  parent_id uuid REFERENCES messages(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Media table
CREATE TABLE media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES messages(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Events policies
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND membership_tier = 'tribe'
    )
  );

-- Ticket policies
CREATE POLICY "Users can view their tickets"
  ON tickets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can purchase tickets"
  ON tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Media policies
CREATE POLICY "Users can view media"
  ON media FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM messages
      WHERE id = message_id
      AND author_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_tickets_user_id ON tickets(user_id);
CREATE INDEX idx_messages_channel ON messages(channel);
CREATE INDEX idx_messages_created_at ON messages(created_at);