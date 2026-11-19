import 'fake-indexeddb/auto'
import '@testing-library/jest-dom/vitest'

// Unfinished runs are kept in localStorage (lesson/resume.ts): each test starts clean.
beforeEach(() => {
  try {
    localStorage.clear()
  } catch {
    // no storage in this environment
  }
})
