import type { IUsersRepository } from './users.repository';

const usersService = async (usersRepository: IUsersRepository) => {
	return {
		async findAllUsers() {
			return await usersRepository.findAll();
		},
	};
};

export default usersService;
