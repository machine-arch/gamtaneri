import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { UserInterface } from "./../../config/interfaces/app.interfaces";

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  firstName: string;

  @Column("text", { nullable: true })
  lastName: string;

  @Column("text", { nullable: true })
  @Index({ unique: true })
  email: string;

  @Column("text", { nullable: false })
  password: string;

  @Column("timestamp", { nullable: true })
  createdAt: Date;

  @Column("timestamp", { nullable: true })
  updatedAt: Date;

  @Column("text", { nullable: true })
  ip: string;

  @Column("text", { nullable: true })
  token: string;

  @Column("timestamp", { nullable: true })
  tokenExpire: Date;
}
