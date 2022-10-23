
const config = {
        user : "sa",
        port: 1434,
        password : "1234",
        server: "localhost",
        database: "DBTEST2",
        options: {
            trustedconnection :false,
            enableArithAbort: true,
            encrypt : false,
            intancename: '.'
        }
}

module.exports = config;