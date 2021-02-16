import React, { useState, useEffect } from "react"

function App() {

  let [data, setData] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('api/posts')
      response = await response.json()
      console.log(response)
      setData(response)
    }
    fetchMyAPI()
  }, [])

  console.log("data", data)

  let posts = data.posts

  return (
    <ul>
      {posts ? posts.map((post) => (
          <li key={post.id}>
          <p>Title: {post.title}</p>
          <p>Summary: {post.summary}</p>
          <p>Author: {post.author.name}</p>
          <p>Date: {post.publishDate}</p>
          <p>Categories: {post.categories.map((category, index) => <a key={index}>{category.name}</a>)}</p>
          </li>
      )) : null}
    </ul>
  )
}

export default App;
