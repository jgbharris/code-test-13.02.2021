import React, { useState, useEffect } from "react"
import ListItem from "./ListItem.jsx"
import { ConsoleWriter } from "istanbul-lib-report";

function App() {

  let [data, setData] = useState([])
  const [category, setCategory] = useState("all")


  //API call
  //---------------------------------------------------------------------------------------------------------------

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

  console.log("posts", posts)

  //---------------------------------------------------------------------------------------------------------------


  //Dropdown filter change

  //need to change this to simple if statement
  const handleFilterChange = (e, filterType) => {
    switch (filterType) {
      case "category":
        setCategory(e.target.value)
        break;
      default: break;
    }
  }

  console.log("Category", category)

  //---------------------------------------------------------------------------------------------------------------


  //Takes categories from data, loops over them and pushes them into category array. Duplicates are removed and then used for dropdown options - Dropdown should then change if additional categories are added

  let categoriesAll = []

  if (posts) {
    for (let i = 0; i < posts.length; i++) {
      // console.log(posts[i]["categories"])
      posts[i]["categories"].map((category) => {
        categoriesAll.push(category.name)
      })
    };
  }

  let uniqueCategories = [...new Set(categoriesAll)];

  //---------------------------------------------------------------------------------------------------------------

  let filteredPosts = [];

  if (posts) {
    // eslint-disable-next-line
    for (let i = 0; i < posts.length; i++) {
      posts[i]["categories"].map((postCategory) => {
        // eslint-disable-next-line
        postCategory.name == category ? filteredPosts.push(posts[i]) : null
      })

    };
  }


  console.log("filteredPosts", filteredPosts)

  return (
    <div>
      <form className="filter">
        <label for="category">Choose a category:</label>
        <select name="category" id="category" onChange={(e) => handleFilterChange(e, "category")}>
        <option value="all">All</option>
          {uniqueCategories.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </form>

      <h1>From Component</h1>
      <ul>
        {filteredPosts ? filteredPosts.map((post) => (
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
