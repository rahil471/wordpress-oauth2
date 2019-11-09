const axios = require('axios');
const config = require('./config');

const getStats =  function(statType, callback){
    axios.get(`https://public-api.wordpress.com/rest/v1.1/sites/${config.SiteId}/stats?http_envelope=1`,
                {headers: {'Authorization': `Bearer ${TOKEN}`}},
            )
    .then((response)=>{
        //console.log(response);
        callback(null, response.data);
    });
};

module.exports.getStats = getStats;