export class User {

  constructor(public email: string,
              public name: string,
              private password: string) {
  }

  matches(another: User): boolean {
    return  another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
  }

}

export const users: {[key: string]: User} = {
  'fulano@gmail.com': new User('fulano@gmail.com', 'Fulano da Silva', 'fulano'),
  'ciclano@gmail.com': new User('ciclano@gmail.com', 'ciclano Fizz', 'ciclano')
};
