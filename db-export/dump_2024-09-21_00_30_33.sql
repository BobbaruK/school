--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE school_db;
DROP DATABASE scsseco;




--
-- Drop roles
--

DROP ROLE scsseco;


--
-- Roles
--

CREATE ROLE scsseco;
ALTER ROLE scsseco WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:FmK1GwZZY9/GujXZPffwPA==$fUnyuWwDe9uVtSZ25wqsTqIK4Gn5gK935qWQuBDGD8U=:nNrhLGI7k4/d6Ftyo3xLeIpFT3265ZJblrj6gsddyOs=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: scsseco
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO scsseco;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: scsseco
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: scsseco
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: scsseco
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: scsseco
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO scsseco;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: scsseco
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "school_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: school_db; Type: DATABASE; Schema: -; Owner: scsseco
--

CREATE DATABASE school_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE school_db OWNER TO scsseco;

\connect school_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Subject; Type: TYPE; Schema: public; Owner: scsseco
--

CREATE TYPE public."Subject" AS ENUM (
    'Mathematics',
    'English',
    'Arabic',
    'History',
    'Geography'
);


ALTER TYPE public."Subject" OWNER TO scsseco;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: scsseco
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."UserRole" OWNER TO scsseco;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: scsseco
--

CREATE TABLE public."Account" (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO scsseco;

--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: scsseco
--

CREATE TABLE public."PasswordResetToken" (
    id text NOT NULL,
    email text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PasswordResetToken" OWNER TO scsseco;

--
-- Name: Teacher; Type: TABLE; Schema: public; Owner: scsseco
--

CREATE TABLE public."Teacher" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    avatar text,
    subject public."Subject" DEFAULT 'English'::public."Subject" NOT NULL,
    "dateOfBirth" timestamp(3) without time zone,
    "numberOfClasses" integer NOT NULL,
    "reviewScore" double precision NOT NULL
);


ALTER TABLE public."Teacher" OWNER TO scsseco;

--
-- Name: TwoFactorConfirmation; Type: TABLE; Schema: public; Owner: scsseco
--

CREATE TABLE public."TwoFactorConfirmation" (
    id text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."TwoFactorConfirmation" OWNER TO scsseco;

--
-- Name: TwoFactorToken; Type: TABLE; Schema: public; Owner: scsseco
--

CREATE TABLE public."TwoFactorToken" (
    id text NOT NULL,
    email text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TwoFactorToken" OWNER TO scsseco;

--
-- Name: User; Type: TABLE; Schema: public; Owner: scsseco
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isTwoFactorEnabled" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO scsseco;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: scsseco
--

CREATE TABLE public."VerificationToken" (
    id text NOT NULL,
    email text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO scsseco;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: scsseco
--

COPY public."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: PasswordResetToken; Type: TABLE DATA; Schema: public; Owner: scsseco
--

COPY public."PasswordResetToken" (id, email, token, expires) FROM stdin;
\.


--
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: scsseco
--

COPY public."Teacher" (id, "createdAt", "firstName", "lastName", email, avatar, subject, "dateOfBirth", "numberOfClasses", "reviewScore") FROM stdin;
cm1b6iruz0001d6nis1q0i3l9	2024-09-20 20:34:33.996	Dianne	Russell	russell@mail.com	\N	Mathematics	\N	4	2.3
cm1b6zy790004eu8tofo5n4kl	2024-09-20 20:47:55.366	Arlene	mccoy	mccoy@mail.com	\N	Geography	\N	18	3.8
cm1b72slx0009eu8tuuh4ncqh	2024-09-20 20:50:08.085	Annette	Black	black@mail.com	https://avatar.iran.liara.run/public/girl?username=Annette	English	\N	7	2.1
cm1b72fsy0008eu8ttfir6ke3	2024-09-20 20:49:51.49	Courtney	Henry	henry@mail.com	https://avatar.iran.liara.run/public/girl?username=Courtney	Arabic	\N	15	4.2
cm1b71vs10007eu8t3ot6npmh	2024-09-20 20:49:25.537	Jane	Cooper	cooperj@mail.com	https://avatar.iran.liara.run/public/girl?username=Jane	History	\N	2	1.5
cm1b713020006eu8tr16k1rpg	2024-09-20 20:48:48.242	Floyd	Miles	miles@mail.com	https://avatar.iran.liara.run/public/boy?username=Floyd	Geography	\N	17	4.5
cm1b70k8u0005eu8tqtg955m7	2024-09-20 20:48:23.935	Guy	Hawkins	hawkins@mail.com	https://avatar.iran.liara.run/public/boy?username=Guy	Mathematics	\N	8	3
cm1b6yenw0002eu8tcftvvquw	2024-09-20 20:46:43.389	Jerome	Bell	bell@mail.com	https://avatar.iran.liara.run/public/boy?username=Jerome	History	\N	2	2.2
cm1b6xvc40001eu8tx7nx9zeq	2024-09-20 20:46:18.34	Marvin	McKinney	mcknney@mail.com	https://avatar.iran.liara.run/public?username=Marvin	Arabic	\N	6	4.2
cm1b6xalj0000eu8tiheflo7v	2024-09-20 20:45:51.463	Bessie	Cooper	cooper@mail.com	https://avatar.iran.liara.run/public/girl?username=Bessie	English	\N	2	0.9
cm1b86kpe0003ipcjmlpl1yx3	2024-09-20 21:21:04.082	Dereece	Lucas	lucas@mail.com	https://avatar.iran.liara.run/public/girl?username=Dereece	English	\N	13	4.5
cm1b865qw0002ipcjb7po640z	2024-09-20 21:20:44.696	Keifon	Berry	berry@mail.com	https://avatar.iran.liara.run/public/boy?username=Keifon	Geography	\N	20	0.8
cm1b86wrl0004ipcj97cizp3s	2024-09-20 21:21:19.714	Tavell	Cross	cross@mail.com	\N	Mathematics	\N	20	2
cm1b876so0005ipcjd44jceto	2024-09-20 21:21:32.712	Marquise	Bonner	bonner@mail.com	https://avatar.iran.liara.run/public/boy?username=Marquise	Arabic	\N	19	4.7
\.


--
-- Data for Name: TwoFactorConfirmation; Type: TABLE DATA; Schema: public; Owner: scsseco
--

COPY public."TwoFactorConfirmation" (id, "userId") FROM stdin;
\.


--
-- Data for Name: TwoFactorToken; Type: TABLE DATA; Schema: public; Owner: scsseco
--

COPY public."TwoFactorToken" (id, email, token, expires) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: scsseco
--

COPY public."User" (id, name, email, password, role, "emailVerified", image, "createdAt", "updatedAt", "isTwoFactorEnabled") FROM stdin;
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: scsseco
--

COPY public."VerificationToken" (id, email, token, expires) FROM stdin;
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY (id);


--
-- Name: Teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY (id);


--
-- Name: TwoFactorConfirmation TwoFactorConfirmation_pkey; Type: CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."TwoFactorConfirmation"
    ADD CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY (id);


--
-- Name: TwoFactorToken TwoFactorToken_pkey; Type: CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."TwoFactorToken"
    ADD CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken_email_token_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON public."PasswordResetToken" USING btree (email, token);


--
-- Name: PasswordResetToken_token_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON public."PasswordResetToken" USING btree (token);


--
-- Name: Teacher_email_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "Teacher_email_key" ON public."Teacher" USING btree (email);


--
-- Name: Teacher_id_email_reviewScore_idx; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE INDEX "Teacher_id_email_reviewScore_idx" ON public."Teacher" USING btree (id, email, "reviewScore");


--
-- Name: TwoFactorConfirmation_userId_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON public."TwoFactorConfirmation" USING btree ("userId");


--
-- Name: TwoFactorToken_email_token_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON public."TwoFactorToken" USING btree (email, token);


--
-- Name: TwoFactorToken_token_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON public."TwoFactorToken" USING btree (token);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_email_token_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON public."VerificationToken" USING btree (email, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: scsseco
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TwoFactorConfirmation TwoFactorConfirmation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scsseco
--

ALTER TABLE ONLY public."TwoFactorConfirmation"
    ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "scsseco" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: scsseco; Type: DATABASE; Schema: -; Owner: scsseco
--

CREATE DATABASE scsseco WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE scsseco OWNER TO scsseco;

\connect scsseco

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

