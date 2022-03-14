const express=require("express")
const mongoose=require("mongoose");


const app=express();

const connect=()=>{


    return mongoose.connect(
        "mongodb+srv://KanishkaRajput:khushy1234@cluster0.516ub.mongodb.net/Banking?retryWrites=true&w=majority"

    )
}

//user schema
const userSchema=new mongoose.Schema({
firstname:{type:String,required:true},
middlename:{type:String,required:false},
lastname:{type:String,required:true},
age:{type:Number,required:true},
email:{type:String,required:true},
address:{type:String ,required:true},
gender:{type:String,required:true},
type:{type:String,required:true},

saving_acId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"saving_ac",
    required:true
},
fixed_acId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"fixed_ac",
    required:true
}
},
{

    timestamps:true,
    versionKey:false
}

)

//usermodel
const User=mongoose.model("user",userSchema);

//Branchdetailsschema

const branchSchema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    IFSC:{type:String,required:true},
    MICR:{type:Number,required:true}, 
    Master_acId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"master_ac",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})


//detailsmodel

const Details=mongoose.model("branchdetails",branchSchema);


//MasterAccount Schema

const masteracSchema=new mongoose.Schema({
account_number:{type:Number,required:true,unique:true},
balance:{type:Number,required:true},
interestRate:{type:Number,required:true},

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
}
},
{
    timestamps:true,
    versionKey:false,
})

//mastermodel
const Master_ac=mongoose.model("master_ac",masteracSchema);

//savingacSchema
const savingacSchema=new mongoose.Schema({
    account_number:{type:Number,required:true,unique:true},
    balance:{type:Number,required:true},
    interestRate:{type:Number,required:true},

},
{
    timestamps:true,
    versionKey:false
})

//savingmodel
const Saving_ac=mongoose.model("saving_ac",savingacSchema);

//fixedacSchema

const fixedacSchema=new mongoose.Schema({
account_number:{type:Number,required:true,unique:true},
balance:{type:Number,required:true},
interestRate:{type:Number,required:true},
startDate:{type:String,required:true},
maturityDate :{type:String,required:true}

},
{
    timestamps:true,
    versionKey:false
})

//fixed_acmodel
const Fixed_ac=mongoose.model("fixed_ac",fixedacSchema);


//CRUD

//1-mastercrud
app.get("/masterac",async(req,res)=>{
try{
const master=await Master_ac.find().lean().exec()
return res.status(200).send(master);
}
catch(err){
return res.status(500).send(err.message);
}
});

//2-post for saving

app.post("/savingac",async(req,res)=>{
try{
    const saving=await Saving_ac.create(req.body);
    return res.status(200).send(saving);

}
catch(err){
    return res.status(500).send(err.message);   
}
})

//3-post crud for fixedac

app.post("/fixedac",async(req,res)=>{
    try{
        const fixed=await Fixed_ac.create(req.body);
        return res.status(200).send(fixed);
    
    }
    catch(err){
        return res.status(500).send(err.message);   
    }
    })

//4-master with id

app.get("/masterac/:id",async(req,res)=>{
try{

    const master=await Master_ac.findById(req.params.id).populate(
    {
     path:"userId",
     select:{account_number:1,balance:1}
    })
    .lean()
    .exec()
    return res.status(200).send(fixed);
}
catch(err){
    return res.status(500).send(err.message);   
}
});

//5-delete
app.delete("/fixedac",async(req,res)=>{
    try{
        const fixed=await Fixed_ac.deleteOne(req.body);
        return res.status(200).send(fixed);
    
    }
    catch(err){
        return res.status(500).send(err.message);   
    }
    })

//6-

app.listen(4553,async(req,res)=>{
try{

await connect();

console.log("Hello");
}
catch(err){
console.log("I am porting 4553")
}
})
