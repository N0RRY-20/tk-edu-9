CREATE TABLE "classrooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(64) NOT NULL,
	"teacher_name" varchar(256),
	"academic_year" varchar(16),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "parents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"phone" varchar(64),
	"address" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "student_parent_relations" (
	"student_id" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"relation" varchar(64) NOT NULL,
	CONSTRAINT "student_parent_relations_student_id_parent_id_relation_pk" PRIMARY KEY("student_id","parent_id","relation")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"nis" varchar(32) NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"nickname" varchar(128),
	"birth_date" date,
	"gender" varchar(16),
	"class_group" varchar(32),
	"admission_date" date,
	"address" text,
	"photo_url" text,
	"medical_notes" text,
	"allergies" text,
	"is_active" boolean DEFAULT true,
	"extra" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "students_nis_unique" UNIQUE("nis")
);
--> statement-breakpoint
ALTER TABLE "student_parent_relations" ADD CONSTRAINT "student_parent_relations_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_parent_relations" ADD CONSTRAINT "student_parent_relations_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE cascade ON UPDATE no action;