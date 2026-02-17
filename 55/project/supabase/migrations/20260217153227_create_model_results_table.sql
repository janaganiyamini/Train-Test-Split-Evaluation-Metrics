/*
  # Create Model Results Storage

  1. New Tables
    - `model_results`
      - `id` (uuid, primary key) - Unique identifier for each training session
      - `dataset_name` (text) - Name of the dataset used
      - `train_size` (integer) - Number of training samples
      - `test_size` (integer) - Number of test samples
      - `accuracy` (numeric) - Model accuracy score
      - `precision` (numeric) - Precision score
      - `recall` (numeric) - Recall score
      - `f1_score` (numeric) - F1 score
      - `confusion_matrix` (jsonb) - Confusion matrix data
      - `created_at` (timestamptz) - Timestamp of creation
      
  2. Security
    - Enable RLS on `model_results` table
    - Add policy for public read access (educational purpose)
    - Add policy for public insert access (students can submit results)
*/

CREATE TABLE IF NOT EXISTS model_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_name text NOT NULL DEFAULT 'Heart Disease Dataset',
  train_size integer NOT NULL DEFAULT 0,
  test_size integer NOT NULL DEFAULT 0,
  accuracy numeric(5,4) NOT NULL DEFAULT 0,
  precision numeric(5,4) NOT NULL DEFAULT 0,
  recall numeric(5,4) NOT NULL DEFAULT 0,
  f1_score numeric(5,4) NOT NULL DEFAULT 0,
  confusion_matrix jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE model_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view model results"
  ON model_results FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert model results"
  ON model_results FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);