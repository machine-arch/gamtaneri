import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { LogsInterface } from "./../../config/interfaces/app.interfaces";

@Entity()
class ComplatedProjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  project_name: string;

  @Column("text", { nullable: false })
  project_name_eng: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("text", { nullable: true })
  description_eng: string;

  @Column("timestamp", { nullable: true })
  createdAt: Date;

  @Column("timestamp", { nullable: true })
  updatedAt: Date;

  @Column("text", { nullable: true })
  images: string[];
}

export default ComplatedProjects;
