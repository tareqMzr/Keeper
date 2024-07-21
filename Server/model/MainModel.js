import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const db=new pg.Client({
    user:process.env.POSTGRES_USER,
    host:process.env.POSTGRES_HOST,
    database:process.env.POSTGRES_DB,
    password:process.env.POSTGRES_PASSWORD,
    port:process.env.POSTGRES_PORT
});

db.connect();
class MainModel{
    async setNote(title,content){
        try{
            const res= await db.query("INSERT INTO notes(title, content) VALUES ( $1, $2) RETURNING *;",[title,content]);
            return res.rows[0];
        }
        catch(err){
            throw err;
        }
    }
    async getNotes(){
        try{
            const res=await db.query("SELECT * FROM notes ORDER BY note_id ASC");
            return res.rows;
        }
        catch(err){
            throw err;
        }
    }
    async deleteNote(note_id){
        try{
            const res=await db.query("DELETE FROM notes WHERE note_id=$1;",[note_id]);
            return true;
        }
        catch(err){
            throw err;
        }
    }
}

export default MainModel;