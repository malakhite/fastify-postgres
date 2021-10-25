export default abstract class Model {
	created_date!: Date;
	modified_date!: Date | null;
	deleted_date!: Date | null;
}
