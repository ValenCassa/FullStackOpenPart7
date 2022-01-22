import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, Table, Thead, Tbody, Tr, Th, Td, UnorderedList, ListItem } from '@chakra-ui/react'
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";

const UsersRoute = ({ users }) => {
    return (
        <>
        <Box fontWeight={'600'} fontSize={'20px'} px={3} py={4}>Users</Box>
        <Table size={'md'} variant={'simple'}>
            <Thead>
                <Tr>
                    <Th>User</Th>
                    <Th>Blogs created</Th>
                </Tr>
            </Thead>
            <Tbody> 
                {users.map(user =>
                    <Tr key={user.id}>
                        <Td _hover={{'textDecoration': 'underline'}}><Link to={`/users/${user.id}`}>{user.name}</Link></Td>
                        <Td>{user.blogs.length}</Td>
                    </Tr>
                    )}
            </Tbody>
                
        </Table>
        </>
    )
}

export const UserView = ({ user }) => {
    return (
        <Container px={10} pb={6} mt={6} fontFamily={'CreatoDisplay'} maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
                <Box fontSize={'20px'} py={4} fontWeight={'600'}>{user.name}</Box>
                <Box fontWeight={'500'}>Added blogs</Box>
                <Box>
                    <UnorderedList ml={10}>
                        {user.blogs.map(b => 
                            <ListItem key={b.id}>{b.title}</ListItem>
                            )}
                    </UnorderedList>
                </Box>
        </Container>
    )
}

const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <Container px={6} mt={6} fontFamily={'CreatoDisplay'} maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
            <UsersRoute users={users}/>
        </Container>

    )
    
}

export default Users