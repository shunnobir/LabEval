drop table submissions;
drop table testcases;
drop table registrations;
drop table problems;
drop table events;
drop table users;

create table users (
    user_id varchar(10),
    username varchar,
    email varchar,
    password varchar,
    role varchar,
    avatar integer default 0,
    institution varchar default '',
    country varchar default '',
    city varchar default '',
    join_date timestamp with time zone default current_timestamp,
    constraint unique_username unique (username),
    constraint unique_email unique (email),
    constraint check_correct_role check (role = 'admin' or role = 'instructor' or role = 'participant'),
    constraint user_primary_key primary key (user_id)
);

create table events (
    event_id serial,
    title varchar(80),
    description varchar,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    isopen boolean,
    creator_controlled boolean,
    user_id varchar(10),
    create_date timestamp with time zone default current_timestamp,
    constraint unique_eventid unique (event_id),
    constraint foreign_creator_id foreign key (user_id) references users (user_id) on delete cascade,
    constraint events_primary_key primary key (event_id)
);

create table problems (
    problem_id varchar(20),
    title varchar(65),
    statement varchar,
    points integer,
    time_limit integer,
    memory_limit integer,
    problem_order varchar,
    event_id serial,
    constraint unique_problemid unique (problem_id),
    constraint foreign_event_id foreign key (event_id) references events (event_id) on delete cascade,
    constraint problems_primary_key primary key (problem_id) 
);

create table registrations (
    user_id varchar(10),
    event_id serial,
    constraint foreign_user_id foreign key (user_id) references users (user_id) on delete cascade,
    constraint foreign_event_id foreign key (event_id) references events (event_id) on delete cascade,
    constraint participates_primary_key primary key (user_id, event_id)
);

create table testcases (
    testcase_id varchar(20),
    input_file varchar,
    output_file varchar,
    input_content varchar,
    output_content varchar,
    input_size varchar,
    output_size varchar,
    is_sample boolean,
    problem_id varchar(20),
    constraint unique_testcaseid unique (testcase_id),
    constraint foreign_problem_id foreign key (problem_id) references problems (problem_id) on delete cascade,
    constraint testcases_primary_key primary key (testcase_id)
);

create table submissions (
    submission_id varchar(12),
    code varchar,
    language varchar,
    verdict varchar,
    execution_time integer,
    memory_taken integer,
    submission_time timestamp with time zone,
    points integer default 0,
    user_id varchar(10),
    problem_id varchar(20),
    constraint unique_submissionid unique(submission_id),
    constraint foreign_user_id foreign key (user_id) references users (user_id) on delete cascade,
    constraint foreign_problem_id foreign key (problem_id) references problems (problem_id) on delete cascade,
    constraint submissions_primary_key primary key (submission_id)
);
