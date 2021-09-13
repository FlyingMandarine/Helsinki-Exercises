import React from 'react'

const Persons = ({ entriesToShow, deleteEntry }) => {
    return (
        <div>
            {entriesToShow().map(entry =>
            <div key={entry.name}>
                {entry.name} {entry.number} <button onClick={() => deleteEntry(entry.id, entry.name)}>delete</button>
            </div>)}
        </div>
    )
}

export default Persons