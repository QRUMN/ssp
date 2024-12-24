/*
  # User Roles and Permissions System

  1. Changes
    - Add role_type enum
    - Add role column to users table
    - Update RLS policies to use new role column
    - Add initial roles and permissions

  2. Security
    - Enable RLS on new tables
    - Add policies for role-based access
*/

-- Create role type enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE role_type AS ENUM ('member', 'tribe', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add role column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role role_type DEFAULT 'member'::role_type;

-- Create permissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create role_permissions junction table if it doesn't exist
CREATE TABLE IF NOT EXISTS role_permissions (
  role role_type NOT NULL,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (role, permission_id)
);

-- Enable RLS
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view permissions"
  ON permissions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view role permissions"
  ON role_permissions FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify permissions"
  ON permissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can modify role permissions"
  ON role_permissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Insert initial permissions
INSERT INTO permissions (name, description) VALUES
  ('create:events', 'Can create new events'),
  ('edit:events', 'Can edit existing events'),
  ('delete:events', 'Can delete events'),
  ('create:posts', 'Can create community posts'),
  ('moderate:posts', 'Can moderate community posts'),
  ('access:analytics', 'Can access analytics dashboard'),
  ('manage:users', 'Can manage user accounts')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to roles
INSERT INTO role_permissions (role, permission_id)
SELECT 'member', id FROM permissions WHERE name IN ('create:posts');

INSERT INTO role_permissions (role, permission_id)
SELECT 'tribe', id FROM permissions WHERE name IN (
  'create:posts',
  'create:events',
  'edit:events'
);

INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions WHERE name IN (
  'create:posts',
  'create:events',
  'edit:events',
  'delete:events',
  'moderate:posts',
  'access:analytics',
  'manage:users'
);

-- Update existing RLS policies to use new role column
DROP POLICY IF EXISTS "Only admins can create events" ON events;
CREATE POLICY "Role-based event creation"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('tribe', 'admin')
    )
  );