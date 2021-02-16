import React, { useState, useEffect } from "react"
import ListItem from "./ListItem.jsx"

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
    <div>
      <h1>From Component</h1>
      <ul>
        {posts ? posts.map((post) => (
          <ListItem
            key={post.id}
            title={post.title}
            summary={post.summary}
            author={post.author.name}
            date={post.publishDate}
            categories={post.categories.map((category, index) => <a key={index}>{category.name}</a>)} />
        )) : null}
      </ul>


    </div>





  )
}

export default App;
