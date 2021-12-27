const Queue = require('bull');
const {bullApis,sequelize}= require('../models');

const opt = require('../src/redis-server')



const hitApiQueue= new Queue('last-login',opt);




hitApiQueue.process(async (job)=>{
    try{
        const {apiUrl}= job.data;
        
        const findApi  = await bullApis.findOne({where:{api:apiUrl}})
        if(!findApi){
            
            const hitapi = await bullApis.create({api:apiUrl})
        }
        let result;
        let count;
        for(let i = 0 ; i<100; i++ ){
        count = await bullApis.findAll({
            where:{api:apiUrl},
            attributes: ['count'],
            
        })
            result = await bullApis.update({
                count: count[0].dataValues.count+1,
                
            },{where:{api:apiUrl}})
        }
   
        
        
        
        

        hitApiQueue.on('completed',(job,result)=>{
            console.log(job.toJSON())
            console.log(job.finishedOn - job.processedOn)
            
        })
        
        
        return Promise.resolve({result})
    }catch(err){
        Promise.reject(err);
    }
})



const hitAPI = async (req,res,next)=>{
    hitApiQueue.add({apiUrl:req.originalUrl})
    

    next();
}

module.exports = hitAPI;  
