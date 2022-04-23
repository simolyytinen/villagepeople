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

    getLasku: (lasku_id) => {
        let sql = "SELECT a.lasku_id, a.varaus_id, a.summa, a.alv, a.laskutus_pvm, a.erapaiva, a.maksettu, " +
        "c.etunimi, c.sukunimi, c.puhelinnro, c.email FROM lasku a " +
        "JOIN varaus b ON a.varaus_id = b.varaus_id " +
        "JOIN asiakas c ON b.asiakas_id = c.asiakas_id " +
        "WHERE lasku_id LIKE ?";
        return executeSQL(sql, [lasku_id]);
    },

    getVaraukset: (varaus_id) => {
        let sql = "SELECT a.varaus_id, b.mokkinimi, b.hinta " +
        "FROM varaus a JOIN mokki b ON a.mokki_id = b.mokki_id " +
        "WHERE a.varaus_id = ?";
        return executeSQL(sql, [varaus_id]);
    },

    getAvoimetVaraukset: () => {
        let sql = "SELECT a.varaus_id, a.varattu_alkupvm, a.varattu_loppupvm, b.mokkinimi, c.nimi as 'sijainti' FROM varaus a JOIN mokki b ON a.mokki_id = b.mokki_id " +
        "JOIN alue c ON b.alue_id = c.alue_id WHERE varaus_id NOT IN (SELECT varaus_id FROM lasku)";
        return executeSQL(sql, []);
    },

    getPalvelut: (varaus_id) => {
        let sql = "SELECT a.varaus_id, a.palvelu_id, a.lkm, b.nimi, b.hinta as 'yksikkohinta', (a.lkm * b.hinta) as 'kokonaishinta' " +
        "FROM varauksen_palvelut a JOIN palvelu b ON a.palvelu_id = b.palvelu_id " +
        "WHERE a.varaus_id = ?";
        return executeSQL(sql, [varaus_id]);
    },

    getLaskut: () => {
        let sql = "SELECT a.lasku_id, a.varaus_id, a.summa, a.alv, a.laskutus_pvm, a.erapaiva, a.maksettu, " +
        "c.etunimi, c.sukunimi, c.puhelinnro, c.email FROM lasku a " +
        "JOIN varaus b ON a.varaus_id = b.varaus_id " +
        "JOIN asiakas c ON b.asiakas_id = c.asiakas_id ";
        
        console.log(sql);
        return executeSQL(sql, []);
    },

    postLasku: (varaus_id, summa, alv) => {
        let sql = "INSERT INTO lasku (varaus_id, summa, alv, laskutus_pvm, erapaiva, maksettu) " +
        "VALUES (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 10 DAY), false)";
        return executeSQL(sql, [varaus_id, summa, alv])
    },

    deleteLasku: (lasku_id) => {
        let sql = "DELETE FROM lasku WHERE lasku_id = ?";
        return executeSQL(sql, [lasku_id])
    },

    updateLasku: (lasku_id, summa, alv, erapaiva, maksettu) => {
        let sql = "UPDATE lasku SET  summa = ?, alv = ?, erapaiva = ?, maksettu = ? WHERE lasku_id = ?";
        return executeSQL(sql, [summa, alv, erapaiva, maksettu, lasku_id])
    },

}