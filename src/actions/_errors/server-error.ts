export class ServerError extends Error {
  constructor() {
    super('Algo deu errado, por favor tente novamente mais tarde.')
    this.name = 'ServerError'
  }
}
