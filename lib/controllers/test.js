import ghost        from '../ghost.js';
import TestList     from '../services/test/List.js';
import TestCreate   from '../services/test/Create.js';

export default {
    list    : ghost.runService(TestList),
    create  : ghost.runService(TestCreate)
}
