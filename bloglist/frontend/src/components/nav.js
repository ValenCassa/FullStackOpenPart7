import { Container, chakra, Box } from "@chakra-ui/react";
import { Link } from 'react-router-dom'

const StyledLink = ({ page, text, ...props }) => {
    return (
        <Box borderRadius={'md'} {...props} px={1} _hover={{backgroundColor: 'black', color: 'white'}} display={'inline-block'} fontWeight={'500'}>
            <Link to={`/${page}`}>{text}</Link>
        </Box>
    )
}

const Nav = () => {

    return (
        <Container display={'flex'} justifyContent={'center'} p={2} textAlign={'center'} fontFamily={'CreatoDisplay'} fontSize={'17px'} mt={6} maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
            <StyledLink page={'blogs'} text={'Blogs'} mr={10} />
            <StyledLink page={'users'} text={'Users'} />
        </Container>
    )
}

export default Nav