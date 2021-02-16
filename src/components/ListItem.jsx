import React from 'react';

function ListItem(props) {
    
    return (
        <li key={props.id}>
            <p>Title: {props.title}</p>
            <p>Summary: {props.summary}</p>
            <p>Author: {props.author}</p>
            <p>Date: {props.date}</p>
            <p>Categories: {props.categories}</p>
        </li>
    )
}

export default ListItem;