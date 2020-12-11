import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core'
import { fetchCategory } from '../../../Store/Admin/Category/CategoryAction';
import CategoryTable from './CategoryTable';
import ErrorComponent from '../ErrorComponent';

function CategoryList(props) {
  const { fetchCategory, categories} = props

  useEffect(() => {
    fetchCategory()
  },[])

  function renderCategories(){
    if(categories.loading){
      return (
        <>
        <LinearProgress color="secondary" style={{width: '100%'}}/>
        </>
      )
    } else if(categories.error.length > 0) {
      return <ErrorComponent error={categories.error}/>
    } else {
      return <CategoryTable categories={categories.categories}/>
    }
  }

  return (
    <Fragment>
      {renderCategories()}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: () => dispatch(fetchCategory())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)
