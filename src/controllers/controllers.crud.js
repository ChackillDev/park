// importaciones y config

import pool from "../database/connection.js";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;


// 0.- funciones

// verifica usuario y devuelve token

const verificar = async (email, password) => {

  const verificado = await pool.query('SELECT * FROM skaters WHERE email = $1 AND password = $2', [email, password]);
  if (verificado) {
    const { sub, name } = { email, password };
    const token = jwt.sign({
      sub,
      name,
      exp: Date.now() + 120 * 1000
    }, secret);
    return token;
  }
}

// 1.- gets

export const listar = async (_, res) => {
  try {
    const results = await pool.query('SELECT * FROM skaters')
    const result = results.rows;
    res.render('lista', { skaters: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2.- posts

export const acceder = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await verificar(email, password)
    if (!token) {
      alert('Usuario no registrado')
      res.status(404).redirect('/')
    }
    const payload = jwt.verify(token, secret)
    if (Date.now() > payload.exp) {
      res.status(401).send('Token expirado')
    } else {
      res.status(200).redirect('/list');
    }
  } catch (error) {
    res.json({ message: error });
  }
}

export const agregar = async (req, res) => {
  try {
    const { email, nombre, password, anos_experiencia, especialidad, foto } = req.body;
    const token = await verificar(email, password)
    if (token) {
      await pool.query('INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado) VALUES ($1,$2,$3,$4,$5,$6,$7)', [email, nombre, password, anos_experiencia, especialidad, foto, false]);
      res.status(200).redirect('/list');
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}
