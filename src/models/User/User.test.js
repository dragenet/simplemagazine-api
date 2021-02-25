import { User } from './User'
import bcrypt from 'bcrypt'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('User model', () => {
  it('Check user returned value when password specified using getDangerously', () => {
    console.log('Create User')
    const user = new User({
      name: 'John',
      email: 'john@doe.jd',
      password: 'aaa',
    })

    expect(user.getDangerously()).toMatchObject({
      name: 'John',
      email: 'john@doe.jd',
      passwordHash: expect.any(String),
    })
  })

  it('Check user returned value when passwordHash specified using getDangerously', () => {
    const user = new User({
      id: 21,
      name: 'John',
      email: 'john@doe.jd',
      passwordHash: 'awensomePasswordHash',
    })
    expect(user.getDangerously()).toMatchObject({
      id: 21,
      name: 'John',
      email: 'john@doe.jd',
      passwordHash: 'awensomePasswordHash',
    })
  })

  it('Check user returned object without passwordHash when using secure get ', () => {
    const user = new User({
      id: 10,
      name: 'John',
      email: 'john@doe.jd',
      passwordHash: 'awensomePasswordHash',
    })
    expect(user.get()).toStrictEqual({
      id: 10,
      name: 'John',
      email: 'john@doe.jd',
    })
  })

  it('Check user error throwing when user null or undefined', () => {
    const createUserNull = () => {
      return new User({ email: 'john@doe.jd', password: 'aaa' }, ['all'])
    }

    const createUserUndefined = () => {
      return new User({ email: 'john@doe.jd', password: 'aaa' }, ['all'])
    }

    expect(createUserNull).toThrowError(new Error('Name invalid'))
    expect(createUserUndefined).toThrowError(new Error('Name invalid'))
  })

  it('Check user error throwing when email null or undefined', () => {
    const createUserNull = () => {
      return new User({ name: 'John', email: null, password: 'aaa' }, ['all'])
    }

    const createUserUndefined = () => {
      return new User({ name: 'John', password: 'aaa' }, ['all'])
    }

    expect(createUserNull).toThrowError(new Error('Email invalid'))
    expect(createUserUndefined).toThrowError(new Error('Email invalid'))
  })

  it('Check user password verification with correct password', async () => {
    const hash = await bcrypt.hash('superPassword', 10)
    const user = new User({
      name: 'John',
      email: 'john@doe.jd',
      password: 'superPassword',
      passwordHash: hash,
    })
    const res = await user.verifyPassword()
    expect(res).toBeTruthy()
  })

  it('Check user password verification with incorrect password', async () => {
    const hash = await bcrypt.hash('superAwensomePassword', 10)
    const user = new User({
      name: 'John',
      email: 'john@doe.jd',
      password: 'superPassword',
      passwordHash: hash,
    })
    const res = await user.verifyPassword()
    expect(res).toBeFalsy()
  })
})
