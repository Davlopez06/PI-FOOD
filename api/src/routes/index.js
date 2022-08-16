require('dotenv').config();
const { default: axios } = require("axios");
const { Router } = require('express');
const {Op, Recipe, Diet, Recipe_Diet}=require("../db.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY} = process.env;

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let diets=["Gluten Free","dairy free","lacto ovo vegetarian","Vegan","pescatarian","paleolithic","primal","whole 30","fodmap friendly","ketogenic"];

function createDiet(){
    try {
        diets.map(async (diet)=>{
            let name=diet;
            if(name){
                await Diet.create({name})
            }
        })
        return "Se guardaron las dietas"
    } catch (error) {
         return error.message   
    }
}

router.get("/recipes", async (req,res)=>{
    let {name}=req.query;
    try {
        
    if(name){
            name.replace("%20", " ")
            name=name.toLowerCase()
            let db= await Recipe.findAll({
                attributes: ['id','name','healthScore'],
                include: [{
                    model: Diet,
                    attributes: ['name']
                }],
                where:{name:name}
            })
            if(db.length>0){
                return res.status(200).json(db[0])
            }
            axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
            .then(dato=>{
                let obj={};
                dato.data.results.map(result=>{
                    if(result.title.toLowerCase()===name){
                        console.log("Entra")
                        obj={
                            id: result.id,
                            name: result.title,
                            image: result.image,
                            diets: result.diets,
                            healthScore: result.healthScore
                        }
    
                    }
                })
                return obj;
                            
            })
            .then(obj=>{
                if(Object.keys(obj).length !=0){
                    return res.status(200).json(obj)
                }else{
                    return res.status(404).json({error:"No encontrado"})
                }
                
            })
        }else{
            axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
            .then(async dato=>{
                let objects=[]
                dato.data.results.map(result=>{
                    let id=result.id
                    let name= result.title
                    let image= result.image  
                    let diets= result.diets  
                    let healthScore= result.healthScore           
                    let object={
                        id, name, image,diets,healthScore
                    }
                    objects.push(object)
                    })
                    let db= await Recipe.findAll({
                        attributes: ['id','name','healthScore'],
                        include: [{
                            model: Diet,
                            attributes: ['name']
                        }]
                    })
                    if(db.length>0){
                        for(let i=0;i<db.length;i++){
                            objects.push(db[i])
                        }         
                    }
                    return objects
                }).then(objects=> res.status(200).json(objects))
        }
    } catch (error) {
        res.status(404).send("Error al obtener recetas")
    }
    
    })

router.get("/recipes/:id",async (req,res)=>{
    const {id} =req.params;
    try {
        if(!id){
            res.status(404).send("Falta el parametro")
        }
        if(id.length<3){
            let db= await Recipe.findByPk(id,{
                include:[{
                    model: Diet,
                    attributes:['name']
                }],
        
            })
            if(db){
                return res.status(200).json(db)
            }else{
                return res.status(500).send("No encontrado")
            }
            
        }
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(dato=>{
            let obj={}
            let name= dato.data.title
            let image= dato.data.image  
            let diets= dato.data.diets 
            let dishTypes= dato.data.dishTypes
            let cadenaSummary= dato.data.summary
            let summary =cadenaSummary.replace(/(<([^>]+)>)/ig, '')
            let healthScore= dato.data.healthScore
            let steps;
            dato.data.analyzedInstructions.map(value=>{
                steps=value.steps
            })
            obj={
                name,image,diets,dishTypes,summary,healthScore,steps
            }
            return obj
        })
        .then(obj=> { 
            if(Object.keys(obj).length !=0){
                return res.status(200).json(obj)
            }else{
                return res.status(404).send("No encontrado")
            }
        })
        .catch(()=> res.status(404).send("Error al encontrar la receta"))
    } catch (error) {
            return res.status(404).send("Error al encontrar la receta")
    }

})


router.post("/recipes", async (req,res)=>{
    let {name} =req.body
    const {summary,healthScore,steps,diets}=req.body
    try {
        if(!name || !summary || !healthScore || !steps || !diets.length){
            return res.status(500).json({error:"Datos insuficientes"});
        }
        name = name.toLowerCase()
        await Recipe.create({name,summary,healthScore,steps})
        let recipe= await Recipe.findAll({
            attributes: ['id'],
            where: {name: name}})
        for(let i=0;i<diets.length;i++){
            try {
            let name=diets[i]
            let diett=await Diet.findAll({
                attributes: ['id'],
                where: {name : name}
            })
            let idRecipe=JSON.parse(JSON.stringify(recipe))
            let recipeId=idRecipe[0].id
            let idDiet=JSON.parse(JSON.stringify(diett))
            let dietId=idDiet[0].id
            console.log(recipeId,dietId)
            const creado=await Recipe_Diet.create({recipeId,dietId})
            if(creado){
                console.log("Creado");
            }
        } catch (err) {
            await Recipe.destroy({
                where: {name:name}
            })
            return res.status(500).json({error:"Error en la diet"})
            
        }
        }
        res.status(200).json({exito:"Guardo con exito"});
    } catch (error) {
        return res.status(500).json({ error:"Error en la creacion"})
    }
})

router.get("/diets", async (req,res)=>{
    try {
        let db = await Diet.findAll()
        return res.status(200).json(db)
    } catch (error) {
        res.status(404).send("Error al encontrar las dietas")
    }
})


module.exports = {router, createDiet};
