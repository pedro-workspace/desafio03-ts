import { Text, Box, Center, Button, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import { api } from "../api"

interface UserData {
    email: string
    name: string
}

const ContaInfo = () => {
    const [ userData, setUserData ] = useState<UserData | null>(null)
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    // Se não estiver logado, redireciona para home
    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])

    // Busca os dados do usuário
    useEffect(() => {
        const getData = async () => {
            const data: any = await api
            setUserData({
                email: data.email,
                name: data.name
            })
        }

        if(isLoggedIn) {
            getData()
        }
    }, [isLoggedIn])

    const handleLogout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('diobank')
        navigate('/')
    }

    if(!isLoggedIn) {
        return null
    }
  
    return (
        <Box padding="25px">
            <VStack spacing={4} align="start">
                <Text fontSize='3xl' fontWeight='bold'>
                    Informações da Conta
                </Text>
                
                {userData && (
                    <>
                        <Box>
                            <Text fontSize='lg' fontWeight='bold'>Nome:</Text>
                            <Text fontSize='md'>{userData.name}</Text>
                        </Box>
                        <Box>
                            <Text fontSize='lg' fontWeight='bold'>Email:</Text>
                            <Text fontSize='md'>{userData.email}</Text>
                        </Box>
                    </>
                )}

                <Center paddingTop="16px">
                    <Button 
                        colorScheme="red" 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Center>
            </VStack>
        </Box>
    )
}

export default ContaInfo
