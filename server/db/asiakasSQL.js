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

    getAsiakkaat: (asiakas_id, etunimi, sukunimi, email) => {
        let sql = "SELECT asiakas_id, etunimi, sukunimi, email, puhelinnro, lahiosoite, a.postinro, p.toimipaikka FROM asiakas a JOIN posti p ON a.postinro = p.postinro WHERE asiakas_id LIKE ? AND etunimi LIKE ? AND sukunimi LIKE ? AND email LIKE ?";
        return executeSQL(sql, [asiakas_id, etunimi, sukunimi, email]);
    },

    postAsiakas: (asiakas) => {
        let sql = "INSERT INTO asiakas (postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro) VALUES (?, ?, ?, ?, ?, ?)";
        return executeSQL(sql, asiakas)
    },

    deleteAsiakas: (asiakas_id) => {
        let sql = "DELETE FROM asiakas WHERE asiakas_id = ?";
        return executeSQL(sql, [asiakas_id])
    },

    updateAsiakas: (asiakas_id, postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro) => {
        let sql = "UPDATE asiakas SET postinro = ?, etunimi = ?, sukunimi = ?, lahiosoite = ?, email = ?, puhelinnro = ? WHERE asiakas_id = ?";
        return executeSQL(sql, [postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro, asiakas_id])
    },
}