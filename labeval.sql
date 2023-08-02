create table users (
    uid varchar(10),
    username varchar,
    email varchar,
    password varchar,
    role varchar,
    accepted boolean,
    join_date timestamp with time zone default current_timestamp,
    constraint unique_username unique (username),
    constraint unique_email unique (email),
    constraint check_correct_role check (role = 'admin' or role = 'instructor' or role = 'participant'),
    constraint user_primary_key primary key (uid)
);

create table events (
    event_id varchar(10),
    title varchar(80),
    description varchar,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    created_by varchar(10),
    create_date timestamp with time zone default current_timestamp,
    constraint unique_eventid unique (event_id),
    constraint foreign_creator_id foreign key (created_by) references users (uid) on delete cascade,
    constraint events_primary_key primary key (event_id)
);
