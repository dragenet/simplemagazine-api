import bcrypt from 'bcrypt'

class User {
  constructor(name, email, password, passwordHash, id) {
    this.name = this.nameValidate(name)
    this.email = this.emailValidate(email)
    this.password = password
    this.passwordHash = this.createPasswordHash(password, passwordHash)
    this.id = id
  }

  nameValidate(name) {
    if (name && name !== null) {
      return name
    } else {
      throw new Error('Name invalid')
    }
  }

  emailValidate(email) {
    if (email && email !== null) {
      return email
    } else {
      throw new Error('Email invalid')
    }
  }

  createPasswordHash(password, passwordHash) {
    if (passwordHash && passwordHash !== null) {
      return passwordHash
    } else if (password && password !== null) {
      const saltRounds = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS)
      const res = bcrypt.hashSync(password, saltRounds)
      return res
    } else {
      return undefined
    }
  }

  getDangerously() {
    return this
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    }
  }

  async verifyPassword() {
    const res = await bcrypt.compare(this.password, this.passwordHash)
    return res
  }
}

export default User
