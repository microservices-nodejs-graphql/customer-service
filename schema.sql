CREATE TABLE IF NOT EXISTS public.customer_types (
	id bigint NOT NULL,
	name varchar(30) NOT NULL,
	description varchar(200) NOT NULL,
	log_state int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.customers (
	id bigint NOT NULL,
    customer_type_id bigint NOT NULL,
	number_document varchar(20) NOT NULL,
    bussiness_name text NOT NULL,
    name varchar(30) NOT NULL,
	lastname varchar(200) NOT NULL,
	log_state int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.accounts (
	id bigint NOT NULL,
	name varchar(30) NOT NULL,
	opening_balance numeric(18,4) NOT NULL,
	log_state int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.customers_accounts (
	id bigint NOT NULL,
	customer_id bigint NOT NULL,
	account_id bigint NOT NULL,
    mount numeric(18,4) NOT NULL,
    "status" varchar(20) NOT NULL;
    log_state int NOT NULL,
	PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS public.seq_customer_types START WITH 1 INCREMENT BY 1 MAXVALUE 9999999 MINVALUE 1;
CREATE SEQUENCE IF NOT EXISTS public.seq_customers START WITH 1 INCREMENT BY 1 MAXVALUE 9999999 MINVALUE 1;
CREATE SEQUENCE IF NOT EXISTS public.seq_accounts START WITH 1 INCREMENT BY 1 MAXVALUE 9999999 MINVALUE 1;
CREATE SEQUENCE IF NOT EXISTS public.seq_customers_accounts START WITH 1 INCREMENT BY 1 MAXVALUE 9999999 MINVALUE 1;

ALTER TABLE public.customers ADD CONSTRAINT fk_customers_type_customer FOREIGN KEY (customer_type_id) REFERENCES public.customer_types (id);

ALTER TABLE public.customers_accounts ADD CONSTRAINT fk_customers_accounts_customer FOREIGN KEY (customer_id) REFERENCES public.customers (id);
ALTER TABLE public.customers_accounts ADD CONSTRAINT fk_customers_accounts_account FOREIGN KEY (account_id) REFERENCES public.accounts (id);

ALTER SEQUENCE public.seq_customer_types OWNED BY public.customer_types.id;
ALTER SEQUENCE public.seq_customers OWNED BY public.customers.id;
ALTER SEQUENCE public.seq_accounts OWNED BY public.accounts.id;
ALTER SEQUENCE public.seq_customers_accounts OWNED BY public.customers_accounts.id;