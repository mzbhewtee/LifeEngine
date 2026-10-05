const CellStates = require("../CellStates");
const BodyCell = require("./BodyCell");
const Neighbors = require("../../../Grid/Neighbors");

const TOXIN_CHANCE = 0.05;   // chance per tick per touching victim cell
const TOXIN_AGING = 5;       // ticks of lifespan removed on each hit

class ToxinCell extends BodyCell {
    constructor(org, loc_col, loc_row) {
        super(CellStates.toxin, org, loc_col, loc_row);
    }

    performFunction() {
        var env = this.org.env;
        var c = this.getRealCol();
        var r = this.getRealRow();
        for (var loc of Neighbors.adjacent) {
            var cell = env.grid_map.cellAt(c + loc[0], r + loc[1]);
            this.poisonNeighbor(cell);
        }
    }

    poisonNeighbor(n_cell) {
        if (n_cell == null || n_cell.owner == null || n_cell.owner == this.org
            || !n_cell.owner.living || n_cell.state == CellStates.armor)
            return;
        if (Math.random() < TOXIN_CHANCE) {
            n_cell.owner.lifetime += TOXIN_AGING;
        }
    }
}

module.exports = ToxinCell;