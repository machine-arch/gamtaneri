import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { LogsInterface } from "./../../config/interfaces/app.interfaces";

@Entity()
class ComplatedProjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: false,length: 150 })
  project_name: string;

  @Column("varchar", { nullable: false, length: 150 })
  project_name_eng: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("text", { nullable: true })
  description_eng: string;

  @Column("timestamp", { nullable: true })
  createdAt: Date;

  @Column("timestamp", { nullable: true })
  updatedAt: Date;

  @Column("varchar", { nullable: true,length: 300 })
  images: string;

  @Column("integer", { nullable: true })
  position: number;

}

export default ComplatedProjects;
