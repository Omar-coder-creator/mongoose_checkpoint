const mongoose = require('mongoose');
require('dotenv').config();
//new person schema
const personSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    age:Number,
    favoriteFoods : [String]
})
// person model of person schema
const Person = mongoose.model('Person',personSchema)
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    const person1 = Person({
        name:'omar',
        age:19,
        favoriteFoods : ['lablebi','chocotom']
    })
    await person1.save()
    await Person.create([
        {
            name:'beji',
            age:55,
            favoriteFoods : ['kafteji','methewma']
        },
        {
            name:'sboui',
            age:44,
            favoriteFoods:['kol chay']
        },
        {
            name:'mounir',
            age:27,
            favoriteFoods:['caviar','pasta']
        }
    ])

    //find all person
    const persons = await Person.find();
    
    // //finding sboui
    const sboui = await Person.find({name:'sboui'})
    
    //finding by id of sboui
    const sboui_id = await Person.findById('6793944cf4c373c0c90fdc13')

    //update sboui's favourite food
    sboui_id.favoriteFoods.push('hamburger');
    await sboui_id.save()

    //find by name and update
    const result = await Person.findOneAndUpdate({name:'mounir'},{age:20},{new:true})
    

    //finding a person and delete
    const find_delete = await Person.findByIdAndDelete(sboui_id);
    

    // removing elements
    await Person.deleteMany({name:'beji'});

    // chaining search
    const search = await Person.find({favoriteFoods:'burittos'}).sort({name:1}).limit(2).select({age:0}).exec()

    //closing connection 
    mongoose.connection.close()
}
main()
