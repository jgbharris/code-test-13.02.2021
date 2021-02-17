import React from 'react';
import { PaginatedList } from 'react-paginated-list';
function ListItem(props) {

    return (
        <li key={props.id}>
            <p>Number: {props.number}</p>
            <p>Title: {props.title}</p>
            <p>Summary: {props.summary}</p>
            <p>Author: {props.author}</p>
            <p>Date: {props.date}</p>
            <div>Categories:{props.categories}</div>
        </li>
    )
}

export default ListItem;