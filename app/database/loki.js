import Loki from 'lokijs';

const Collections = {};

const LOKI_DB_NAME = 'list.db';
const LOKI_DB_OPTIONS = {
  autosave: false
};
const LOKI_COLLECTIONS = {
  'Lists': {
    unique: ['id', 'name'],
    indices: ['createdAt'],
    autoupdate: false
  },
  'ListGroups': {
    unique: ['id'],
    indices: ['listId', 'createdAt'],
    autoupdate: false
  },
  'GroupFields': {
    unique: ['id'],
    indices: ['groupId', 'createdAt'],
    autoupdate: false
  },
  'ListEntries': {
    unique: ['id'],
    indices: ['listId', 'createdAt'],
    autoupdate: false
  },
  'Entries': {
    unique: ['id'],
    indices: ['listEntryId', 'groupFieldId', 'createdAt'],
    autoupdate: false
  }
};

const Db = new Loki(LOKI_DB_NAME, LOKI_DB_OPTIONS);

console.debug('Db', Db);

Db.loadDatabase({}, (err) => {
  if (err) throw err;

  Object.keys(LOKI_COLLECTIONS).reduce((collections, name) => {
    if (Db.getCollection(name)) collections[name] = Db.getCollection(name);
    else collections[name] = Db.addCollection(name, LOKI_COLLECTIONS[name]);
    return collections;
  }, Collections);
});

console.debug('Collections', Collections);

export {Db, Collections};
