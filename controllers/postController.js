const { sql, poolPromise } = require("../config/connection");

// Obtener todas las publicaciones (excluyendo eliminadas)
const getPosts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM Posts WHERE deletedAt IS NULL;");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
};

// Obtener un post por ID
const getPostById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM Posts WHERE id = @id AND deletedAt IS NULL");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la publicación" });
  }
};

// Crear una nueva publicación
const createPost = async (req, res) => {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ error: "Todos los campos obligatorios deben estar completos" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("title", sql.NVarChar(255), title)
      .input("content", sql.NVarChar(sql.MAX), content)
      .input("category", sql.NVarChar(100), category)
      .input("tags", sql.NVarChar(sql.MAX), tags ? tags.join(",") : null) // Guardar tags como cadena separada por comas
      .query(
        "INSERT INTO Posts (title, content, category, tags, createdAt) OUTPUT INSERTED.* VALUES (@title, @content, @category, @tags, GETDATE())"
      );

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la publicación" });
  }
};

// Actualizar una publicación
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  try {
    const pool = await poolPromise;

    // Verificar si el post existe
    const postExists = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Posts WHERE id = @id AND deletedAt IS NULL");

    if (postExists.recordset.length === 0) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    // Actualizar el post
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar(255), title)
      .input("content", sql.NVarChar(sql.MAX), content)
      .input("category", sql.NVarChar(100), category)
      .input("tags", sql.NVarChar(sql.MAX), tags ? tags.join(",") : null)
      .query(
        "UPDATE Posts SET title = @title, content = @content, category = @category, tags = @tags, updatedAt = GETDATE() WHERE id = @id"
      );

    res.json({ message: "Publicación actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la publicación" });
  }
};

// "Eliminar" una publicación (soft delete)
const deletePost = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("UPDATE Posts SET deletedAt = GETDATE() WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la publicación" });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
