import blogService from '../services/services'
import loginServices from '../services/login'
import { useToast } from '@chakra-ui/react'

export const voteAction = (blog) => {
    return async dispatch => {
        console.log(blog);
        const updateBlog = await blogService.update(blog.id, blog)
        dispatch({
            type: 'VOTE',
            data: { updateBlog }
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        const blogToDelete = await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE',
            data: { id }  
        })
    }
}

export const createAction = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE',
            data: { newBlog }
        })
    }
}


export const filterAction = (filter) => {
    return {
        type: 'SET_FILTER',
        data: filter
    }
}

export const showLogAction = () => {
    return {
        type: 'SET_SHOW_LOGIN'
    }
}

export const showRegAction = () => {
    return {
        type: 'SET_SHOW_REGISTER'
    }
}

export const loginAction = (user) => {
    
    return async dispatch => {

            const loginUser = await loginServices.login(user)

            window.localStorage.setItem('loggedUser', JSON.stringify(loginUser))
            blogService.setToken(loginUser.token)

            dispatch({
                type: 'LOGIN',
                data: loginUser
            })
    }
}

export const logOut = () => {
    return {
        type: 'LOGOUT',
    }
}

export const initializeUser = (user) => {
    return {
        type: 'SET_USER',
        data: user
    }
}

export const registerAction = (user) => {
    return async ()  => {
        const regUser = await loginServices.register(user)
    }
}

export const usersAction = (users) => {
    return async dispatch => {
        const usersLoad = await blogService.getUsers()
        dispatch({
            type: 'GET_USERS',
            data: usersLoad
        })
    }
}

export const commentAction = (blog) => {
    return async dispatch => {
        console.log(blog)
        const blogToUpdate = await blogService.update(blog.id, blog)
        dispatch({
            type: 'ADD_COMMENT',
            data: blogToUpdate
        })
    }
}

const blogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        
        case 'VOTE': {
            const id = action.data.updateBlog.id
            const blogToUpdate = state.find(b => b.id === id)
            const updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes + 1}

            return state.map(blog => blog.id !== id ? blog : updatedBlog)
        }

        case 'DELETE': {
            const id = action.data.id
            const blogToDelete = state.find(b => b.id === id)
            
            return state.filter(b => b.id !== blogToDelete.id)
        }

        case 'CREATE': 
            return state.concat(action.data.newBlog)

        case 'ADD_COMMENT':
            const id = action.data.id
            const updatedBlog = action.data

            return state.map(blog => blog.id !== id ? blog : updatedBlog)
        
        default:
            return state
    }
}

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.data
        default:
            return state
    }
}

const showReducer = (state = { login: false, register: false }, action) => {
    switch(action.type) {
        case 'SET_SHOW_LOGIN':
            return {...state, login: !state.login}
        case 'SET_SHOW_REGISTER':
            return {...state, register: !state.register}
        
        default:
            return state
    }
}

const loginReducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data
        case 'SET_USER':
            return action.data
        case 'LOGOUT':
            return null

        default:
            return state
    }
}

const usersReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_USERS':
            return action.data
        default:
            return state
    }
}

export { blogsReducer, filterReducer, showReducer, loginReducer, usersReducer }