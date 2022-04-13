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

    getPalvelut: (nimi) => {
        let sql = "select p.palvelu_id, p.alue_id, a.nimi as sijainti, p.nimi, p.tyyppi, p.kuvaus, p.hinta, p.alv from palvelu p join alue a on a.alue_id = p.alue_id where 1=1 and p.nimi like ? '%'";
        // let sql = "select a.nimi as sijainti, p.nimi, p.kuvaus, p.hinta from palvelu p join alue a on a.alue_id = p.alue_id where 1=1 and p.nimi like ? '%'";
        // let sql = "select palvelu_id, alue_id, nimi from palvelu where 1=1 and nimi like ? '%'";
        console.log("sql " + sql);
        return executeSQL(sql, nimi);
    },

    getPalveluKortit: (nimi) => {
        let sql = "select p.palvelu_id, p.alue_id, a.nimi as sijainti, p.nimi, p.tyyppi, p.kuvaus, p.hinta, p.alv from palvelu p join alue a on a.alue_id = p.alue_id where 1=1 and p.nimi like ? '%' and tyyppi=1";
        console.log("sql " + sql);
        return executeSQL(sql, nimi);
    },

    postPalvelu: ({alue_id, nimi, tyyppi, kuvaus, hinta, alv}) =>{
        let sql = "insert into palvelu (alue_id, nimi, tyyppi, kuvaus, hinta, alv) values (?, ?, ?, ?, ?, ?);";
        console.log("sql " + sql);
        return executeSQL(sql, [alue_id, nimi, tyyppi, kuvaus, hinta, alv]);
    },
    deletePalvelu: (palveluid)  => {
        let sql = "delete from palvelu where palvelu_id=?";
        console.log("sql " + sql);
        return executeSQL(sql, palveluid);
    },
    updatePalvelu: ({alue_id, nimi, tyyppi, kuvaus, hinta, alv, palveluid}) => {
        let sql = "update palvelu set alue_id = ?, nimi = ?, tyyppi = ?, kuvaus = ?, hinta = ?, alv = ? where palvelu_id = ?";
        console.log("sql " + sql);
        return executeSQL(sql, [alue_id, nimi, tyyppi, kuvaus, hinta, alv, palveluid]);
    },
}