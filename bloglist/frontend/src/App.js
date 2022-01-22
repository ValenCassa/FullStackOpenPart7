// No ex 15, 16, 22

import React from 'react';
import { useEffect } from 'react';
import Navbar from './components/navbar';
import LoginForm from './components/login'
import CreateBlogSection from './components/createBlog';
import blogService from './services/services'
import BlogSection from './components/blogs';
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, initializeUser, usersAction } from './reducers/blogReducer';
import Nav from './components/nav'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import Users, { UserView } from './components/usersView';
import BlogView from './components/blogView';

function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(usersAction())
  }, [dispatch])

  const usersMatch = useRouteMatch('/users/:id')
  const userMatch = usersMatch ? users.find(u => u.id === usersMatch.params.id) : null

  const blogsMatch = useRouteMatch('/blogs/:id')
  const blogMatch = blogsMatch ? blogs.find(b => b.id === blogsMatch.params.id) : null
  
  return (
    <>
      <Navbar />
      {user === null ? 
        <LoginForm /> :
      <CreateBlogSection />}
      <Nav />
      <Switch>
        <Route path={'/blogs/:id'}>
          <BlogView blog={blogMatch} />
        </Route>
        <Route path='/blogs'>
          <BlogSection user={user} />
        </Route>
        <Route path={'/users/:id'}>
            <UserView user={userMatch} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Redirect to={'/blogs'}/>
        </Route>
      </Switch>


    </>
  );
}

export default App;
