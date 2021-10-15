import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const Blog = ({ increaseLikes }) => {
    const blogs = useSelector(state => state.blogs)

    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    if (!blog) {
        return null
    }

    return (

        <div>
            <div>
                <h2>{blog.title} {blog.author}</h2>
            </div>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
                <span className='like-span'>
                    {blog.likes} likes
                </span>
                <button id='like-button' onClick={() => increaseLikes(blog, blog.likes)}>
                    like
                </button>
            </div>
            <div>added by {blog.user.name}</div>
        </div>
    )
}

export default Blog