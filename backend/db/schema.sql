CREATE DATABASE project1;

create type genre as enum('beginner', 'intermediatetip', 'advancetips', 'javatip', 'reacttip', 'jstip', 'pythontip');

create type accountType as enum('associate', 'admin', 'trainer', 'alumni');
--alter type accountType add value 'trainer';
--alter type accountType add value 'alumni';

CREATE TABLE users(
  userid serial primary key,
  firstname varchar(30),
  lastname varchar(30),
  username varchar(30) not null,
  password varchar(30) not null,
  city varchar(30),
  state varchar(30),
  email varchar(50),
  account accountType,
  pic varchar(120)
);


CREATE TABLE posts(
    postid serial primary key,
    authorid int,
    posttext text,
    postdate timestamp,
    image varchar(100),
    likes int
 );


create table category (
      id serial primary key,
	  categoryid int,
      title text,
      mainbodycontent text
);

create table report (
    caseid serial primary key,
    userid int references users(userid),
    postid int references posts(postid),
    username varchar(30),
    issue text
);



