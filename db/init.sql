create table book(
    bookid serial integer primary key,
    author varchar(512),
    rating float,
    views integer,
    book_language varchar(128),
    book_upload date,
    is_private boolean
);

create table book_genre(
    bookid integer,
    genre varchar(128),
    primary key(bookid, genre),
    foreign key (bookid) references book(bookid) on delete cascade
)

create table user(
    userid integer primary key,
    username varchar(256),
    hashpass varchar(512)
    
)

create table ownby(
    bookid integer,
    userid integer,
    primary key (bookid),
    foreign key (bookid) references book(bookid) on delete cascade,
    foreign key (userid) references user(userid) on delete cascade
)