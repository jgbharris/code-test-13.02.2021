import React, { useState, useEffect } from "react"
import ListItem from "./ListItem.jsx"

function App() {

  let [data, setData] = useState([])
  const [category, setCategory] = useState("all")


  //need to change this to simple if statement
  const handleFilterChange = (e, filterType) => {
    //changes state 
    switch (filterType) {
      case "category":
        setCategory(e.target.value)
        break;
      default: break;
    }
  }

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

  let categoriesAll = []

  if (posts) {
    for (let i = 0; i < posts.length; i++) {
      // console.log(posts[i]["categories"])
      posts[i]["categories"].map((category) => {
        categoriesAll.push(category.name)
      })
    };
  }

  console.log(categoriesAll)
  let uniqueCategories = [...new Set(categoriesAll)];
  console.log(uniqueCategories)
  console.log(uniqueCategories[0])



  return (
    <div>
      <form className="filter">
        <label for="category">Choose a category:</label>
        <select name="category" id="category" onChange={(e) => handleFilterChange(e, "category")}> {/*listens for when input field is changed*/}
        {uniqueCategories.map((option) => (
           <option value="option">{option}</option>
        ))}
        </select>
      </form>
      
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
