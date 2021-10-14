import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('correct data is registered by event handler when new blog created', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'Testing fireEvent on forms' }
    })

    fireEvent.change(author, {
        target: { value: 'Patrice' }
    })

    fireEvent.change(url, {
        target: { value: 'http://www.example.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing fireEvent on forms')
    expect(createBlog.mock.calls[0][0].author).toBe('Patrice')
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.example.com')
})