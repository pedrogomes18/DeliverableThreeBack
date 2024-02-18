interface ICreateUserDTO {
  name: string;
  birth_date: Date;
  email:string;
  cpf: string;
  phone: string;
  password: string;
}

export default ICreateUserDTO;
