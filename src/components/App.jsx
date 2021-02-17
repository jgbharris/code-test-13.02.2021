import React, { useState, useEffect } from "react"
import ListItem from "./ListItem.jsx"
import {
  slice, concat,
} from 'lodash';

function App() {
  const [data, setData] = useState([])
  const [category, setCategory] = useState("all")

  const postsPerPage = 40;
  let arrayForHoldingPosts = [];
  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(3);

  const loopWithSlice = (start, end) => {
    const slicedPosts = filteredPosts.slice(start, end);
    console.log("slicedPosts", slicedPosts)
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    console.log("arrayForHoldingPosts", arrayForHoldingPosts)
    setPostsToShow(arrayForHoldingPosts);
  };

  
  useEffect(() => {
    loopWithSlice(0, postsPerPage);
  }, []);

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

  // console.log("slicedPosts", slicedPosts)
  // console.log("arrayForHoldingPosts", arrayForHoldingPosts)
  // console.log("postsToShow", postsToShow)

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


  console.log("filteredPosts", filteredPosts)

  //---------------------------------------------------------------------------------------------------------------

  return (

    <div>
      <h1>Post Filter App</h1>
      <form className="filter">
        <label for="category">Choose a category:</label>
        <select name="category" id="category" onChange={(e) => handleFilterChange(e, "category")}>
          <option value="all">All</option>
          {uniqueCategories.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </form>

      {/* <ul>
        {filteredPosts ? filteredPosts.map((post, index) => (
          <ListItem
            key={index}
            number={index}
            title={post.title}
            summary={post.summary}
            author={post.author.name}
            date={post.publishDate}
            categories={post.categories.map((category, index) => <p key={index}>{category.name}</p>)} />
        )) : null}
      </ul> */}
      <ul>
        {postsToShow ? postsToShow.map((post, index) => (
          <ListItem
            key={index}
            number={index}
            title={post.title}
            summary={post.summary}
            author={post.author.name}
            date={post.publishDate}
            categories={post.categories.map((category, index) => <p key={index}>{category.name}</p>)} />
        )) : null}
      </ul>
      <button onClick={handleShowMorePosts}>Load more</button>
    </div>
  )
}

export default App;
