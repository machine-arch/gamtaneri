import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { LogsInterface } from "./../../config/interfaces/app.interfaces";

@Entity()
class AboutUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  title: string;

  @Column("text", { nullable: true })
  title_eng: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("text", { nullable: true })
  description_eng: string;

  @Column("timestamp", { nullable: true })
  createdAt: Date;

  @Column("timestamp", { nullable: true })
  updatedAt: Date;

  @Column("text", { nullable: true })
  image: string;
}

export default AboutUs;
