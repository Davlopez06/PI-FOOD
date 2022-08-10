import { GET_ALL_RECIPES, GET_ALL_RECIPES_INICIAL, GET_ALL_DIETS, FILTER, ORDEN} from "./actions";
import { SEARCH_NAME , GET_RECIPE} from "./actions";
const initialState = {
  recipes: [],
  recipesIni:[],
  recipesAux:[],
  diets:[],
  recipe:{}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código
    case GET_ALL_RECIPES:
        console.log(action.payload)
      return{
        ...state,
        recipes: action.payload,
        recipesAux: action.payload
      }
    case GET_ALL_RECIPES_INICIAL:
      console.log(action.payload)
      return{
        ...state,
        recipesIni:action.payload
      }
    case GET_ALL_DIETS:
      console.log(action.payload)
      return{
        ...state,
        diets:action.payload
      }
    case FILTER:
      let recis=state.recipesAux
      let result=[];
      let initial=[];
      console.log(recis)
      console.log(action.payload)
      if(action.payload==="all"){
        result=recis;
      }else{
        for(let i=0;i<recis.length;i++){
          console.log(recis[i])
          if(Array.isArray(recis[i])){
            for(let j=0;j<recis[i].length;j++){
              console.log(recis[i][j])
              if(typeof recis[i][j]==="object"){
                for(let k=0;k<recis[i][j].diets.length;k++){
                  if(recis[i][j].diets[k].name===action.payload){
                    result.push(recis[i][j])
                  }
                }
                }
              }
            }else{
              console.log(recis[i].diets)
              console.log(recis[i].diets.length)
              for(let j=0;j<recis[i].diets.length;j++){
                if(typeof recis[i].diets[j]==="object"){
                  if(recis[i].diets[j].name===action.payload){
                    result.push(recis[i])
                  }
                }else{
                  if(recis[i].diets[j]===action.payload.toLowerCase()){
                    result.push(recis[i])
                  }
                }
              }
            }
        }
      }
      for(let i=0;i<9;i++){
        if(result[i]){
          initial.push(result[i]);
        }
      }
      console.log(result)
      console.log(initial)
      return{
        ...state,
        recipes:result,
        recipesIni:initial
      }
    case ORDEN:
      let recips=state.recipesAux
      console.log(recips)
      let results=[];
      let inicial=[];
      if(action.payload.orden==="Asc"){
      if(action.payload.tipo==="alf"){
        results= recips.sort((x,y)=>{
          if(x.name.toLowerCase()<y.name.toLowerCase()){
            return 1
          }
          if(x.name.toLowerCase()>y.name.toLowerCase()){
            return -1
          }
          return 0
        })
      }else{
        results= recips.sort((x,y)=>{
          if(x.healthScore>y.healthScore){
            return 1
          }
          if(x.healthScore<y.healthScore){
            return -1
          }
          return 0
        })
      }
      }else if(action.payload.orden==="Des"){
        if(action.payload.tipo==="alf"){
          results= recips.sort((x,y)=>{
            if(x.name.toLowerCase()>y.name.toLowerCase()){
              return 1
            }
            if(x.name.toLowerCase()<y.name.toLowerCase()){
              return -1
            }
            return 0
          })
        }else{
          results= recips.sort((x,y)=>{
            if(x.healthScore<y.healthScore){
              return 1
            }
            if(x.healthScore>y.healthScore){
              return -1
            }
            return 0
          })
        }
      }
      for(let i=0;i<9;i++){
        if(results[i]){
          inicial.push(results[i]);
        }
      }
      console.log(results)
      return{
        ...state,
        recipes:results,
        recipesIni:inicial
      }
    case SEARCH_NAME :
      let resultt=[];
      let iniciall=[];
      if(action.payload.hasOwnProperty('error')){
        return{
          ...state,
          recipes:[],
          recipesIni:[]
        }
      }else{
        resultt.push(action.payload);
        for(let i=0;i<9;i++){
          if(resultt[i]){
            iniciall.push(resultt[i])
          }
        }
        return{
          ...state,
          recipes:resultt,
          recipesIni:iniciall
        }
      }
    case GET_RECIPE:
      return{
        ...state,
        recipe:action.payload
      }
    default: return state
  }
};

export default rootReducer;