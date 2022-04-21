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
        let sql = "SELECT * FROM lasku WHERE lasku_id LIKE ?";
        return executeSQL(sql, [lasku_id]);
    },

    getLaskut: () => {
        let sql = "SELECT * FROM lasku";
        
        console.log(sql);
        return executeSQL(sql, []);
    },

    postLasku: (varaus_id, summa, alv) => {
        let sql = "INSERT INTO lasku (varaus_id, summa, alv) VALUES (?, ?, ?)";
        return executeSQL(sql, [varaus_id, summa, alv])
    },

    deleteLasku: (lasku_id) => {
        let sql = "DELETE FROM lasku WHERE lasku_id = ?";
        return executeSQL(sql, [lasku_id])
    },

    updateLasku: (varaus_id, summa, alv, lasku_id) => {
        let sql = "UPDATE lasku SET varaus_id = ?, summa = ?, alv = ? WHERE lasku_id = ?";
        return executeSQL(sql, [varaus_id, summa, alv, lasku_id])
    },

}