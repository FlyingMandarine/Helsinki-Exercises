import React from 'react'

const Courses = ({ courses }) => {
    return (
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />    
          </div>
        )}
      </div>
    )
}
  
const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}
  
const Content = ({ parts }) => {
    return (
    <div>
        {parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
    </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
    <p>
        {part} {exercises}
    </p>    
    )
}

const Total = ({ parts }) => {
    const total = []

    for (var i = 0; i < parts.length; i++) {
        total.push(parts[i]['exercises'])
    }

    return (
    <p>
        Number of exercises {total.reduce((a, b) => a + b, 0)}
    </p>
    )
}

export default Courses