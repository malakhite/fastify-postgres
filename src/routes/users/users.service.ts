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
		return await this.usersRepository.findAllUsers();
	}
}
