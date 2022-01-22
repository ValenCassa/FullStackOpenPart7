import { Input, Container, Box, Text, Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem, Textarea, IconButton, Button } from '@chakra-ui/react';
import { createAction, logOut } from '../reducers/blogReducer';
import { IoMdSend } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react';

export const CreateBlog = ({ handleBlogSubmit, titleValue, blogValue }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex='1' textAlign='left' fontSize='16px' fontWeight='400'>Want to create a blog?</Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <form onSubmit={handleBlogSubmit}>
          <Input name={titleValue} mb={2} fontSize='16px' fontWeight='600' placeholder='Write the title here...' id='blog_title'/> 
          <Textarea name={blogValue} fontSize='14px' placeholder='Start writing here...' id='blog_content'/>
          <IconButton type="submit" id='blog_submit' w='80px' mt={4} _hover={{ backgroundColor: '#482ff7' }} backgroundColor='#2d6cdf' icon={<IoMdSend color='white'/>}/>
        </form>
      </AccordionPanel>
    </AccordionItem>
  )
}

const CreateBlogSection = () => {

  const toast = useToast()

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const content = event.target.blog.value

    const newBlog ={
      title,
      content,
      author: user.name
    }

    const clear = () => {
      event.target.title.value = ''
      event.target.blog.value = ''
    }
    
    try {
      dispatch(createAction(newBlog))
      toast({
        title: 'Blog created succesfully',
        description: 'Congratulations!',
        status: 'success',
        duration: 1000,
        isClosable: true
      })
      clear()
    } catch(exception) {
      toast({
        title: 'Error while creating a Blog',
        description: 'Try again',
        status: 'error',
        duration: 1000,
        isClosable: true
      })
      clear()
    }

  }

  const handleLogOut = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    dispatch(logOut())
  }

    
  return (
    <Container maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
      <Container fontFamily='CreatoDisplay' maxW={{ base: 'container.sm', md: 'container.lg' }} mt={10} py={3}>
        <Box>
          <Box display='flex'>
            <Text flex='1' fontWeight='600' fontSize='20px' mb={4}>Welcome {user.username}!</Text>
            <Button size='sm' colorScheme='red' onClick={handleLogOut}>Log Out</Button>
          </Box>
          <Accordion allowMultiple>
            <CreateBlog titleValue='title' blogValue='blog' handleBlogSubmit={addBlog}/>

          </Accordion>
        </Box>
      </Container>
    </Container>
  )
}

export default CreateBlogSection