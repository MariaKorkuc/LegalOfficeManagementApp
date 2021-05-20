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
    type: faker.random.arrayElement(['PERSON', 'COMPANY']),
    status: faker.random.arrayElement(['Open', 'Closed']),
    date: faker.date.past()
    
});


const getMultiple = (fn, cnt=10) => new Array(50).fill(null).map(fn)

const getRandomCase = () => ({
    name: faker.name.findName(),
    type: faker.random.arrayElement(['CRIMINAL', 'CIVIL', 'FAMILY']),
    description: faker.random.words(10),
    status: faker.random.arrayElement(['Open', 'Closed', 'Reopened']),
    startDate: faker.date.recent(),
    endDate: faker.date.past(),
    judges: getMultiple(getRandomJudges, 10),
    legalEntities: getMultiple(getRandomLegalEntities, 10),
    sentenceAppeals: getMultiple(getRandomSentenceAppeals, 10),
    // affiliatedClients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    // assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const fs = require('fs');
fs.writeFile('myjsonfile.json', JSON.stringify(getRandomCase()), 'utf8', () => {});