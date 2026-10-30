import data from '../../../content/story/prologue.json'
import { Session } from './schema'

// Story scenes outside units (content/story): for now the prologue
// "Не тот кабинет" — the first meeting in Room 17 before unit 001.
export const PROLOGUE = Session.parse(data)
export const PROLOGUE_FLAG = 'prologue_done'
