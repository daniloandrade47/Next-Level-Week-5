import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UserRepository";

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string){
    //const usersRepository =  getCustomRepository(UsersRepository);
    
    // Verificar se usuário existe
    const userExists = await this.usersRepository.findOne({
      email,
    });

    // Se existir, retornar user
    if(userExists) {
      return userExists;
    }

    // Se não existir, salvar no BD
    const user =  this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);
    
return user;
  }
}

export { UsersService };