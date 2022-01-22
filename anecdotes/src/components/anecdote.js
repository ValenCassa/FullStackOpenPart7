import React from "react";

const Anecdote = ({ anecdote }) => {

    return (
        <div>
            <h1><strong>{ anecdote.content }</strong></h1>
            <div>by {anecdote.author}</div>
            <div>more info: {anecdote.info}</div>
            <div>Votes: { anecdote.votes }</div>

        </div>
    )
}

export default Anecdote