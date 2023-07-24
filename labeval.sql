create table users (
    uid varchar(10),
    username varchar,
    email varchar,
    password varchar,
    role varchar,
    accepted boolean,
    join_date timestamp default current_timestamp,
    constraint unique_username unique (username),
    constraint unique_email unique (email),
    constraint check_correct_role check (role = 'admin' or role = 'instructor' or role = 'participant'),
    constraint user_primary_key primary key (uid)
);
