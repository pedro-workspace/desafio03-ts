import { login } from "./login"

describe('login', () => {

    const mockEmail = 'nath@dio.bank'
    const mockPassword = '123456'
    
    it('Deve exibir um alert com boas vindas caso o email seja válido', async() => {
        const response = await login(mockEmail, mockPassword)
        expect(response.success).toBeTruthy()
        expect(response.user).toBeDefined()
        expect(response.user?.name).toBe('Nathaly Souza')
        expect(response.user?.email).toBe(mockEmail)
    })

    it('Deve exibir um erro caso o email seja inválido', async() => {
        const response = await login('email@invalido.com', mockPassword)
        expect(response.success).toBeFalsy()
        expect(response.user).toBeUndefined()
    })

    it('Deve validar que a senha está correta', async() => {
        const response = await login(mockEmail, '123456')
        expect(response.success).toBeTruthy()
    })

    it('Deve retornar falso quando a senha está incorreta', async() => {
        const response = await login(mockEmail, 'senhaErrada')
        expect(response.success).toBeFalsy()
    })

    it('Deve retornar falso quando email e senha são incorretos', async() => {
        const response = await login('email@invalido.com', 'senhaErrada')
        expect(response.success).toBeFalsy()
    })
})