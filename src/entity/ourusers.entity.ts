import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { LogsInterface } from "./../../config/interfaces/app.interfaces";

@Entity()
class OurUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true,length: 100})
  title: string;

  @Column("varchar", { nullable: true, length: 100 })
  title_eng: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("text", { nullable: true })
  description_eng: string;

  @Column("timestamp", { nullable: true })
  createdAt: Date;

  @Column("timestamp", { nullable: true })
  updatedAt: Date;

  @Column("timestamp", { nullable: true })
  cooperation_start_date: Date;

  @Column("integer",{ nullable: true})
  position: number;
  
  @Column("varchar",{ nullable: true,length: 200})
  profile_link: string;

}

export default OurUsers;
