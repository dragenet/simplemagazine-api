import bcrypt from 'bcrypt'

export class User {
  constructor(obj, validate = false) {
    if (validate) obj = this.validateFields(obj)
    obj.passwordHash = this.createPasswordHash(obj.password, obj.passwordHash)
    Object.assign(this, obj)
  }

  validateFields(obj) {
    obj.name = this.nameValidate(obj.name)
    obj.email = this.emailValidate(obj.email)
    return obj
  }
  res
  nameValidate(name) {
    if (name) {
      return name
    } else {
      throw new Error('Name invalid')
    }
  }

  emailValidate(email) {
    if (email) {
      return email
    } else {
      throw new Error('Email invalid')
    }
  }

  createPasswordHash(password, passwordHash) {
    if (passwordHash) {
      return passwordHash
    } else if (password) {
      const saltRounds = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS)
      const res = bcrypt.hashSync(password, saltRounds)
      return res
    } else {
      return undefined
    }
  }

  getDangerously() {
    const tmp = Object.assign({}, this)
    delete tmp['password']
    return tmp
  }

  get() {
    const tmp = Object.assign({}, this)
    delete tmp['password']
    delete tmp['passwordHash']
    return tmp
  }

  async verifyPassword() {
    const res = await bcrypt.compare(this.password, this.passwordHash)
    return res
  }
}
