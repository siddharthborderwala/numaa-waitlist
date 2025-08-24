CREATE TABLE "api_usage" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip_hash" text NOT NULL,
	"endpoint" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "api_usage_ip_hash_unique" UNIQUE("ip_hash")
);
--> statement-breakpoint
CREATE TABLE "waitlist_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "ip_hash_endpoint_timestamp_index" ON "api_usage" USING btree ("ip_hash","endpoint","timestamp");