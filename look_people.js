const pg = require("pg");
const settings = require("./settings"); // settings.json
const user_input = process.argv[2];
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE last_name = '${user_input}' OR first_name = '${user_input}';`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log("Searching ...");
    console.log(`Found ${result.rows.length} person(s) by the name ${user_input}:`);
    for (let currentPerson in result.rows) {
      console.log(`- ${result.rows[currentPerson].id}: ${result.rows[currentPerson].first_name} ${result.rows[currentPerson].last_name}, born ${result.rows[currentPerson].birthdate}`);
    }
    client.end();
  });
});