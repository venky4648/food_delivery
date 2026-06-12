import { useState } from "react"
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx"
import Header from "../../components/Header/Header.jsx"
import "./Home.css"
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx"
import AppDownload from "../../components/App Download/AppDownload.jsx"
import PropTypes from 'prop-types';

const Home = ({ setShowAddItem }) => {
  const [category, setCategory] = useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} setShowAddItem={setShowAddItem}/>
      <AppDownload />
    </div>
  )
}

Home.propTypes = {
  setShowAddItem: PropTypes.func.isRequired
}

export default Home