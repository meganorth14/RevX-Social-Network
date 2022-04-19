-- users seeds --

insert into users(firstname,lastname, username, password, city, state, email, account) 
 values ('Luke','Shaw', 'lukeshaw', 'password1', 'Mosscow', 'Idaho', 'luck@mosscow.com', 'admin');
 
 insert into users( firstname,lastname, username, password, city, state, email, account) 
 values ('Anthony','Martial','anthonymartial','password2', 'SanJose', 'CA', 'anthony@sans.com', 'associate');
 
 insert into users( firstname,lastname, username, password, city, state, email, account) 
 values ('Marcus','Rashford', 'marcusrashy','password3','Tampa', 'Fl', 'marcus@florida.com', 'associate');
 
 insert into users(firstname,lastname, username, password, city, state, email, account)
 values ('David','Degea','davidsdegea', 'password4', 'Jacksonvile', 'FL', 'davidson@florida.com', 'associate');
 
 insert into users(firstname,lastname, username, password, city, state, email, account) 
 values ('Cristiano','Ronaldo','CR7junior','password5', 'Redmond', 'WA', 'cristiano@portugal.com', 'associate');
 insert into users( firstname,lastname, username, password, city, state, email, account) 
 values ( 'Edinson','Cavani','edinsonca','password6', 'NewYork', 'NY', 'edinsonca@uraguay.com', 'associate');
 
 insert into users( firstname,lastname, username, password, city, state, email, account) 
 values ( 'Chirstian','Pulisic','pulisic22','password7', 'Hershey', 'Pennsylvania', 'captainAmerica@usa.com', 'associate' );

-- posts seeds --
insert into posts( authorid, posttext, postdate, image, likes) 
 values (1, 'Java stands out when it comes to OOP. ', now(), 'https://imgur.com/ZciDcYT', 256 );

 insert into posts( authorid, posttext, postdate, image, likes) 
 values (2, 'React is one the popular JS front-end libraries.', now(), 'https://imgur.com/84FTa8k', 155 );

 insert into posts( authorid, posttext, postdate, image, likes) 
 values (3, 'JS can do both front-end and back-end jobs.', now(), 'https://imgur.com/37o8AdA', 388 );

 insert into posts( authorid, posttext, postdate, image, likes) 
 values (4, 'Typescript is the super hand of javascript', now(), 'https://imgur.com/fZiBhZ8', 567 );

 insert into posts( authorid, posttext, postdate, image, likes) 
 values (5, 'Node JS a javascript work environment', now(),  'https://imgur.com/kbDOHV2', 654 );

-- category seeds --
insert into category (categoryid, title, mainbodycontent)
values (1,'Java tips', 'In our article today, we will look at how you use polyphorism. 
Polymorphism is often referred to as the third pillar of object-oriented programming, after encapsulation and inheritance. 
Polymorphism is a Greek word that means "many-shaped" and it has two distinct aspects:
At run time, objects of a derived class may be treated as objects of a base class in places such as method parameters and collections or arrays. When this polymorphism occurs, the declared type of the object is no longer identical to its run-time type.
Base classes may define and implement virtual methods, and derived classes can override them, which means they provide their own definition and implementation. At run-time, when client code calls the method, the CLR looks up the run-time type of the object, and invokes that override of the virtual method. In your source code you can call a method on a base class, and cause a version of the method to be executed.');

insert into category (categoryid, title, mainbodycontent)
values (1,'Polymorphism', 'In our article today, we will look at how you use polyphorism. 
Polymorphism is often referred to as the third pillar of object-oriented programming, after encapsulation and inheritance. 
Polymorphism is a Greek word that means "many-shaped" and it has two distinct aspects:
At run time, objects of a derived class may be treated as objects of a base class in places such as method parameters and collections or arrays. 
When this polymorphism occurs, the declared type of the object is no longer identical to its run-time type.
Base classes may define and implement virtual methods, and derived classes can override them, which means they provide their own definition 
and implementation. At run-time, when client code calls the method, the CLR looks up the run-time type of the object, and invokes that override 
of the virtual method. In your source code you can call a method on a base class, and cause a version of the method to be executed.');

insert into category (categoryid, title, mainbodycontent)
values (2,'React Overview', 'ReactJS is JavaScript library used for building reusable UI components. According to React official documentation, 
following is the definition − 
React is a library for building composable user interfaces. It encourages the creation of reusable UI components, 
which present data that changes over time. Lots of people use React as the V in MVC. React abstracts away the DOM from you, offering a simpler 
programming model and better performance. React can also render on the server using Node, and it can power native apps using React Native. 
React implements one-way reactive data flow, which reduces the boilerplate and is easier to reason about than traditional data binding.
React Features: 
JSX − JSX is JavaScript syntax extension. It is not necessary to use JSX in React development, but it is recommended.
Components − React is all about components. You need to think of everything as a component. 
This will help you maintain the code when working on larger scale projects.
Unidirectional data flow and Flux − React implements one-way data flow which makes it easy to reason about your app. 
Flux is a pattern that helps keeping your data unidirectional.
React Advantages: 
Uses virtual DOM which is a JavaScript object. This will improve apps performance, since JavaScript virtual DOM is faster than the regular DOM.
Can be used on client and server side as well as with other frameworks.
Component and data patterns improve readability, which helps to maintain larger apps.
React Limitations:
Covers only the view layer of the app, hence you still need to choose other technologies to get a complete tooling set for development.
Uses inline templating and JSX, which might seem awkward to some developers.');

insert into category (categoryid, title, mainbodycontent)
values (2,'React hooks', 'using all hookes...when to use them and how to use them. All here with this article');

insert into category (categoryid, title, mainbodycontent)
values (3,'SQL Intro', 'SQL is a structured query language that allows a user to interact with data stored in a database. 
SQL, when used in conjunction with a DBMS, allows a user to view, create, modify, and remove data from a database. 
It was adopted by the ANSI (American National Standards Institute) and the ISO (International Standardization Organization), 
so SQL is a widely used language. Within the field of data, there can be relational and non-relational databases. 
Relational databases are rigidly structured tables with predefined columns and data types. They can be modified, 
but there will still be a uniform structure across the entire table. Non-relational databases, on the other hand, 
are more flexible and usually only require that every entry contains a unique primary key. Beyond that, each entry can 
specify exactly the attributes that are needed for that specific record, which may or may not be applied to any other record in the database.');

insert into category (categoryid, title, mainbodycontent)
values (4,'What is Typescript and why would I use it over JavaScript?', 'TypeScript adds additional syntax to JavaScript to support a tighter 
integration with your editor. It helps you catch errors early in your editor, rather than later when you are running your application. 
TypeScript code converts to JavaScript, which runs anywhere JavaScript runs so there is no limit to what TypeScript can do. 
TypeScript understands JavaScript and uses type inference to give you great tooling without additional code. It might seem like a hassle
 but it will save you a ton of time in the long run.');

insert into category (categoryid, title, mainbodycontent)
values (2,'Using Redux Today', 'The pros and cons of using redux and how to incorperate in your next project. First off, what is Redux?
Redux is a predictable state container for JavaScript apps.
It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. 
On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.
You can use Redux together with React, or with any other view library. It is tiny (2kB, including dependencies), 
but has a large ecosystem of addons available.');


--  report seeds
insert into report (postid, userid, username, issue)
values (13, 2, 'anthonymartial', 'link to java tutorial didnt work');
insert into report (postid, userid, username, issue)
values (14, 7, 'pulisic22', 'Made an inappropriate comment');
insert into report (postid, userid, username, issue)
values (15, 5, 'CR7junior', 'Made a false statement...Messi is better');
