import { createContext, useContext } from 'react'

/**
 * Exam mode (the placement check): answers are not marked, words are not
 * tappable, transcripts and translations stay hidden, no support tiles.
 */
export const ExamMode = createContext(false)

export const useExam = () => useContext(ExamMode)
