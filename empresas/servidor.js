import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";

const { Pool } = pkg;
const app = express();

// Serve os arquivos estáticos da pasta public
app.use(express.static("prototipo"));
app.use(bodyParser.json());

// Conexão com o banco PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "empresas",
  password: "rictz0122$",
  port: 5432,
});

// Rota para cadastro
app.post("/cadastro", async (req, res) => {
  try {
    const { cnpj, nome, endereco, email, tel, residuos, horario, horario_final  } = req.body;
    await pool.query(
      "INSERT INTO empresas (cnpj, nome, endereco, email, tel, residuos, horario, horario_final) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [cnpj, nome, endereco, email, tel, residuos, horario, horario_final]
    );
    res.json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao cadastrar." });
  }
});

app.get("/empresas", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM empresas");
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar empresas." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/index-protótipo.html");
});
