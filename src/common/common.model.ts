export abstract class BaseModel {
  active!: boolean;
  created_date!: Date;
  modified_date!: Date | null;
  deleted_date!: Date | null;
}
