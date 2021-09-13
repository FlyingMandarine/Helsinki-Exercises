import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes', () => {
    const blog = {
        title: 'Trying my first front-end test',
        author: 'Patrice Hermenault',
        likes: 15,
        url: 'http://www.example.com',
        user: {
            name: 'TestUser'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent('Trying my first front-end test')
    expect(component.container).toHaveTextContent('Patrice Hermenault')
    expect(component.container).not.toHaveTextContent('15')
    expect(component.container).not.toHaveTextContent('http://www.example.com')
})

test('renders url and likes when "view" button is clicked', () => {
    const blog = {
        title: 'Trying my first front-end test',
        author: 'Patrice Hermenault',
        likes: 15,
        url: 'http://www.example.com',
        user: {
            name: 'TestUser'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('15')
    expect(component.container).toHaveTextContent('http://www.example.com')
})

test('"increaseLikes" called twice if "like" button clicked twice', () => {
    const blog = {
        title: 'Trying my first front-end test',
        author: 'Patrice Hermenault',
        likes: 15,
        url: 'http://www.example.com',
        user: {
            name: 'TestUser'
        }
    }

    const increaseLikes = jest.fn()

    const component = render(
        <Blog blog={blog} increaseLikes={increaseLikes} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(increaseLikes.mock.calls).toHaveLength(2)
})