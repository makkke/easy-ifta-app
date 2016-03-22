import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import { fetchRecipes } from './recipes.module'
// import RecipeList from './RecipeList'

class ReportPage extends Component {
  // static propTypes = {
  //   recipes: PropTypes.array.isRequired,
  // }

  // need = [
  //   fetchRecipes,
  // ]

  render() {
    return (
      <div>
        <h1>Report</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.data,
  }
}

// export default connect(mapStateToProps)(ReportPage)
export default ReportPage
