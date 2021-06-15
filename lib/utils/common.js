import { nanoid } from 'nanoid'

export function generateId(length = 10) {
    return nanoid(length);
}
