import { verbose } from "sqlite3";
import { default as express } from "express";
import { default as bodyParser } from "body-parser";
import { AddDataReq, Database, SearchAtReq, SearchAtRes, SearchPlayerReq, SearchPlayerRes, SearchRadiusReq, SearchRadiusRes, SearchTimeReq, SearchTimeRes } from "./types";
const sqlite3 = verbose();
const db = new sqlite3.Database("db/logging.db");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS blocks(name,xuid,mode,block,x,y,z,d,time,unix);");
});
app.post('/insert', function (req, res) {
    const data = req.body as AddDataReq;
    db.serialize(() => {
        db.run("INSERT INTO blocks VALUES (?,?,?,?,?,?,?,?,?,?)", [data.name, "null", data.mode, data.block, data.x, data.y, data.z, data.d, data.time, data.unix]);
    });
    res.status(200).send("OK");
})
app.post('/search/at', function (req, res) {
    const data = req.body as SearchAtReq;
    db.all<Database>("SELECT * FROM blocks WHERE x = ? AND y = ? AND z = ? AND d = ? ORDER BY unix ASC LIMIT ?", [data.x, data.y, data.z, data.d, data.count ?? 10], (err, row) => {
        const resData: SearchAtRes = row.map((v) => {
            return {
                name: v.name,
                mode: v.mode,
                block: v.block,
                time: v.time,
                unix: v.unix
            }
        });
        res.json(resData);
    });
})
app.post('/search/player', function (req, res) {
    const data = req.body as SearchPlayerReq;
    db.all<Database>("SELECT * FROM blocks WHERE name = ? AND d = ? ORDER BY unix ASC LIMIT ?", [data.name, data.d, data.count ?? 10], (err, row) => {
        const resData: SearchPlayerRes = row.map((v) => {
            return {
                name: v.name,
                mode: v.mode,
                block: v.block,
                x: v.x,
                y: v.y,
                z: v.z,
                time: v.time,
                unix: v.unix
            }
        });
        res.json(resData);
    });
});
app.post('/search/time', function (req, res) {
    const data = req.body as SearchTimeReq;
    const lastTime = Date.now() - data.time * 1000;
    db.all<Database>("SELECT * FROM blocks WHERE unix >= ? AND d = ? ORDER BY unix ASC LIMIT ?", [lastTime, data.d, data.count ?? 10], (err, row) => {
        const resData: SearchTimeRes = row.map((v) => {
            return {
                name: v.name,
                mode: v.mode,
                block: v.block,
                x: v.x,
                y: v.y,
                z: v.z,
                time: v.time,
                unix: v.unix
            }
        });
        res.json(resData);
    });
})
app.post('/search/radius', function (req, res) {
    const data = req.body as SearchRadiusReq;
    db.all<Database>("SELECT * FROM blocks WHERE pow(x-?,2) + pow(y-?,2) + pow(z-?,2) <= pow(?,2) AND d = ? ORDER BY unix ASC LIMIT ?", [data.x, data.y,data.z,data.r, data.d, data.count ?? 10], (err, row) => {
        const resData: SearchRadiusRes = row.map((v) => {
            return {
                name: v.name,
                mode: v.mode,
                block: v.block,
                x: v.x,
                y: v.y,
                z: v.z,
                time: v.time,
                unix: v.unix
            }
        });
        res.json(resData);
    })
});
/*
 * debug code *

app.get('/get/:data(\[0-9]+)', function (req, res) {
    const cnt = Number(req.params.data)
    const player = req.query.player as string;
    if (player === undefined) {
        return res.status(400).send("player is required");
    }
    db.all<Database>("SELECT * FROM blocks WHERE name = ? ORDER BY unix ASC LIMIT ?", [player,cnt], (err, row) => {
        const resData: SearchTimeRes = row.map((v) => {
            return {
                name: v.name,
                mode: v.mode,
                block: v.block,
                x: v.x,
                y: v.y,
                z: v.z,
                time: v.time,
                unix: v.unix
            }
        });
        res.json(resData);
    });
})
app.get('/insert', function (req, res) {
    db.serialize(() => {
        db.run("INSERT INTO blocks VALUES (?,?,?,?,?,?,?,?,?,?)", ["kaito02020424", "null", "Break", "minecraft:stone", 0, 0, 0, "OverWorld", "2021/10/10 10:10:10", 1633833010]);
    });
    res.status(200).send("OK");
})
*/
app.listen(3000)
