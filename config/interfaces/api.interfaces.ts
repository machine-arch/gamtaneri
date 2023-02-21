import { NextApiResponse } from "next";
import AboutUs from "../../src/entity/aboutus.entity";
import Contacts from "../../src/entity/contacts.entity";
import ComplatedProjects from "./../../src/entity/complatedprojects.entity";
import OurUsers from "../../src/entity/ourusers.entity";

export interface apiResponseInterface {
  res: NextApiResponse;
  message: string;
  status: number;
  success: boolean;
  from: string;
  total?: number;
  resource?:
    | AboutUs[]
    | AboutUs
    | Contacts[]
    | Contacts
    | ComplatedProjects[]
    | ComplatedProjects
    | OurUsers[]
    | OurUsers
    | null;
}
