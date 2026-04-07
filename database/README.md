```bash
 docker run -d --name sql_practice -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15
```
```bash
docker exec -it sql_practice psql -U postgres
```

you'll see something like this
ostgres=# \l
                                                   List of databases
      Name      |  Owner   | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |   Access privileges   
----------------+----------+----------+------------+------------+------------+-----------------+-----------------------
 postgres       | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | 
 sql_snorlax_db | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | 
 template0      | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
                |          |          |            |            |            |                 | postgres=CTc/postgres
 template1      | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
                |          |          |            |            |            |                 | postgres=CTc/postgres
(4 rows)

postgres