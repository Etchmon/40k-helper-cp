const pool = require("./../database/db");

class GameController {
  constructor() {
    this.gameData = {};
  }

  async start() {
    try {
      const res = await pool.query("SELECT * FROM factions");
      this.gameData.factions = res.rows;
      return this.gameData.factions;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = GameController;
