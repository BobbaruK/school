# Instructions

You will need a [Resend](https://resend.com/) account if you login with credentials.

- add _.env_ in the root of the project
  - see _.env.sample_ or ask me for an env
  - if you want to run in development mode add _.env_ in the root of the FE app _/webapp_
- in the root of the project run `docker compose -f docker-compose.prod.yml up`
- for development mode run `docker compose -f docker-compose.dev.yml up --watch`
- after the app and the db starts:

  - if you want to add your own data:
    - in the root of the FE app _/webapp_ run `npx prisma db push`.
    - Then login with google or github to create a new user. It will have a role of _USER_ which you can change it from the settings

  OR

  - restore the db data from sql file and login with OAuth or register to login with credentials\*.

\* If you try to login with credentials, register with the same email that you used for [Resend](https://resend.com/)\*\*

\*\* With a free account at [Resend](https://resend.com/) you have a monthly limit of 3000 emails and daily of 100, which is great. But you can only send emails to the email linked to the Resend account except if add a domain which I do not own. This is important for things like: verifying email, reset password, 2FA and change your email address.

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

- **db-user**: scsseco
- **your-db-container**: check docker desktop or `docker ps -a`
- **your_dump**: dump_2024-09-21_00_30_33
