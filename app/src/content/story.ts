import data from '../../../content/story/prologue.json'
import { Session } from './schema'

// Story scenes outside units (content/story): for now the prologue
// "Не тот кабинет" — the first meeting in Room 17 before the placement check.
export const PROLOGUE = Session.parse(data)

/** The prologue is over: the player was invited back to Room 17. */
export const PROLOGUE_FLAG = 'prologue_completed'
/** The placement check in Room 70 is over: "Back to Room 17" leads to unit 001. */
export const PLACEMENT_FLAG = 'placement_completed'
