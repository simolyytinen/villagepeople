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
        let sql = "select * from palvelu where 1=1";
        if(nimi){
            //ei toimi oikein
            sql = sql + " and nimi like '?%'";
        }
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
}