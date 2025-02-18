import { sql, poolPromise } from "../connection.js";

export const getAllPosts = async () => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query("SELECT * FROM Posts ORDER BY created_at DESC");
  return result.recordset;
};

export const getPostById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Posts WHERE id = @id");
  return result.recordset[0];
};

export const createPost = async (title, content, author) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("title", sql.NVarChar, title)
    .input("content", sql.Text, content)
    .input("author", sql.NVarChar, author)
    .query(
      "INSERT INTO Posts (title, content, author) OUTPUT INSERTED.* VALUES (@title, @content, @author)"
    );
  return result.recordset[0];
};
