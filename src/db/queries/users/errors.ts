export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Usuário já existe, por favor use outro email.')
    this.name = 'UserAlreadyExistsError'
  }
}
