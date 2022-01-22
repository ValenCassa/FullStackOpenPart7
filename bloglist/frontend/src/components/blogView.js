import { Container, Text, Heading, Badge, Box, Textarea, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { commentAction } from "../reducers/blogReducer";

const BlogView = ({ blog }) => {
    const dispatch = useDispatch()


    const handleComment =  () => async event => {
        event.preventDefault()

        const comment = event.target.comment.value
        console.log(comment)
        const updatedBlog = {...blog, comments: blog.comments.concat(comment)}

        dispatch(commentAction(updatedBlog))

        event.target.comment.value = ''

    }

    return (
        <Container px={10} py={6} pb={6} mt={6} fontFamily={'CreatoDisplay'} maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Heading fontSize={'22px'}>{blog.title}</Heading>
                <Box fontWeight={'500'} px={2} py={1} backgroundColor={'lightblue'} borderRadius={'md'}>Likes: {blog.likes}</Box>
            </Box>

            <Badge colorScheme={'blue'} variant={'subtle'} mt={2}>by {blog.author}</Badge>
            <Text mt={4}>{blog.content}</Text>

            <Box>
                <Heading mt={8} fontSize={'19px'} mb={3}>Comments</Heading>
                <form onSubmit={handleComment()}>
                    <Textarea name="comment" placeholder='Write your comment here...'/>
                    <Button size={'sm'} colorScheme={'blue'} mt={4} type="submit">Submit</Button>
                </form>
                <Box mt={3}>
                    {blog.comments.map(c => 
                        <Box p={2} mt={2} borderBottom={'1px'} borderColor={'lightgrey'}>{c}</Box>
                        )}
                </Box>
            </Box>


        </Container>
    )
}

export default BlogView