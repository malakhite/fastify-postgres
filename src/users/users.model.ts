import { BaseModel } from "../common/common.model";

export class User extends BaseModel {
  id!: string;
  email!: string;
  name!: string;
  password!: string;
}
