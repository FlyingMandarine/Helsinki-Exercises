import React, { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Error from './components/Error'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserDetails from './components/UserDetails'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const noteFormRef = useRef()

    useEffect(() => {
        async function fetchData() {
            dispatch(initializeBlogs())
        }
        fetchData()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const sortBlogs = () => {
        function compare(a, b) {
            if (a.likes < b.likes){
                return 1
            }
            if (a.likes > b.likes) {
                return -1
            }
            return 0
        }

        blogs.sort( compare )
    }

    if (blogs.length !== 0) {
        sortBlogs()
    }

    const addBlog = async (blogObject) => {
        noteFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(blogObject)

        dispatch(initializeBlogs())

        dispatch(setNotification(`a new blog named ${returnedBlog.title} has been added`, 3))

        setTimeout(() => {
            dispatch(setNotification(null, 3))
        }, 3000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            if (user !== null) {
                window.localStorage.setItem(
                    'loggedBlogappUser', JSON.stringify(user)
                )

                blogService.setToken(user.token)
                dispatch(setUser(user))
            }

            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setUsername('')
            setPassword('')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }

    const blogForm = () => (
        <Togglable ref={noteFormRef}>
            <BlogForm
                createBlog={addBlog}
            />
        </Togglable>
    )

    const increaseLikes = async (blog, likes) => {
        const blogObject = blogs.find(b => b.id === blog.id)
        const changedBlog = { ...blogObject, likes: likes + 1 }

        try {
            await blogService.update(changedBlog.id, changedBlog)
            dispatch(initializeBlogs())
        } catch (exception) {
            setErrorMessage(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Error errorMessage={errorMessage} />
                <form id="login-form" onSubmit={handleLogin}>
                    <div>
                    username
                        <input
                            id="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                    password
                        <input
                            id="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id="login-button" type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in
                <button id="logout-button" onClick={handleLogout}>log out</button>
            </p>
            {blogForm()}
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    username={user.username}
                    increaseLikes={increaseLikes}
                />
            )}
            <UserDetails />
        </div>
    )
}

export default App