import { User } from './users.model';
import UsersRepository from './users.repository';

interface UsersServiceOptions {
	usersRepository: UsersRepository;
}

export default class UsersService {
	private usersRepository: UsersRepository;

	constructor({ usersRepository }: UsersServiceOptions) {
		this.usersRepository = usersRepository;
	}

	async findAllUsers() {
		return await this.usersRepository.find();
	}

	async findUserById(id: string): Promise<User> {
		return await this.usersRepository.find({ column: 'id', predicate: id })[0];
	}

	async findUserByEmail(email: string): Promise<User> {
		return await this.usersRepository.find({
			column: 'email',
			predicate: email,
		})[0];
	}
}
