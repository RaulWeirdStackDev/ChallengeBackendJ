import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";


export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
allowExitOnIdle: true,
});

//  console.log(process.env.USER, process.env.HOST, process.env.DATABASE, process.env.PASSWORD);


export const obtenerDB = async () => {
  try {
    const result = await db.query("SELECT current_database()");
    console.log(
      `Conectado a la base de datos ${result.rows[0].current_database}`
    );
  } catch (error) {
  if (error instanceof Error) {
    console.log("Error al conectar a la base de datos", error.message);
  } else {
    console.log("Error desconocido al conectar a la base de datos");
  }
}
};
