import React, { useState, useEffect } from "react"
import ListItem from "./ListItem.jsx"
import "./App.css";

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

  let posts = data.posts

  //Dropdown filter change

  const handleFilterChange = (e, filterType) => {
    switch (filterType) {
      case "category":
        setCategory(e.target.value)
        break;
      default: break;
    }
  }

  //---------------------------------------------------------------------------------------------------------------


  //Takes categories from data, loops over them and pushes them into category array. Duplicates are removed and then used for dropdown options - Dropdown should then change dynamically if additional categories are added to the api response

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


  //Filter posts based on match to dropdown - if all selected then all posts pushed into filtered array otherwise maps over categories of each post and if any of cateogry matches the dropdown then the post is pushed into the filtered array

  let filteredPosts = [];

  if (posts) {
    for (let i = 0; i < posts.length; i++) {
      if (category == "all") {
        filteredPosts.push(posts[i])
      } else {
        posts[i]["categories"].map((postCategory) => {
          // eslint-disable-next-line
          postCategory.name == category ? filteredPosts.push(posts[i]) : null
        })
      }
    };
  }

  //---------------------------------------------------------------------------------------------------------------

  return (

    <div>
      <h1>Post Filter App</h1>
      <div className="formContainer">
        <form className="filter">
          <label className="dropdownHeading">Choose a category:</label>
          <select className="dropdown" name="category" id="category" onChange={(e) => handleFilterChange(e, "category")}>
            <option value="all">All</option>
            {uniqueCategories.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </form>
      </div>

      <ul>
        {filteredPosts ? filteredPosts.map((post, index) => (
          <ListItem
            key={index}
            title={post.title}
            summary={post.summary}
            author={post.author.name}
            date={post.publishDate}
            categories={post.categories.map((category, index) => <p key={index}>{category.name}</p>)} />
        )) : null}
      </ul>
    </div>
  )
}

export default App;
