import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session["currentUser"] = user;
                req.session.save();
                console.log("login=======")
                console.log(req.session.currentUser.username)
                console.log('Login Session ID:', req.session.id);
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };

    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log("profile currentUser========")
        console.log(currentUser.username)
        console.log('Profile Session ID:', req.session.id);
        if (currentUser) {
            res.json(currentUser);
        } else {
            res.sendStatus(403);
        }
    };

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const updates = req.body;
        const uid = currentUser._id;
        const updatedUser = await usersDao.updateUser(uid, updates);
        req.session["currentUser"] = updatedUser;
        res.json(updatedUser);
    }

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users", update);
    app.get("/example/login", (req, res) => {
        console.log(req.session)
        console.log(req.session.id)
        var session=req.session;
        if(session.userid){
            res.send("Welcome User <a href=\'/example/logout'>click to logout</a>");
        }else
            res.sendFile('/Users/zenglin/webdev-server-project/users/index.html')
    });
    app.post("/example/user", (req, res) => {
        var session=req.session;
        console.log("session before /example/user ")
        console.log(req.session)
        console.log(req.session.id)

        session.userid=req.body.username;
        console.log("session at /example/user ")
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/example/logout'>click to logout</a>`);
    });
    app.get("/example/logout", (req, res) => {
        req.session.destroy();
        res.redirect('/example/login');
    });
};

export default AuthController;