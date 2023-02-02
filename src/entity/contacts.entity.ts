import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { LogsInterface } from "./../../config/interfaces/app.interfaces";

@Entity()
class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  address: string;

  @Column("text", { nullable: true })
  address_eng: string;

  @Column("text", { nullable: true })
  email: string;

  @Column("integer", { nullable: true })
  phone: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("text", { nullable: true })
  description_eng: string;

  @Column("timestamp", { nullable: true })
  createdAt: Date;

  @Column("timestamp", { nullable: true })
  updatedAt: Date;
}

export default Contacts;
