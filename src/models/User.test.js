import User from './User'
import bcrypt from 'bcrypt'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('User model', () => {
  it('Check user returned value when password specified using getDangerously', () => {
    const genHashMock = jest.spyOn(User.prototype, 'createPasswordHash')

    genHashMock.mockReturnValue('awensomeHash')

    const user = new User('John', 'john@doe.jd', 'aaa')

    expect(user.getDangerously()).toMatchObject({
      id: undefined,
      name: 'John',
      email: 'john@doe.jd',
      passwordHash: 'awensomeHash',
    })

    genHashMock.mockRestore()
  })

  it('Check user returned value when passwordHash specified using getDangerously', () => {
    const user = new User(
      'John',
      'john@doe.jd',
      null,
      'awensomePasswordHash',
      21,
    )
    expect(user.getDangerously()).toMatchObject({
      id: 21,
      name: 'John',
      email: 'john@doe.jd',
      passwordHash: 'awensomePasswordHash',
    })
  })

  it('Check user returned object without passwordHash when using secure get ', () => {
    const user = new User(
      'John',
      'john@doe.jd',
      null,
      'awensomePasswordHash',
      10,
    )
    expect(user.get()).toStrictEqual({
      id: 10,
      name: 'John',
      email: 'john@doe.jd',
    })
  })

  it('Check user error throwing when user null or undefined', () => {
    const createUserNull = () => {
      return new User(null, 'john@doe.jd', 'aaa')
    }

    const createUserUndefined = () => {
      return new User(undefined, 'john@doe.jd', 'aaa')
    }

    expect(createUserNull).toThrowError(new Error('Name invalid'))
    expect(createUserUndefined).toThrowError(new Error('Name invalid'))
  })

  it('Check user error throwing when email null or undefined', () => {
    const createUserNull = () => {
      return new User('John', null, 'aaa')
    }

    const createUserUndefined = () => {
      return new User('John', undefined, 'aaa')
    }

    expect(createUserNull).toThrowError(new Error('Email invalid'))
    expect(createUserUndefined).toThrowError(new Error('Email invalid'))
  })

  it('Check user error throwing when password and passwordHash null or undefined', () => {
    const createUserNull = () => {
      return new User('John', 'john@doe.jd', null, null)
    }

    const createUserUndefined = () => {
      return new User('John', 'john@doe.jd')
    }

    expect(createUserNull).toThrowError(
      new Error('Cannot create password hash'),
    )
    expect(createUserUndefined).toThrowError(
      new Error('Cannot create password hash'),
    )
  })

  it('Check user password verification with correct password', async () => {
    const hash = await bcrypt.hash('superPassword', 10)
    const user = new User('John', 'john@doe.jd', 'superPassword', hash)
    const res = await user.verifyPassword()
    expect(res).toBeTruthy()
  })

  it('Check user password verification with incorrect password', async () => {
    const hash = await bcrypt.hash('superAwensomePassword', 10)
    const user = new User('John', 'john@doe.jd', 'superPassword', hash)
    const res = await user.verifyPassword()
    expect(res).toBeFalsy()
  })
})
