const faker = require('faker');
 
 
const getRandomJudges = (n) => ({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    court: faker.address.cityName(),
    descripion: faker.random.words(12)
});
 
const getRandomLegalEntities = (n) => ({
    roleInCase: faker.random.arrayElement(['WITNESS', 'DEFENDANT']),
    decription: faker.random.words(12),
    contactDetail: {
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        photo: faker.image.avatar(),
        type: faker.random.arrayElement(['PERSON', 'COMPANY']),
        name: faker.name.firstName(),
        surname: faker.name.lastName()
    }
});
 
const getRandomSentenceAppeals = (n) => ({
    sentence: faker.random.words(12),
    description: faker.random.words(12),
    type: faker.random.arrayElement(['SENTENCE', 'APPEAL']),
    status: faker.random.arrayElement(['Open', 'Closed']),
    date: faker.date.past()
 
});
 
 
const getMultiple = (fn, cnt=10) => new Array(cnt).fill(null).map(fn)
 
const getRandomCase = () => ({
    name: faker.random.alphaNumeric,
    type: faker.random.arrayElement(['CRIMINAL', 'CIVIL', 'FAMILY']),
    description: faker.random.words(10),
    status: faker.random.arrayElement(['OPEN', 'CLOSED', 'REOPENED']),
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
    judges: getMultiple(getRandomJudges, 2),
    legalEntities: getMultiple(getRandomLegalEntities, 2),
    sentenceAppeals: getMultiple(getRandomSentenceAppeals, 2),
    // affiliatedClients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    // assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
 
const fs = require('fs');
fs.writeFile('./examples/faker_data1.json', JSON.stringify(getRandomCase()), 'utf8', () => {});