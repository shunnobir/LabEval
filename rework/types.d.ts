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
  event_id: string;
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  user_id: string;
  create_date: Date;
};

export type Problem = {
  problem_id: string;
  title: string;
  statement: string;
  points: number;
  time_limit: number;
  event_id: string;
};
