ALTER TABLE "members_shipRequest" DROP CONSTRAINT "members_shipRequest_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "members_shipRequest" ADD CONSTRAINT "members_shipRequest_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;