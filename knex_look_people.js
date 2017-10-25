const settings = require("./settings"); // settings.json
const user_input = process.argv[2];

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


knex.insert({first_name: process.argv[2], last_name: process.argv[2], birthdate: '1969-04-06'}).into('famous_people').then(function(err, result) {
  // if (err) {
  //   throw err;
  // }
  knex.select('*').from('famous_people').where('first_name', user_input).orWhere('last_name', user_input).asCallback((error, result) => {
    // if (error) {
    //   throw error;
    // }
    console.log("Searching ...");
    console.log(`Found ${result.length} person(s) by the name ${user_input}:`);
    for (let currentPerson in result) {
      console.log(`- ${result[currentPerson].id}: ${result[currentPerson].first_name} ${result[currentPerson].last_name}, born ${result[currentPerson].birthdate}`);
    }
process.exit();
  });
});
