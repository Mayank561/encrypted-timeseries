const users = [];

// user chat 
function userJoin(id, username, room){
    const user = {id, username, room};

    users.push(user);
    console.log(users, "users");

    return user;

}
console.log("user out", users);

// current user
function getCurrentUser(id){
    return users.find((user)=> user.id === id);
}
// leaves
function userLeave(id){
    const index = users.findIndex((user)=> user.id ===id);
    if(index !==-1){
        return users.splice(index, 1)[0];
    }
}
module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
};