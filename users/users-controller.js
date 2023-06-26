import * as usersDao from "./users-dao.js";

const UserController = (app) => {
    const createUser = async (req, res) => {
        const newUser = await usersDao.createUser(req.body);
        res.json(newUser);
    };

    const updateOtherUser = async (req, res) => {
        const updates = req.body;
        const user = await usersDao.findUserById(updates._id)
        res.json(user);
    }

    const deleteUser = async (req, res) => {
        const id = req.params.id;
        const status = await usersDao.deleteUser(id);
        res.json(status);
    };

    const findUserById = async (req, res) => {
        const uid = req.params.uid;
        const user = await usersDao.findUserById(uid);
        res.json(user);
    };

    const findAllUsers = async (req, res) => {
        const users = await usersDao.findAllUsers();
        res.json(users);
    };
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/otheruser', updateOtherUser);
}

export default UserController