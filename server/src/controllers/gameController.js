const pool = require("./../database/db");

class GameController {
  constructor() {
    this.gameData = {};
  }

  async start() {
    pool.query("SELECT * FROM factions", (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      this.gameData.factions = res.rows;
      return this.gameData;
    });
  }
}

module.exports = GameController;
