use LegalOfficeManagement
db.createUser(
{
user : "legalAdmin",
pwd : "UWMVD2SkPx1maUfWRvNk",
roles: [{role: "readWrite", db: "LegalOfficeManagement"},
{role: "dbAdmin", db: "LegalOfficeManagement"}]
})
