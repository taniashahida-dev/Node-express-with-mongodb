require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;

app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Simple Crud App')
})

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run =async()=>{
try {
    await client.connect()
  
    const db = client.db('simpleCrud')
    const userCullection = db.collection('users')
app.get('/users',async(req,res)=>{
const cursor = userCullection.find()
const result =await cursor.toArray()
res.send(result)
})
    
app.get('/users/:id' ,async(req,res)=>{
    const id = req.params.id
    const query= {
        _id: new ObjectId(id)
    }
    const result = await userCullection.findOne(query)
    res.send(result)
})
app.post('/users' ,async(req,res)=>{
    const newUser= req.body
   console.log('new user is come',newUser)
    const result = await userCullection.insertOne(newUser)
    res.send(result)
})
app.patch('/users/:id' ,async(req,res)=>{
    const id= req.params.id
   console.log('new user is come',id)
const filter={
  _id: new ObjectId(id)
}
const newUser = req.body
    const updateDocument ={
         $set: {
    name: newUser.name,
    role: newUser.role
   }
    }
    console.log("After update",newUser)
    const result = await userCullection.updateOne(filter,updateDocument)
    res.send(result)
})



app.delete('/users/:id' ,async(req,res)=>{
    const id = req.params.id
    const query= {
        _id: new ObjectId(id)
    }
    const result = await userCullection.deleteOne(query)
    res.send(result)
})





    await client.db('admin').command({ping:1})
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
}finally {
    // await client.close()
}
}
run().catch(console.dir)

app.listen(port,()=>{
    console.log(`Simple crud server is rinnung from  on port ${port}`)
})
