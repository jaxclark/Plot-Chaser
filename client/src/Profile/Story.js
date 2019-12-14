import React, { useState, useContext, useEffect } from 'react'
import { WriterContext } from '../ContextProvider'
import AddStoryForm from './AddStoryForm'
import { Link, withRouter } from 'react-router-dom'
import SingleStory from './SingleStory'

function Story(props) {
    const [toggled, setToggled] = useState(true)
    const { deleteStory, editStory } = useContext(WriterContext)

    const toggle = () => {
        setToggled(prev => {
            return !prev
        })
    }

    const mappedOutlines = props.outlines.map(outline => {
        return (
            <div>{outline.title}</div>
        )
    })

    return(
        <div className='storyComponent'>
            {props.type === 'storiesPage' ?
                <div>
                    { toggled ? 
                    <div className='storyDiv'>
                        <h3>{props.story.title}</h3>
                        <p>{`${props.story.genre}`}</p>
                        <p>{props.story.summary}</p>
                        <button onClick={() => {
                            editStory(props.story._id, props.story)
                            toggle()}}
                            >Edit</button>
                        <button
                            onClick={() => {
                            deleteStory(props.story._id)
                        }}>Delete</button>
                        {mappedOutlines}
                    </div>
                    :
                    <AddStoryForm button='Save' type='update' story={props.story} toggle={toggle} />
                    }                    
                </div>
            :
                <Link to={`/story/${props.story._id}`}>
                    <h3>{props.story.title}</h3>
                    {mappedOutlines}
                </Link>
            }
        </div>
    )
}

export default withRouter(Story)