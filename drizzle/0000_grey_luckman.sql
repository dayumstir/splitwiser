CREATE TABLE IF NOT EXISTS "expense" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"paid_by" integer NOT NULL,
	"trip_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expense_participants" (
	"expense_id" integer,
	"user_id" integer,
	"amount_owed" numeric(10, 2) NOT NULL,
	CONSTRAINT "expense_participants_expense_id_user_id_pk" PRIMARY KEY("expense_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trip" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"currency" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"categories" varchar[],
	"creator_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense" ADD CONSTRAINT "expense_paid_by_user_id_fk" FOREIGN KEY ("paid_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense" ADD CONSTRAINT "expense_trip_id_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_participants" ADD CONSTRAINT "expense_participants_expense_id_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_participants" ADD CONSTRAINT "expense_participants_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip" ADD CONSTRAINT "trip_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
