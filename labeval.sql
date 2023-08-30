create table users (
    user_id varchar(10),
    username varchar,
    email varchar,
    password varchar,
    role varchar,
    accepted boolean,
    join_date timestamp with time zone default current_timestamp,
    constraint unique_username unique (username),
    constraint unique_email unique (email),
    constraint check_correct_role check (role = 'admin' or role = 'instructor' or role = 'participant'),
    constraint user_primary_key primary key (user_id)
);

create table events (
    event_id varchar(10),
    title varchar(80),
    description varchar,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
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
    event_id varchar(10),
    constraint unique_problemid unique (problem_id),
    constraint foreign_event_id foreign key (event_id) references events (event_id) on delete cascade,
    constraint problems_primary_key primary key (problem_id) 
);

create table participates (
    user_id varchar(10),
    event_id varchar(10),
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
