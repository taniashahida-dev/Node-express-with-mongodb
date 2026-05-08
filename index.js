const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://simpleCrudUser:YGpIMURjXXhRbMPg@tania-shahida.nhmj7ah.mongodb.net/?appName=Tania-shahida`;

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
// mongodb+srv://simpleCrudUser:YGpIMURjXXhRbMPg@tania-shahida.nhmj7ah.mongodb.net/?appName=Tania-shahida
// mongodb+srv://<db_username>:<db_password>@tania-shahida.nhmj7ah.mongodb.net/?appName=Tania-shahida

// simpleCrudUser
// YGpIMURjXXhRbMPg