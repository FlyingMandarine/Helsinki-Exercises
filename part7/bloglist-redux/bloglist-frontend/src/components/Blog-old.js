import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'

import { initializeBlogs } from '../reducers/blogReducer'

const Blog = ({ blog, username, increaseLikes }) => {
    const dispatch = useDispatch()
    const [viewMore, setViewMore] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const deleteBlog = async (id) => {
        if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            await blogService.remove(id)
            console.log('Blog deleted successfully.')
            dispatch(initializeBlogs())
        }
    }

    return (
        <div className='blog'>
            {viewMore === false
                ?
                <div style={blogStyle}>{blog.title} {blog.author} <button id='view-button' onClick={() => setViewMore(true)}>view</button></div>
                :
                <div style={blogStyle}>
                    <div>
                        {blog.title} {blog.author} <button onClick={() => setViewMore(false)}>hide</button>
                    </div>
                    <div>{blog.url}</div>
                    <div>likes <span className='like-span'>{blog.likes}</span><button id='like-button' onClick={() => increaseLikes(blog, blog.likes)}>like</button></div>
                    <div>{blog.user.name}</div>

                    {(blog.user.username === username) &&
                        <div><button id="delete-button" onClick={() => deleteBlog(blog.id)}>delete</button></div>
                    }
                </div>
            }
        </div>
    )
}

export default Blog