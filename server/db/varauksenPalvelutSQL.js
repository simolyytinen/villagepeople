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

    getVarauksenPalvelut: (asiakas_id) => {
        let sql = "SELECT vp.varaus_id, v.asiakas_id, vp.palvelu_id, p.nimi, vp.lkm FROM varauksen_palvelut vp JOIN varaus v on v.varaus_id = vp.varaus_id JOIN palvelu p on vp.palvelu_id = p.palvelu_id WHERE v.asiakas_id=?";

        //Täällä lauseella saadaan samaan taulukkoon majoitusvaraus ja palveluvaraukset ko. majoitusvarauksille. MUTTA, jos varaukselle ei ole palveluvarausta, niin majoitusvarauskaan ei tulostu..
        // let sql = "SELECT v.varaus_id, v.asiakas_id, v.mokki_id, m.mokkinimi, v.varattu_pvm, v.vahvistus_pvm, v.varattu_alkupvm, v.varattu_loppupvm, vp.palvelu_id, vp.lkm, p.nimi ";
        // sql = sql + "FROM varaus v JOIN mokki m on m.mokki_id = v.mokki_id ";
        // sql = sql + "JOIN varauksen_palvelut vp on vp.varaus_id = v.varaus_id ";
        // sql = sql + "JOIN palvelu p on vp.palvelu_id = p.palvelu_id WHERE asiakas_id=?";
        console.log(sql);
        return executeSQL(sql, [asiakas_id]);
    },

    deleteVarauksenPalvelu: (varaus_id) => {
        let sql = "DELETE FROM varauksen_palvelut WHERE varaus_id=?";
        console.log(sql);
        return executeSQL(sql, [varaus_id]);
    },

    insertVarauksenPalvelut: (varaus_id, palvelu_id) => {
        let sql = "INSERT INTO varauksen_palvelut (varaus_id, palvelu_id, lkm) values (?, ?, 1)";
        console.log(sql);
        return executeSQL(sql, [varaus_id, palvelu_id]);
    },

    // updateVaraus: (varattu_alkupvm, varattu_loppupvm, varaus_id) => {
    //     let sql = "UPDATE varaus SET varattu_alkupvm=?, varattu_loppupvm=? WHERE varaus_id=?";
    //     return executeSQL(sql, [varattu_alkupvm, varattu_loppupvm, varaus_id]);
    // },

    getVarauksenPalvelutEhdoilla: (alue_id, alkuPvm, loppuPvm) => {
        let sql = "SELECT a.palvelu_id, b.nimi, d.etunimi, d.sukunimi, c.varattu_alkupvm, c.varattu_loppupvm, a.lkm FROM varauksen_palvelut a " +
        "JOIN palvelu b ON a.palvelu_id = b.palvelu_id " +
        "JOIN varaus c ON a.varaus_id = c.varaus_id " +
        "JOIN asiakas d ON c.asiakas_id = d.asiakas_id " +
        "WHERE b.alue_id = ? AND c.varattu_alkupvm BETWEEN ? AND ? " +
        "OR c.varattu_loppupvm BETWEEN ? AND ? ORDER BY c.varattu_alkupvm";
        return executeSQL(sql, [alue_id, alkuPvm, loppuPvm, alkuPvm, loppuPvm])
    }

}