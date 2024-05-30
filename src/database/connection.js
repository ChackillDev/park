import "dotenv/config";
import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
  allowExitOnIdle: true
});

export default pool;
