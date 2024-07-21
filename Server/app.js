import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import MainModel from "./model/MainModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const model = new MainModel(); // Create an instance of MainModel
const port = 5000;

app.use(express.json());
app.use(session({
    secret: "KeeperApp",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/Note",async (req,res)=>{
    try{
        const {title ,content}=req.body.newNote;
        const result=await model.setNote(title,content);
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Faild to add Note"});
    }
});
app.get("/Notes",async (req,res)=>{
    try{
        const getNotes=await model.getNotes();
        res.status(200).json(getNotes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Faild to get Notes"});
    }
});
app.delete("/Notes",async(req,res)=>{
    try{
        const {node_id}=req.body
        const deleteNote=await model.deleteNote(node_id); 
    }
    catch(err){
        throw err;
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});