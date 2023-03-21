CREATE TABLE IF NOT EXISTS blogs(
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer NOT NULL DEFAULT 0
);

insert into blogs (author, url, title) values ('Jussi K', 'localhost', 'First PostgreSQL blog');
insert into blogs (author, url, title) values ('Jussi K', 'localhost', 'Some dummy data');