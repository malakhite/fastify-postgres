import Model from '../../common/Model';

export class UserMeta {
	id!: string;
	user_id!: string;
	meta_type!: string;
	meta_data!: string;
}

export class User extends Model {
	id!: string;
	email!: string;
	name!: string;
	password!: string;
	active!: boolean;
	meta?: UserMeta[];
}
