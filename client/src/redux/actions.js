import axios from "axios"
export const GET_ALL_RECIPES="GET_ALL_RECIPES"
export const GET_ALL_DIETS="GET_ALL_DIETS"
export const GET_ALL_RECIPES_INICIAL="GET_ALL_RECIPES_INICIAL"
export const FILTER="FILTER"
export const ORDEN="ORDEN"
export const SEARCH_NAME="SEARCH_NAME"
export const GET_RECIPE="GET_RECIPE"

export const getAllRecipes = () => (dispatch) => {
    // Tu código acá
    return axios.get(
      'http://localhost:3001/recipes'
      )
      .then(res=>res.data)
      .then(json => {
      dispatch({type: GET_ALL_RECIPES, payload: json})
    }
  )
}

export const getAllRecipesInicial = () => (dispatch) => {
  // Tu código acá
  return axios.get(
    'http://localhost:3001/recipes'
    )
    .then(res=>res.data)
    .then(json => {
      let reci=[]
      for(let i=0;i<9;i++){
        reci.push(json[i])
      }
    dispatch({type: GET_ALL_RECIPES_INICIAL, payload: reci})
  }
)
}

export const getAllDiets = () => (dispatch) => {
  // Tu código acá
  return axios.get(
    'http://localhost:3001/diets'
    )
    .then(res=>res.data)
    .then(json => {
    dispatch({type: GET_ALL_DIETS, payload: json})
  }
)
}
export const filter = (diet) => (dispatch) => {
  // Tu código acá
  if(diet){
    return dispatch({
      type: FILTER, 
      payload: diet})
  }
  }

export const ordenar = (orden,tipo) => (dispatch) => {
  // Tu código acá
    let obj={
      orden:orden,
      tipo:tipo
    }
    return dispatch({
      type: ORDEN, 
      payload: obj})
  }
export const searchName = (name) => (dispatch) => {
  // Tu código acá
    return axios.get(
      `http://localhost:3001/recipes?name=${name}`
      )
      .then(res=>res.data)
      .then(json => {
      dispatch({type: SEARCH_NAME, payload: json})
    }
  )
  .catch(err=>{
    dispatch({type: SEARCH_NAME, payload: {
      error: err
    }})
  })
  }

  export const getRecipe = (id) => (dispatch) => {
    // Tu código acá
      return axios.get(
        `http://localhost:3001/recipes/${id}`
        )
        .then(res=>res.data)
        .then(json => {
        dispatch({type: GET_RECIPE, payload: json})
      }
    )
    }
      
    
  


