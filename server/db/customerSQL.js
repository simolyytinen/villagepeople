var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'Customer'
});

const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results);
        });
    })
}

const getTypes = (lyhenne, selite) => {
    
    return new Promise((resolve, reject) => {
        let query = "SELECT AVAIN, LYHENNE, SELITE from asiakastyyppi WHERE 1=1";

        let params = [];
        if ( lyhenne != null ){
            query += " AND LYHENNE = ? "
            params.push(lyhenne);
        }

        console.log("query:" + query);
        connection.query(query, params, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                console.log("result", result);
                resolve(result);
            }
        });
    })

}

module.exports = {

    getCustomerTypes: () => {
        let sql = "SELECT * FROM ASIAKASTYYPPI "
        return executeSQL(sql, []);
    },
    getCustomerTypesByLyhenne: (lyhenne) => {
        return getTypes(lyhenne, null);
    },

    getCustomers: (nimi, osoite) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT * from asiakas ";

            connection.query(query, function (error, result, fields) {

                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        })
    }

}