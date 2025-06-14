const counter_model = require("../modal/counter.model")

const add_counter = async(req,res)=>{
    try {
        const visits = await counter_model.find({});
        console.log(visits,'sivis')
        if(visits.length == 0 ){

            const new_visit = new counter_model({
                visits:visits + 1,
            })
            await new_visit.save();
        }
        res.end();
    } catch (error) {
        res.status(500).json({status:false,message:"Something went wrong!"})
    }
}


const update_counter = async(req,res)=>{
    try {
        const visits = await counter_model.find({});
        let id = visits[0]?._id;
        let count =visits[0]?.visits;
        const resp = await counter_model.findByIdAndUpdate(id,{visits:count + 1},{new:true})     
        if(!resp) res.status(400).json({status:false,message:"Something went wrong! 1"})
        res.status(201).json({status:false,data:{visits:resp?.visits}});
    } catch (error) {
        res.status(500).json({status:false,message:"Something went wrong!"})
    }
}


module.exports = {add_counter,update_counter}