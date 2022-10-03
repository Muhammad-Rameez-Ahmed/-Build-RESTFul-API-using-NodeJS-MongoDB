const e = require("express");
const express = require("express");
require("./db/conn");
const Student = require("./models/students");


const app = express();
const port = process.env.PORT || 8000;


app.use(express.json())


// create a new students
// app.post("/students",(req,res)=>{
// console.log(req.body)
//     const user = new Student(req.body)


//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })

app.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body)
        const createUser = await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }

})


// get all documents from mongodb collection
app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData)

    } catch (error) {
        res.send(error)

    }
})


// get individual data from mongodb collection
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData)

        if (!studentData) {
            return res.status(404).send()
        } else {
            res.send(studentData)
        }


    } catch (error) {
        res.status(500).send(error)
    }

})
// DELETE student data from id
app.delete("/students/:id", async(req,res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id)
        if(!deleteStudent){
            return res.status(404).send()
        }else{
            res.send(deleteStudent)
        }

    } catch (error) {
        res.status(500).send(error)
    }
})

// update student by id
app.patch("/students/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        const studentUpdate =await Student.findByIdAndUpdate(_id,req.body,{new:true});
        if(!studentUpdate){
            return res.status(404).send()
        }else{
            res.send(studentUpdate)
        }
        
    } catch (error) {
        res.status(500).send(error)
    }

})

app.listen(port, () => {
    console.log(`connection is done at this port number ${port}`)
}); 