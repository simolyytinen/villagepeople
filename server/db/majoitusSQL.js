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

    getMokit: (alue_id) => {
        let sql = "SELECT * FROM mokki WHERE alue_id LIKE ?";
        return executeSQL(sql, [alue_id]);
    },

    getVapaatMokit: (alue_id_taulukko, alkuPvm, loppuPvm) => {
        let sql = "SELECT a.*, b.nimi FROM mokki a JOIN alue b ON a.alue_id = b.alue_id " +
        "WHERE a.alue_id IN (?) AND a.mokki_id NOT IN " +
        "(SELECT mokki_id FROM varaus WHERE " +
        "varattu_alkupvm BETWEEN ? AND ? OR varattu_loppupvm BETWEEN ? AND ?) " +
       "ORDER BY a.mokki_id";
       return executeSQL(sql, [alue_id_taulukko, alkuPvm, loppuPvm, alkuPvm, loppuPvm]);
    },

    postMokki: (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu) => {
        let sql = "INSERT INTO mokki (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return executeSQL(sql, [alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu])
    },

    deleteMokki: (mokki_id) => {
        let sql = "DELETE FROM mokki WHERE mokki_id = ?";
        return executeSQL(sql, [mokki_id])
    },

    updateMokki: (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, mokki_id) => {
        let sql = "UPDATE mokki SET alue_id = ?, postinro = ?, mokkinimi = ?, katuosoite = ?, hinta = ?, kuvaus = ?, henkilomaara = ?, varustelu = ? WHERE mokki_id = ?";
        return executeSQL(sql, [alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu, mokki_id])
    },

}