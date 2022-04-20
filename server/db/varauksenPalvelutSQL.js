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
        let sql = "SELECT vp.varaus_id, v.asiakas_id, vp.palvelu_id, vp.lkm FROM varauksen_palvelut vp JOIN varaus v on v.varaus_id = vp.varaus_id WHERE v.asiakas_id=?";

        //Täällä lauseella saadaan samaan taulukkoon majoitusvaraus ja palveluvaraukset ko. majoitusvarauksille. MUTTA, jos varaukselle ei ole palveluvarausta, niin majoitusvarauskaan ei tulostu..
        // let sql = "SELECT v.varaus_id, v.asiakas_id, v.mokki_id, m.mokkinimi, v.varattu_pvm, v.vahvistus_pvm, v.varattu_alkupvm, v.varattu_loppupvm, vp.palvelu_id, vp.lkm, p.nimi ";
        // sql = sql + "FROM varaus v JOIN mokki m on m.mokki_id = v.mokki_id ";
        // sql = sql + "JOIN varauksen_palvelut vp on vp.varaus_id = v.varaus_id ";
        // sql = sql + "JOIN palvelu p on vp.palvelu_id = p.palvelu_id WHERE asiakas_id=?";
        return executeSQL(sql, [asiakas_id]);
    },



    // getKaikkiVaraukset: () => {
    //     let sql = ;
    //     return executeSQL(sql, []);
    // },

    // deleteVaraus: (varaus_id) => {
    //     let sql = "DELETE FROM varaus WHERE varaus_id=?";
    //     return executeSQL(sql, [varaus_id]);
    // },

    insertVarauksenPalvelut: (varaus_id, palvelu_id, lkm) => {
        let sql = "INSERT INTO varauksen_palvelut (varaus_id, palvelu_id, lkm) values (?, ?, ?)"
        return executeSQL(sql, [varaus_id, palvelu_id, lkm]);
    },

    // updateVaraus: (varattu_alkupvm, varattu_loppupvm, varaus_id) => {
    //     let sql = "UPDATE varaus SET varattu_alkupvm=?, varattu_loppupvm=? WHERE varaus_id=?";
    //     return executeSQL(sql, [varattu_alkupvm, varattu_loppupvm, varaus_id]);
    // },

}