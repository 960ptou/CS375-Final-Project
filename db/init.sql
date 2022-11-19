create table book(
    bookname varchar(512) not null,
    bookid serial primary key,
    author varchar(512),
    rating float default 0,
    views integer default 0,
    book_language varchar(128),
    book_upload date,
    is_private boolean
);

create table book_genre(
    bookid integer,
    genre varchar(128),
    primary key(bookid, genre),
    foreign key (bookid) references book(bookid) on delete cascade
);

create table users(
    userid varchar(512) primary key,
    username varchar(256) unique,
    hashpass varchar(512)
);

create table ownby(
    bookid integer,
    userid varchar(512),
    primary key (bookid),
    foreign key (bookid) references book(bookid) on delete cascade,
    foreign key (userid) references users(userid) 
);

create extension if not exists pg_trgm;