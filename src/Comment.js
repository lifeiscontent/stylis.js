import {COMMENT} from './Enum.js'
import {from, strlen, substr, trim, node, push, source, next, peek, caret, slice} from './Utility.js'

/**
 * @param {Object} read
 * @param {Array<string>} stack
 * @param {number} type
 */
export function comment (read, stack, type) {
	var char = 0
	var index = caret(read) - 2
	var value = trim(from(peek(read, 0))) || from(type)
	var offset = type === 42 ? 2 : 1

	while (char = next(read, type))
		if (type === 47 && char === 10)
			break
		else if (type === 42 && char === 42 && peek(read, 0) !== 42 && next(read, type) === 47)
			break

	push(stack, node(COMMENT, value, substr(value = slice(read, index, caret(read)), 2, strlen(value) - offset), value, source(read)))
}
