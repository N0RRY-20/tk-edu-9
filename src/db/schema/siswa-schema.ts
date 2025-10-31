// drizzle-schema-siswa-tk.ts
// Schema Drizzle (Postgres) untuk data siswa, orang tua, dan kelas.

import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  timestamp,
  integer,
  json,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth-schema";

// ========================================================
// Schema: Tabel Siswa (students)
// ========================================================
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  nis: varchar("nis", { length: 32 }).notNull().unique(),
  full_name: varchar("full_name", { length: 256 }).notNull(),
  nickname: varchar("nickname", { length: 128 }),
  birth_date: date("birth_date"),
  gender: varchar("gender", { length: 16 }), // 'Laki-laki' | 'Perempuan'
  class_group: varchar("class_group", { length: 32 }), // mis. "TK A" atau "TK B"
  admission_date: date("admission_date"),
  address: text("address"),
  photo_url: text("photo_url"),
  medical_notes: text("medical_notes"),
  allergies: text("allergies"),
  is_active: boolean("is_active").default(true),
  extra: json("extra"),
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at").default(sql`now()`),
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;

// ========================================================
// Schema: Tabel Kelas (classrooms)
// ========================================================
export const classrooms = pgTable("classrooms", {
  id: serial("id").primaryKey(),
  class_name: varchar("class_name", { length: 64 }).notNull(),
  teacher_name: varchar("teacher_name", { length: 256 }),
  academic_year: varchar("academic_year", { length: 16 }),
  created_at: timestamp("created_at").default(sql`now()`),
});

export type Classroom = typeof classrooms.$inferSelect;
export type NewClassroom = typeof classrooms.$inferInsert;

// ========================================================
// Schema: Tabel Orang Tua / Wali (parents)
// ========================================================
export const parents = pgTable("parents", {
  id: serial("id").primaryKey(),
  // Terhubung dengan tabel user untuk login (opsional)
  user_id: text("user_id").references(() => user.id, { onDelete: "set null" }),
  name: varchar("name", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  address: text("address"),
  created_at: timestamp("created_at").default(sql`now()`),
});

export type Parent = typeof parents.$inferSelect;
export type NewParent = typeof parents.$inferInsert;

// ========================================================
// Schema: Tabel Relasi Siswa dan Orang Tua (student_parent_relations)
// Many-to-Many Relationship
// ========================================================
export const studentParentRelations = pgTable(
  "student_parent_relations",
  {
    student_id: integer("student_id")
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    parent_id: integer("parent_id")
      .notNull()
      .references(() => parents.id, { onDelete: "cascade" }),
    relation: varchar("relation", { length: 64 }).notNull(), // mis. "Ayah", "Ibu", "Wali"
  },
  (t) => ({
    pk: primaryKey({ columns: [t.student_id, t.parent_id, t.relation] }),
  })
);
