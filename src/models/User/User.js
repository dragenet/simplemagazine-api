import bcrypt from 'bcrypt'

export class User {
  constructor(obj, validate) {
    Object.assign(this, obj)
    this.createPasswordHash()
    if (validate) obj = this.validateFields(validate)
  }

  validateFields(validate) {
    validate.forEach(el => {
      if (el === 'all' || el === 'name') this.nameValidate()
      if (el === 'all' || el === 'email') this.emailValidate()
      if (el === 'all' || el === 'password') this.passwordValidate()
    })
  }

  nameValidate() {
    if (!this.name) {
      throw new Error('Name invalid')
    }
  }

  emailValidate() {
    if (!this.email) {
      throw new Error('Email invalid')
    }
  }

  passwordValidate() {
    if (!this.password) {
      throw new Error('Password invalid')
    }
  }

  createPasswordHash() {
    if (this.password && !this.passwordHash) {
      const saltRounds = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS)
      this.passwordHash = bcrypt.hashSync(this.password, saltRounds)
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

  extend(obj) {
    Object.assign(this, { ...this, ...obj })
  }
}
