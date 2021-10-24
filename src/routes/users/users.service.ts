import { UsersRepository } from './users.repository';

interface UsersServiceOptions {
	usersRepository: UsersRepository;
}

export class UsersService {
	private usersRepository: UsersRepository;

	constructor({ usersRepository }: UsersServiceOptions) {
		this.usersRepository = usersRepository;
	}

	async findAllUsers() {
		return await this.usersRepository.findAllUsers();
	}
}
