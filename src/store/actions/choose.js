import {
  LOCKED,
  STARTED,
} from '../constants';

import {
  selectCard,
  deselectCard,
  removeCard,
  submitMatch,
  startGame,
  completeGame,
  lockGame,
  updateScore,
  unlockGame,
  startTimer,
  stopTimer,
} from './';

import {
  getSuccessDuration,
  getFailureDuration,
  getPointsFromGuess,
  getPotentialSet,
  isFinalSet,
  wait,
} from '../../util';

/*
 * Every time a card is selected,
 * we dispatch a guess
 */
export const guess = () => (
  (dispatch, getState) => {
    const {
     sets,
     seen,
     selected,
     elapsedTime,
     completedSets,
    } = getState();

    /*
     * If:
     * the selection still matches one of the sets
     * we have found a potential set
     *
     * Else:
     * we have a bad guess
     * and we need to turn the cards back over
     */
    const potentialSetId = getPotentialSet(selected, sets);

    if (potentialSetId !== null) {
      /** we're on the right track but need to find more matches */
      if (selected.length < sets[potentialSetId].length) return;

      /** Is this the end of the game? */
      const isVictory = isFinalSet(completedSets, sets);

      /** Wait for a bit and then submit the match */
      dispatch(lockGame());
      wait(getSuccessDuration(isVictory)).then(() => {
        dispatch(submitMatch(potentialSetId));
        dispatch(updateScore(getPointsFromGuess(selected, seen)));

        selected.forEach((id) => {
          dispatch(deselectCard(id));
          dispatch(removeCard(id));
        });
        
        if (isVictory) {
          dispatch(stopTimer());
          dispatch(completeGame());
        }
        
        dispatch(unlockGame());
      });
    } else {
      /** Wait for a bit and then cancel the selection */
      dispatch(lockGame());
      wait(getFailureDuration(elapsedTime)).then(() => {
        selected.forEach(id => dispatch(deselectCard(id)));
        dispatch(unlockGame());
      });
    }
  }
);


/*
 * Choose is dispatched
 * whenever a user clicks a card.
 * It simplifies the components
 * because they only have one action
 * and all of the outcomes are managed here
 */
export const choose = cardId => (
  (dispatch, getState) => {
    const {
      sets,
      selected,
      remaining,
      gameState,
      gameLocked,
    } = getState();

    const matchSize = sets[0].length;

    /** the start of the game */
    if (gameState !== STARTED) {
      dispatch(startGame());
      dispatch(startTimer());
    }

    switch (true) {
      /** Noop if game is locked */
      case (gameLocked === LOCKED):
        break;

      /** Noop if card is already removed */
      case (!remaining.includes(cardId)):
        break;

      /** Turn card back over */
      case (selected.includes(cardId)):
        dispatch(deselectCard(cardId));
        break;

      /** Select a card */
      case (selected.length < matchSize): {
        dispatch(selectCard(cardId));
        dispatch(guess());
        break;
      }

      default:
        throw new Error(`
          Selection overflow:
          ${selected}
        `);
    }
  }
);
