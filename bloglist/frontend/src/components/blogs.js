import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Container,
  Input,
  Button,
  chakra
} from '@chakra-ui/react';
import { AiFillLike } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux';
import { filterAction, voteAction, deleteBlog } from '../reducers/blogReducer';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom'


export const BlogCard = ({ blog , user }) => {

  const toast = useToast()
  const dispatch = useDispatch()

  const handleLikes = (blog) => {

    const blogPlusLike = {...blog, likes: blog.likes + 1}
    console.log(blogPlusLike)

    dispatch(voteAction(blogPlusLike))
    
    toast({
      title: 'Thanks for the feedback!',
      status: 'success',
      duration: 1000,
      isClosable: true
    })
  }

  const handleDelete = (blog) => {

    dispatch(deleteBlog(blog.id))

    toast({
      title: 'Blog removed succesfully',
      status: 'success',
      duration: 1000,
      isClosable: true
    })
  }
  


  return (
    <Center fontFamily='CreatoDisplay' pb={3} mb={3}>
      <Box
        maxW={'650px'}
        w={'full'}
        bg='white'
        boxShadow='md'
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={600}
              fontSize={'sm'}
              letterSpacing={1.1}>
              Blog
            </Text>
            {user !== null && user.name === blog.author && 
            <Button onClick={() => handleDelete(blog)} size={'xs'} colorScheme={'red'}>Delete</Button>}
          </Box>
          <Heading
            color='gray.700'
            fontSize={'2xl'}
          >
            <Box display={'inline-block'} _hover={{'textDecoration': 'underline'}}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Box>
          </Heading>
          <Text color={'gray.500'} className='blog'>
            {blog.content}
          </Text>
        </Stack>

        <Box display={'flex'} justifyContent={'space-between'}>
          <Box mt={6} fontSize={'14px'}>
            <Text fontWeight={600}>{blog.author}</Text>
            <Text color={'gray.500'}>6min read</Text>
          </Box>
          <Box display={'flex'}>
            <Button data-testid='likes' id='likes' onClick={() => handleLikes(blog)} color={'white'} leftIcon={<AiFillLike color='white'/>} right={0} mt={6} backgroundColor={'#28c7fa'} _hover={{ backgroundColor: '#3d5af1' }}><chakra.span mt='0.15em'>{blog.likes}</chakra.span></Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}

const Filter = () => {

  const dispatch = useDispatch()

  const handleFilter = (event) => {

    const filter = event.target.value
    dispatch(filterAction(filter))
  }

  return (
    <Box display={'flex'} px='8em' pt={6} justifyContent={'center'}><Input fontFamily={'CreatoDisplay'} fontWeight={'500'} size={'sm'} name='filter' onChange={handleFilter} placeholder='Filter...'></Input></Box>
  )
}

const Blogs = ({ blogs, user }) => {
  

  return (
    <Box py={6}>
      {blogs.sort(( a,b ) => b.likes - a.likes).map(blog => {
        return(
          <BlogCard key={blog.title} user={user} blog={blog} />
        )
      })}
    </Box>
  )
}


const BlogSection = ({ user }) => {

  const blogs = useSelector(state => {
    if (state.filter === '') {
      return state.blogs
    } else {
      return state.blogs.filter(b => b.title.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })
  

  return (
    <Container mt={6} maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
      <Container maxW={'container.md'}>
        <Filter />
        <Blogs blogs={ blogs } user={user} />
      </Container>
    </Container>
        
  )
}

export default BlogSection