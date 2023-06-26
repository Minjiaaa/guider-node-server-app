import * as usersDao from "./users-dao.js";

const UserController = (app) => {
    const createUser = async (req, res) => {
        const newUser = await usersDao.createUser(req.body);
        res.json(newUser);
    };

    const updateOtherUser = async (req, res) => {
        const updates = req.body;
        console.log("---- update following ----")
        console.log(updates)
        console.log(updates._id)
        const updateResult = await usersDao.updateUser(updates._id, updates);
        console.log(updateResult)
        const user = await usersDao.findUserById(updates._id)
        console.log("------------- update user")
        console.log(user)
        res.json(user);
    }

    const deleteUser = async (req, res) => {
        const id = req.params.id;
        const status = await usersDao.deleteUser(id);
        res.json(status);
    };

    const findUserById = async (req, res) => {
        const uid = req.params.uid;
        // console.log("------------------findUserById")
        //
        // console.log(uid)

        const user = await usersDao.findUserById(uid);
        // console.log(user)
        res.json(user);
    };

    const findAllUsers = async (req, res) => {
        // const username = req.query.username;
        // const password = req.query.password;
        // if (username && password) {
        //     const user = await usersDao.findUserByCredentials(username, password);
        //     if (user) {
        //         res.json(user);
        //     } else {
        //         res.sendStatus(404);
        //     }
        // } else if (username) {
        //     const user = await usersDao.findUserByUsername(username);
        //     if (user) {
        //         res.json(user);
        //     } else {
        //         res.sendStatus(404);
        //     }
        // } else {
        const users = await usersDao.findAllUsers();
        res.json(users);
        // }
    };
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/otheruser', updateOtherUser);
}

export default UserController