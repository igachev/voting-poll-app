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
    const result = await pool.query<ResultSetHeader>("SELECT * FROM `users` WHERE user_id=?",[userId])
    const resultData: any = result[0]
    const userData:{id:number;email:string} = {id: resultData[0].user_id, email: resultData[0].user_email}
    return userData
  }

  export async function isRegistered(email:string) {
    const result = await pool.query<ResultSetHeader>("SELECT * FROM `users` WHERE user_email=?",[email])
    const userData: any = result[0]
    if(userData[0] != undefined) {
      return true;
    }
    return false;
  }

  export async function registerUser(email:string, password: string) {
    const result = await pool.query<ResultSetHeader>("INSERT INTO `users` (user_email,user_password) VALUES(?,?)",[email,password])
    const userId = result[0].insertId
    const userData:any = await getUser(userId)
    return userData
  }

  export async function loginUser(email: string, password: string) {
    const result = await pool.query<ResultSetHeader>("SELECT * FROM `users` WHERE user_email=? AND user_password=?",[email,password])
    const userData: any = result[0]
    if(userData[0] == undefined) {
      throw new Error("Invalid email or password!")
    }
    return userData[0]
  }

  export async function getPolls() {
    const result = await pool.query<ResultSetHeader>(`SELECT * FROM polls`)
    const pollsData: any = result[0]
    const polls = []
    for(let i = 0; i < pollsData.length; i++) {
      const pollOptions = await getPollOptions(pollsData[i].poll_id)
      polls.push({...pollsData[i],options:pollOptions})
    }
    return polls
  }

  export async function getPoll(pollId: number) {
    const result = await pool.query<ResultSetHeader>(`SELECT * FROM polls WHERE poll_id=?`,[pollId])
    const pollData: any = result[0]
    const pollOptions = await getPollOptions(pollId)
    const poll = {...pollData[0],pollOptions}
    return poll
  }

  export async function getPollOptions(pollId: number) {
    const result = await pool.query<ResultSetHeader>(`
      SELECT po.poll_option 
      FROM polls p 
      JOIN poll_options po 
      ON p.poll_id = po.poll_id 
      WHERE p.poll_id = ?`,[pollId])
      const pollOptions: any = result[0]
      if(pollOptions.length === 0) {
        throw new Error("There is no such poll!")
      }
      return pollOptions
  }

  export async function addPoll(pollTitle: string, pollDescription: string,userId: number) {
    const result = await pool.query<ResultSetHeader>(`
      INSERT INTO polls (poll_title,poll_description,user_id)
      VALUES(?,?,?)
      `,[pollTitle,pollDescription,userId])
      return result[0].insertId
  }

  export async function addPollOption(pollOption: string,pollId: number) {
    const result = await pool.query<ResultSetHeader>(`
      INSERT INTO poll_options (poll_option,poll_id)
      VALUES (?,?)
      `,[pollOption,pollId])
      return "Poll Option was added"
  }

  export async function deletePoll(pollId: number, userId: number) {
    
      const checkForPollAndUser = await pool.query<ResultSetHeader>(`
        SELECT * FROM polls
        WHERE poll_id = ? AND user_id = ?
        `,[pollId,userId])
       const check: any = checkForPollAndUser[0]

        if(check.length > 0) {
          const result1 = await pool.query<ResultSetHeader>(`
            DELETE FROM poll_options
            WHERE poll_id = ?
            `,[pollId])
            const result2 = await pool.query<ResultSetHeader>(`
              DELETE FROM polls
              WHERE poll_id = ? AND user_id = ?
              `,[pollId,userId])
        
             // console.log(result2[0])
          return "Poll and its options were deleted"
        }
      
        throw new Error("you cannot delete this item")
  }

  export async function pollVote(userId: number,pollId: number,selectedOption: string) {
    const result = await pool.query<ResultSetHeader>(`
      INSERT INTO poll_votes (user_id, poll_id, selected_option)
            VALUES (?, ?, ?)
      `,[userId,pollId,selectedOption])
      const userVoted = result[0]
      return userVoted
  }
  