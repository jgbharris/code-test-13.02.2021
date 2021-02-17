import React from 'react';
import "./ListItem.css";

function ListItem(props) {

    return (
        <div className="listItemContainer">
            <li key={props.id}>
                <div><p className="postSection">Number:</p> {props.number}</div>
                <div><p className="postSection">Title:</p> {props.title}</div>
                <div><p className="postSection">Summary:</p> {props.summary}</div>
                <div><p className="postSection">Author:</p> {props.author}</div>
                <div><p className="postSection">Date:</p> {props.date}</div>
                <div><p className="postSection">Categories:</p>{props.categories}</div>
            </li>
        </div>

    )
}

export default ListItem;