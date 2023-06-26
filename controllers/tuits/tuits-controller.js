import * as tuitsDao from './tuits-dao.js'

const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.username = req.session["currentUser"]
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
}

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}

const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
}
const findTuitsByAuthorId = async (req, res) => {
    const author = req.params.author;
    const tuits = await tuitsDao.findTuitsByAuthorId(author);
    res.json(tuits);
};
const findMyTuits = async (req, res) => {
    const currentUser = req.session["currentUser"];
    // console.log("findMyTuits++++++")
    // console.log(req.session.id)
    // console.log(currentUser)
    if (currentUser) {

        const tuits = await tuitsDao.findTuitsByAuthorId(currentUser._id);
        res.json(tuits);
    } else {
        res.sendStatus(403);    }

};
const findOtherTuits = async (req, res) => {
    console.log("---------findOtherTuits ")
    const uid = req.params.uid;
    console.log(uid)

    // console.log("findMyTuits++++++")
    // console.log(req.session.id)
    // console.log(currentUser)
    const tuits = await tuitsDao.findTuitsByAuthorId(uid);
    console.log(tuits)
    res.json(tuits);
};

const searchTuits = async (req, res) => {
    const query = req.query.q;
    const tuits = await tuitsDao.searchTuits(query);
    res.json(tuits);
};

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
    app.get('/api/tuits/:author', findTuitsByAuthorId);
    app.get('/api/myTuits', findMyTuits);
    app.get('/api/myTuits/:uid', findOtherTuits);
    app.get("/api/login", (req, res) => {
        // console.log("api login ")
        // console.log(req.session)
        // console.log(req.session.id)
        var session=req.session;
        if(session.userid){
            res.send("Welcome User <a href=\'/example/logout'>click to logout</a>");
        }else
            res.sendFile('/Users/zenglin/webdev-server-project/users/index.html')
    });
    app.get('/api/tuits/search', searchTuits);
}
