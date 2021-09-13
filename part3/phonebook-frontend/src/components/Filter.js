import React from 'react'

const Filter = ({ setTextField }) => {
    return (
        <div>
            filter shown with <input onChange={(event) => {
                if (event.target.value === '') {
                    setTextField('')
                } else {
                    setTextField(event.target.value)
                }
            }
            }/>
        </div>
    )
}

export default Filter