import type { IBaseRepository } from '../common/common.repository';
import { User } from './users.model';

export interface IUsersRepository extends IBaseRepository<User> {
	findUserById(id: string): User;
	findUserByEmail(email: string): User;
}
