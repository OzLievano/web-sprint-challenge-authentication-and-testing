const db = require('../../data/dbConfig');

module.exports = {
    find,
    findById,
    create
}

async function find(){
    return await db('users');
}

async function findById(id){
    return await db('users').where({ id })
}
async function create(user){
    const [id] = await db('users').insert(user,"id");
    return findById(id)
}