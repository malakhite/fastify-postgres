import { UserMeta } from './users.model';

export class CreateUserMetaDto {
	meta_type!: string;
	meta_data!: string;
}

export class CreateUserDto {
	email!: string;
	name!: string;
	password!: string;
	meta?: CreateUserMetaDto[];
}
