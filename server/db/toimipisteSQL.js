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

    getToimipisteet: (alue_id) => {
        let sql = "SELECT * FROM alue WHERE alue_id LIKE ?";
        return executeSQL(sql, [alue_id]);
    },

    postToimipiste: (nimi) => {
        let sql = "INSERT INTO alue (nimi) VALUES (?)";
        return executeSQL(sql, [nimi])
    },

    deleteToimipiste: (alueid) => {
        let sql = "DELETE FROM alue WHERE alue_id = ?";
        return executeSQL(sql, [alueid])
    },

    updateToimipiste: (nimi, alueid) => {
        let sql = "UPDATE alue SET nimi = ? WHERE alue_id = ?";
        return executeSQL(sql, [nimi, alueid])
    },
}