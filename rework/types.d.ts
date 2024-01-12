export type User = {
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: number;
  institution: string;
  country: string;
  city: string;
  join_date: Date;
};

export type Event = {
  event_id: number;
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  isopen: boolean;
  creator_controlled: boolean;
  user_id: string;
  create_date: Date;
};

export type Problem = {
  problem_id: string;
  title: string;
  statement: string;
  points: number;
  time_limit: number;
  memory_limit: number;
  problem_order: string;
  event_id: string;
};

export type Testcase = {
  testcase_id: string;
  input_file: string;
  output_file: string;
  input_content: string;
  output_content: string;
  input_size: number;
  output_size: number;
  is_sample: boolean;
  problem_id?: string;
};

export type Solutions = {
  solution_id: string;
  code: string;
  language: string;
  verdict: string;
  execution_time?: number;
  memory_taken?: number;
  submission_time: Date;
  points?: number;
  user_id: string;
};
