import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../../Store/Admin/Category/CategoryAction';

function CategoryList(props) {
  const { fetchCategory, categories} = props

  useEffect(() => {
    fetchCategory()
  },[])

  return (
    <div>
      {JSON.stringify(categories)}
    </div>
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
