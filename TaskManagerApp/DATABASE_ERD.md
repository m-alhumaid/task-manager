# Task Manager Database ERD

## Tables

### Users

| Column       | Type        | Constraints           |
| ------------ | ----------- | --------------------- |
| Id           | int         | Primary Key, Identity |
| Username     | varchar(50) | Unique, Not Null      |
| PasswordHash | bytea       | Not Null              |
| PasswordSalt | bytea       | Not Null              |

### Tasks

| Column      | Type         | Constraints                                |
| ----------- | ------------ | ------------------------------------------ |
| Id          | int          | Primary Key, Identity                      |
| Title       | varchar(100) | Not Null                                   |
| Description | text         | Nullable                                   |
| Status      | varchar(20)  | Not Null (Pending, In Progress, Completed) |
| Priority    | varchar(20)  | Not Null (High, Medium, Low)               |
| UserId      | int          | Foreign Key → Users(Id), Not Null          |

## Relationships

- One User can have many Tasks.
- Each Task belongs to one User.
