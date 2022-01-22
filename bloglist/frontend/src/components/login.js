import React from 'react'
import { Box, Text, Input, Container, Divider, IconButton, InputGroup, InputRightElement, Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem } from '@chakra-ui/react'
import { BiSend } from 'react-icons/bi'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showLogAction, showRegAction, loginAction, registerAction } from '../reducers/blogReducer'
import { useToast } from '@chakra-ui/react'

const StyledInput = ({ placeholder, ...props }) => {
  return (
    <Input  _focus={{ outline: 'none' }} p={2.5} fontFamily='CreatoDisplay' fontWeight='500' placeholder={placeholder} backgroundColor='#E0E0E0' _placeholder={{ 'color': '#A7A7A7', fontWeight: '400' }} {...props}/>
  )
}

const StyledButton = ({ ...props }) => {
  return (
    <IconButton mt={3} _hover={{ backgroundColor: '#482ff7' }} w='100%' backgroundColor='#2d6cdf' icon={<BiSend color='white'/>} {...props}/>
  )
}

const StyledPass = ({ children, ...props }) => {

  return (
    <InputGroup>
      <Input _focus={{ outline: 'none' }} p={2.5} fontFamily='CreatoDisplay' fontWeight='500' placeholder='password...' backgroundColor='#E0E0E0' _placeholder={{ 'color': '#A7A7A7', fontWeight: '400' }} {...props} />
      <InputRightElement>
        {children}
      </InputRightElement>
    </InputGroup>
  )
}

const LoginForm = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const toast = useToast()

  const handleLogClick = () => {
    dispatch(showLogAction())
  }

  const handleRegClick = () => {
    dispatch(showRegAction())
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const username = event.target.logUsername.value
    const password = event.target.logPassword.value

    const logUser = {
      username,
      password
    }

    try {
      dispatch(loginAction(logUser))
      toast({
        title: 'Succesful Log-in',
        description: 'Have fun!',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch(exception) {
      toast({
        title: 'Invalid credentials',
        description: 'Try again',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }

  }

  const handleRegister = (event) => {
    event.preventDefault()


    const username = event.target.regUsername.value
    const name = event.target.name.value
    const password = event.target.regPassword.value

    const clear = () => {
      event.target.regUsername.value = ''
      event.target.name.value = ''
      event.target.regPassword.value = ''
    }

    const user = {
      username,
      name,
      password
    }
    try {
      dispatch(registerAction(user))
      toast({
        title: 'Succesful Register',
        description: 'You can now log in!',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

      clear()

    } catch(exception) {
      toast({
        title: 'Something went wrong',
        description: 'Try again',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      clear()
    }

  }

  return (
        
    <Container maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB' mt={8}>
      <Accordion allowMultiple border='white' outline='none'>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' fontSize='18px' fontWeight='600' textAlign='center'>Log in / Register</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Container maxW={{ base: 'container.sm', md: 'container.lg' }}py={3} justifyContent='center'>
              <Box display={{ base: 'block', md: 'flex' }} justifyContent='center' >
                <form onSubmit={handleLogin}>
                  <Box mb={{ base: '20px', md: 'unset' }}>
                    <Text textAlign='center' mb={2} fontFamily='CreatoDisplay' fontWeight='600' fontSize='18px' color='#E4487C'>Log in</Text>
                    <StyledInput placeholder='username...' mb={3} name='logUsername' id='username'/>
                    <br/>
                                
                    <StyledPass name='logPassword' id='password' type={state.show.login ? 'text' : 'password'}><IconButton size='sm' h='68%' colorScheme={state.show.login ? 'red' : 'blue'} onClick={handleLogClick} icon={state.show.login ? <AiFillEyeInvisible /> : <AiFillEye />}/></StyledPass>
                    <StyledButton type='submit' id='login-button'/>
                  </Box>
                </form>
                <Divider orientation='vertical' width='2px' mx={4} backgroundColor='black'/>
                <form onSubmit={handleRegister}>
                  <Box>
                    <Text textAlign='center' mb={2} fontFamily='CreatoDisplay' fontWeight='600' fontSize='18px' color='black'>Register</Text>
                    <Box display='flex' mb={3}>
                      <StyledInput placeholder='username...' mr={4} name='regUsername' id='reg_username'/>
                      <StyledInput placeholder='name...' name='name' id='reg_name'/>
                    </Box>
                    <StyledPass name='regPassword' id='reg_pass' type={state.show.register ? 'text' : 'password'}><IconButton size='sm' h='68%' colorScheme={state.show.register ? 'red' : 'blue'} onClick={handleRegClick} icon={state.show.register ? <AiFillEyeInvisible /> : <AiFillEye />}/></StyledPass>
                    <StyledButton type='submit' id='reg_submit'/>
                  </Box>
                </form>
              </Box>
            </Container>
          </AccordionPanel>
        </AccordionItem>

      </Accordion>

    </Container>
  )
}

export default LoginForm