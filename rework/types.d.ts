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
