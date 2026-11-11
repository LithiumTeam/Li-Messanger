let pool = require("../utils/modelUtil.js");

class ChatModel {
  async InsertPrivateChat(user_id,target_id) {
    try {

	    let res1 = await pool.query(`
	    SELECT c.id
FROM chats AS c
INNER JOIN chat_members AS cm1
    ON cm1.chat_id = c.id
INNER JOIN chat_members AS cm2
    ON cm2.chat_id = c.id
WHERE c.type = 'private'
  AND cm1.user_id = ?
  AND cm2.user_id = ?
LIMIT 1;
		    `,[user_id,target_id]);
	    if(res1[0].length == 0){
		 let res = await pool.query(`INSERT INTO chats (type, created_by)
VALUES ('private', ?);`, [
        	      user_id
      	   	]);
      	    	return res;
	    }else{
		return {"error":"this chat exists"};
	    }

	} catch (err) {
      	    console.log(err);
            return { error: "there was a error" };
    }
  }

  async InsertPublicChat(title, created_by) {
    try {
      let res = await pool.query(
        `INSERT INTO chats (type,title,created_by) VALUES ("public",?,?)`,
        [title, created_by],
      );
      return res;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }

  async GetChats(user_id) {
    try {
      let res = await pool.query(
        `SELECT
    c.id,
    c.type,
    c.title,
    c.avatar,
    m.content AS last_message,
    m.created_at AS last_message_at
FROM chats AS c

INNER JOIN chat_members AS cm
    ON cm.chat_id = c.id

LEFT JOIN messages AS m
    ON m.id = (
        SELECT MAX(m2.id)
        FROM messages AS m2
        WHERE m2.chat_id = c.id
    )

WHERE cm.user_id = ?

ORDER BY COALESCE(m.created_at, c.created_at) DESC;`,
        [user_id],
      );
      let data = res[0];
      return data;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }

  async GetChatDetail(chat_id, user_id) {
    try {
      let res = await pool.query(
        `SELECT
    c.id,
    c.type,
    c.title,
    c.avatar,
    c.created_by,
    c.created_at
FROM chats AS c
INNER JOIN chat_members AS cm
    ON cm.chat_id = c.id
WHERE
    c.id = ?
    AND cm.user_id = ?;`,
        [chat_id, user_id],
      );
      let data = res[0];
      return data;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }
}

module.exports = ChatModel;
