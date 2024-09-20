# Instructions

- add *.env* in the root of the project
  - see *.env.sample* or ask me for an env
  - if you want to run in development mode add *.env* in the root of the FE app */webapp*
- in the root of the project run `docker compose -f docker-compose.prod.yml up`
- for development mode run `docker compose -f docker-compose.dev.yml up --watch`
- after the app starts w/ the db, in the root of the FE app */webapp* run `npx prisma db push`
- restore the db data from sql file or login with google or github to create a new user and create your own data. If you do this, first you need to change your role to ADMIN in the settings page.
- If you try to login with credentials, first register with the same email that you used for for [Resend](https://resend.com/)

## Backup and restore postgres databeses in docker

```sh
docker exec -t your-db-container pg_dumpall -c -U db-user > ./db-export/dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql
```

### gzip

```sh
docker exec -t your-db-container pg_dumpall -c -U db-user | gzip > ./db-export/dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql.gz
```

### brotli or bzip2

```sh
docker exec -t your-db-container pg_dumpall -c -U db-user | brotli --best > ./db-export/dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql.br
```

```sh
docker exec -t your-db-container pg_dumpall -c -U db-user | bzip2 --best > ./db-export/dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql.bz2
```

### Restore

```sh
cat ./db-export/your_dump.sql | docker exec -i your-db-container psql -U db-user
```
