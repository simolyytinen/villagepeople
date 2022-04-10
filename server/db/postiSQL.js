var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: 'root',
    database: 'villagepeople'
});

const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results);
        });
    })
}

module.exports = {

    getPostinumero: (postinro) => {
        let sql = "SELECT * FROM posti WHERE postinro LIKE ?";
        return executeSQL(sql, [postinro]);
    },

    postPostinumero: (postinro, alue) => {
        let sql = "INSERT INTO posti (postinro, toimipaikka) VALUES (?, ?)";
        return executeSQL(sql, [postinro, alue])
    }

}