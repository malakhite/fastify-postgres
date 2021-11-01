export class UserMeta {
	id!: string;
	user_id!: string;
	meta_type!: string;
	meta_data!: string;
}

export class User {
	id!: string;
	email!: string;
	name!: string;
	password!: string;
	active!: boolean;
	meta?: UserMeta[];
	created_date!: Date;
	modified_date!: Date | null;
	deleted_date!: Date | null;
}
