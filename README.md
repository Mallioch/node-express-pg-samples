# PostgreSQL Samples

## Environment

You'll need Postgres running. This project uses `dotenv`, so create a `.env` file with the values appropriate for you.

```
PGHOST='localhost'
PGDATABASE=Samples
PGPASSWORD=null
PGPORT=5432
PORT=6001
```

## Schema

You'll need tables that match the following schema.

```
CREATE TABLE public.person
(
    person_id integer NOT NULL DEFAULT nextval('"Person_PersonId_seq"'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    age smallint,
    CONSTRAINT "Person_pkey" PRIMARY KEY (person_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.person
    OWNER to postgres;
```
