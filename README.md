# Project Setup

## Steps to follow for project setup are as below, follow the sequence of steps 

1. Install postgresql 13 database server (based on the operating system) here <a href=https://www.postgresql.org/download/> https://www.postgresql.org/download/</a>
1. Install pgadmin client to view postgres data in a browser from this link <a href=https://www.pgadmin.org/download/>https://www.pgadmin.org/download/</a>
1. create a .env file at root location of the project and add the following to that file:
    * PORT=3000
    * DB_HOST=localhost
    * DB_USERNAME='postgres'
    * DB_PASSWORD='postgres'
 
## Run this command only once on first time setup
### **npm run db-seed**

## CAUTION: 

### Run this command to remove the local database, if you run this and want to setup a test DB again, run the db-seed command given above again
### **npm run db-clean**