const faker = require('faker');

var dates = [];

for(var i=0; i<15; i++)
    dates.push(faker.date.recent());
    
const getRandomAppointment = () => ({
    date: faker.random.arrayElements(dates, 3),
    description:faker.random.words(10)
});

var appointments = [];
for(var i=0; i<7; i++)
{
    appointments.push({
        date: faker.random.arrayElements(dates, 3),
        description:faker.random.words(10)
    });
}
 
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
 
 
const getMultiple = (fn, cnt=10) => new Array(cnt).fill(null).map(fn)


const getRandomClient = () => ({
    name: faker.name.findName(),
    pesel: faker.phone.phoneNumber(),
    description: faker.random.words(10),
    isActiveClient: true,
    historyOfAppointments: faker.random.arrayElements(appointments, 3),
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

const getRandomLawyer = () => ({
    username: faker.random.word(),
    password: faker.random.alphaNumeric(9),
    name: faker.name.firstName(),
    surname: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    photo: faker.image.avatar(),
    role: 'LAWYER',
    appointments: faker.random.arrayElements(appointments, 3),
    description: faker.random.words(12)
});
 
const getRandomSentenceAppeals = (n) => ({
    sentence: faker.random.words(12),
    description: faker.random.words(12),
    type: faker.random.arrayElement(['SENTENCE', 'APPEAL']),
    status: faker.random.arrayElement(['Open', 'Closed']),
    date: faker.date.past() 
});


const getRandomCase = () => ({
    name: faker.name.findName(),
    type: faker.random.arrayElement(['CRIMINAL', 'CIVIL', 'FAMILY']),
    description: faker.random.words(10),
    status: faker.random.arrayElement(['OPEN', 'CLOSED', 'REOPENED']),
    startDate: faker.date.recent(),
    endDate: faker.date.past(),
    judges: getMultiple(getRandomJudges, 2),
    legalEntities: getMultiple(getRandomLegalEntities, 2),
    sentenceAppeals: getMultiple(getRandomSentenceAppeals, 2)
});


 
const fs = require('fs');
fs.writeFile('./examples/randomcases.json', JSON.stringify(getRandomCase()), 'utf8', () => {});
fs.writeFile('./examples/randomclients.json', JSON.stringify(getRandomClient()), 'utf8', () => {});
fs.writeFile('./examples/randomlawyers.json', JSON.stringify(getRandomLawyer()), 'utf8', () => {});