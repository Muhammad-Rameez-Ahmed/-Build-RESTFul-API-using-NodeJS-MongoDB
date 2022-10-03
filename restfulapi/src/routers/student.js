const express=require("express")
const router=new express.Router();
const Student = require("../models/students");



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

router.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body)
        const createUser = await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }

})


// get all documents from mongodb collection
router.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData)

    } catch (error) {
        res.send(error)

    }
})


// get individual data from mongodb collection
router.get("/students/:id", async (req, res) => {
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
router.delete("/students/:id", async(req,res) => {
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
router.patch("/students/:id",async(req,res)=>{
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

module.exports=router
