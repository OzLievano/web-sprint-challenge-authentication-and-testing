const db = require('../../data/dbConfig');

module.exports = {
    find,
    findById,
    create
}

function find(){
    return db('users');
}

function findById(id){
    return db('users').where({ id })
}
function create(user){
    const [id] = await db('users').insert(user,"id");
    return findById(id)
}