export function dumpTest(test) {
    const dump = {
        id: test.id,
        name: test.name,
        description: test.description,
        price: test.price
    }

    return dump;
}
