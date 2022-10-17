import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { LogsInterface } from "./../../config/interfaces/app.interfaces";

@Entity()
export class Logs implements LogsInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  apiName: string;

  @Column("text", { nullable: true })
  errorMessage: string;

  @Column("text", { nullable: true })
  remoteIp: string;

  @Column("text", { nullable: false })
  localeIp: string;
}
