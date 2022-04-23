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

    // getVaraukset: (mokki_id, asiakas_id) => {
    //     let sql = "SELECT * FROM varaus WHERE mokki_id LIKE ? AND asiakas_id LIKE ?";
    //     console.log(sql);
    //     return executeSQL(sql, [mokki_id, asiakas_id]);
    // },
    getVarauksetEhdoilla: (alue_id, alkuPvm, loppuPvm) => {
        let sql = "SELECT a.varaus_id, b.etunimi, b.sukunimi, c.mokkinimi, a.varattu_alkupvm, a.varattu_loppupvm FROM varaus a " +
        "JOIN mokki c ON a.mokki_id = c.mokki_id JOIN asiakas b ON a.asiakas_id = b.asiakas_id " +
        "WHERE c.alue_id = ? " +
        "AND a.varattu_alkupvm BETWEEN ? AND ? OR a.varattu_loppupvm BETWEEN ? AND ? ORDER BY a.varattu_alkupvm";
        
        return executeSQL(sql, [alue_id, alkuPvm, loppuPvm, alkuPvm, loppuPvm]);
    },

    getVaraukset: (mokki_id, asiakas_id) => {
        let sql = "SELECT varaus_id, v.asiakas_id, v.mokki_id, m.mokkinimi, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm, a.etunimi, a.sukunimi, al.nimi as sijainti FROM varaus v ";
        sql = sql + "JOIN asiakas a ON v.asiakas_id = a.asiakas_id ";
        sql = sql + "JOIN mokki m on v.mokki_id = m.mokki_id JOIN alue al on m.alue_id = al.alue_id WHERE v.mokki_id LIKE ? AND v.asiakas_id LIKE ?";
        console.log(sql);
        return executeSQL(sql, [mokki_id, asiakas_id]);
    },

    getKaikkiVaraukset: () => {
        let sql = "SELECT varaus_id, v.asiakas_id, v.mokki_id, m.mokkinimi, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm, a.etunimi, a.sukunimi, al.nimi as sijainti FROM varaus v ";
        sql = sql + "JOIN asiakas a ON v.asiakas_id = a.asiakas_id ";
        sql = sql + "JOIN mokki m on v.mokki_id = m.mokki_id JOIN alue al on m.alue_id = al.alue_id";
        console.log(sql);
        return executeSQL(sql, []);
    },

    deleteVaraus: (varaus_id) => {
        let sql = "DELETE FROM varaus WHERE varaus_id=?";
        console.log(sql);
        return executeSQL(sql, [varaus_id]);
    },

    insertVaraus: (asiakas_id, mokki_id, /* varattu_pvm, vahvistus_pvm, */varattu_alkupvm, varattu_loppupvm) => {
        let sql = "INSERT INTO varaus (asiakas_id, mokki_id, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm) values (?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()+INTERVAL 1 DAY, ?, ?)"
        console.log(sql);
        return executeSQL(sql, [asiakas_id, mokki_id, /* varattu_pvm, vahvistus_pvm, */varattu_alkupvm, varattu_loppupvm]);
    },

    updateVaraus: (alkupvm, loppupvm, varaus_id) => {
        let sql = "UPDATE varaus SET varattu_alkupvm=from_unixtime(?), varattu_loppupvm=from_unixtime(?) WHERE varaus_id=?";
        console.log(sql);
        return executeSQL(sql, [alkupvm, loppupvm, varaus_id]);
    },

}