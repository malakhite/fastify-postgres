export abstract class BaseModel {
	created_date!: Date;
	modified_date!: Date | null;
	deleted_date!: Date | null;
}
