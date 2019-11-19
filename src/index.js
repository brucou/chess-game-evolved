import { render } from "react-dom";
import h from "react-hyperscript";
import { getEventEmitterAdapter, Machine } from "react-state-driven";
import { createStateMachine } from "kingly";
import ChessBoardWithInfo from './ChessBoardWithInfo';
import emitonoff from "emitonoff";
import Chess from "chess.js";

import gameFsmDef from "./fsm";
import "./index.css";

const eventEmitter = getEventEmitterAdapter(emitonoff);
const chessEngine = new Chess();
const gameFsm = createStateMachine(gameFsmDef, {
  debug: { console, checkContracts: null },
  // Injecting necessary dependencies
  eventEmitter,
  chessEngine
});

render(
  h(
    Machine, {
      fsm: gameFsm,
      eventHandler: eventEmitter,
      commandHandlers: {
        MOVE_PIECE: function (next, { from, to }, effectHandlers) {
          const { chessEngine } = effectHandlers;
          chessEngine.move({
            from,
            to,
            promotion: "q" // always promote to a queen for example simplicity
          });
        },
        UNDO_MOVE: function (next, _, effectHandlers) {
          const { chessEngine } = effectHandlers;
          chessEngine.undo();
        }
      },
      effectHandlers: {
        chessEngine
      },
      renderWith: ChessBoardWithInfo,
      options: { initialEvent: { START: void 0 } }
    },
    []
  ),
  document.getElementById("root")
);
