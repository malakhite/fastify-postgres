import { BaseModel } from '../common/common.model';

export interface IUserMeta {
	id: string;
	user_id: string;
	meta_type: string;
	meta_data: string;
}

export class UserMeta implements IUserMeta {
	id: string;
	user_id: string;
	meta_type: string;
	meta_data: string;

	private constructor(userMeta: IUserMeta) {
		this.id = userMeta.id;
		this.user_id = userMeta.user_id;
		this.meta_type = userMeta.meta_type;
		this.meta_data = userMeta.meta_data;
	}
}

export interface IUser {
	id: string;
	email: string;
	name: string;
	password: string;
	active: boolean;
	meta?: IUserMeta[];
}

export class User extends BaseModel {
	id!: string;
	email!: string;
	name!: string;
	password!: string;
	active!: boolean;
	meta?: UserMeta[];
}
