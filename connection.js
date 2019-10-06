let mysql = require('mysql');
let connInstance = null

// Perform Cache MySql Instance
const getDb = () => {

    if(connInstance == null){

        const {HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env

        // console.log(HOST, DB_USER, DB_PASSWORD, DB_NAME)
    
        let connection = mysql.createConnection({
            host     : HOST,
            user     : DB_USER,
            password : DB_PASSWORD,
            database : DB_NAME
        });
        
        connection.connect(() => {
    
            connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0].solution);
    
                connInstance = connection
                return connInstance
            });
    
        });
        
    }
    else{
        console.log('MySql instance cache')
        return connInstance
    }
}


module.exports = {
    getDb
}

