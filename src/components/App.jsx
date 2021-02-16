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

  return (
    <div>
      <form className="filter">
        <label for="category">Choose a category:</label>
        <select name="category" id="category" onChange={(e) => handleFilterChange(e, "category")}> {/*listens for when input field is changed*/}
          <option value="all">All</option>
          <option value="jacket">Jackets</option>
          <option value="jean">Jeans</option>
          <option value="pant">Pants</option>
          <option value="dress">Dresses</option>
          <option value="shoe">Shoes</option>
          <option value="sock">Socks</option>
          <option value="swimwear">Swimwear</option>
          <option value="handbag">Hand Bag</option>
          <option value="formalwear">Formal Wear</option>
          <option value="sweater">Sweater</option>
          <option value="hat">Hats</option>
          <option value="baby">Baby</option>


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
