// English text renders as one button per word, so getByText cannot see a
// whole line. This matcher finds the line by the text of its wrapper.
export const line = (text: string | RegExp) => (_: string, el: Element | null) =>
  !!el?.matches('span[lang="en"]') && (typeof text === 'string' ? el.textContent === text : text.test(el.textContent ?? ''))
