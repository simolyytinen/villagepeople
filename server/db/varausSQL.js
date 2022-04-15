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

    getVaraukset: (mokki_id, asiakas_id) => {
        let sql = "SELECT * FROM varaus WHERE mokki_id LIKE ? AND asiakas_id LIKE ?";
        return executeSQL(sql, [mokki_id, asiakas_id]);
    },

    deleteVaraus: (varaus_id) => {
        let sql = "DELETE FROM varaus WHERE varaus_id=?";
        return executeSQL(sql, [varaus_id]);
    },

    insertVaraus: (asiakas_id, mokki_id, /* varattu_pvm, vahvistus_pvm, */varattu_alkupvm, varattu_loppupvm) => {
        let sql = "INSERT INTO varaus (asiakas_id, mokki_id, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm) values (?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()+INTERVAL 1 DAY, ?, ?)"
        return executeSQL(sql, [asiakas_id, mokki_id, /* varattu_pvm, vahvistus_pvm, */varattu_alkupvm, varattu_loppupvm]);
    },

    updateVaraus: (varattu_alkupvm, varattu_loppupvm, varaus_id) => {
        let sql = "UPDATE varaus SET varattu_alkupvm=?, varattu_loppupvm=? WHERE varaus_id=?";
        return executeSQL(sql, [varattu_alkupvm, varattu_loppupvm, varaus_id]);
    },

}