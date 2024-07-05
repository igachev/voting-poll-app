import mysql, { ResultSetHeader } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }).promise()

 export async function getAllUsers() {
    const [rows] = await pool.query("select * from users")
    return rows
  }

  export async function getUser(userId: number) {
    const result = await pool.query<ResultSetHeader>("SELECT * FROM `users` WHERE id=?",[userId])
    const resultData: any = result[0]
    const userData:{id:number;email:string} = {id: resultData[0].id, email: resultData[0].email}
    return userData
  }

  export async function isRegistered(email:string) {
    const result = await pool.query<ResultSetHeader>("SELECT * FROM `users` WHERE email=?",[email])
    const userData: any = result[0]
    if(userData[0] != undefined) {
      return true;
    }
    return false;
  }

  export async function registerUser(email:string, password: string) {
    const result = await pool.query<ResultSetHeader>("INSERT INTO `users` (email,password) VALUES(?,?)",[email,password])
    const userId = result[0].insertId
    const userData:any = await getUser(userId)
    return userData
  }

  export async function loginUser(email: string, password: string) {
    const result = await pool.query<ResultSetHeader>("SELECT * FROM `users` WHERE email=? AND password=?",[email,password])
    const userData: any = result[0]
    if(userData[0] == undefined) {
      throw new Error("Invalid email or password!")
    }
    return userData[0]
  }
  