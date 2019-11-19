import Chessboard from "chessboardjsx";
import h from "react-hyperscript";
import hyperscript from "hyperscript-helpers";
import { IS_WHITE_TURN } from "./properties"

const { strong, div, figure, figcaption, img } = hyperscript(h);

function InfoArea(props) {
  const { status, turn } = props;
  console.log(`status`, status, props)
  const bgColor = turn === IS_WHITE_TURN ? 'white' : 'black';
  return div(".game-info", [
    div(".turn", [strong("Turn")]),
    div("#player-turn-box", { style: { 'backgroundColor': bgColor } }, []),
    div(".game-status", [status])
  ])
}

function ActionArea(props) {
  const {next} = props;
  return figure({onClick : ev => next({UNDO: void 0})}, [
    img(".undo", { src: "https://img.icons8.com/carbon-copy/52/000000/undo.png", alt: "undo" }),
    figcaption([
      strong("Undo")
    ])
  ])
}

function ChessBoardWithInfo(props) {
  console.log(`props`, props)
  const { draggable, width, position, boardStyle, squareStyles, onSquareClick, turn, status, undo, next } = props;
  const chessBoardProps = { draggable, width, position, boardStyle, squareStyles, onSquareClick, undo };
  const infoAreaProps = { turn, status };
  const actionAreaProps = {next};

  console.info(`chessBoardProps`, position);

  return div(".game", [
    div(".game-board", [
      h(Chessboard, chessBoardProps)
    ]),
    h(InfoArea, infoAreaProps),
    h(ActionArea, actionAreaProps)
  ])
}

export default ChessBoardWithInfo

