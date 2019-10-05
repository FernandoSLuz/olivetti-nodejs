let mysql = require('mysql');
let connInstance = null

// Perform Cache MySql Instance
const getDb = () => {

    if(connInstance == null){
    
        let connection = mysql.createConnection({
            host     : '34.67.13.124',
            user     : 'root',
            password : 'nNmLMtT1yMHQ',
            database : 'hacka-olivetti'
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

