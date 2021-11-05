/** 
 * SETUP
 * Our usual client setup code
 * Connect to example.edu website's HTTP server using our TCP library
 * HTTP servers typically run on port 80
 */
const url = process.argv[2];
const file = process.argv[3];

//helper
const cleanUrl = (url) => {
  const urlSplit = url.split('//');
  let result = urlSplit[0];
  if (urlSplit.length > 1) {
    result = urlSplit[1];
  }
  if (result.slice(result.length - 1) === '/') {
    result = result.substring(0, result.length - 1);
  }
  if (result.slice(0, 4) === 'www.') {
    result = result.slice(4);
  }
  return result;
};
const cleanedUrl = cleanUrl(url);

const net = require('net');
const conn = net.createConnection({
  host: cleanedUrl,
  port: 80
});
conn.setEncoding('UTF8');

conn.on('connect', () => {
  console.log(`Connected to server!`);

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: ${cleanedUrl}\r\n`);
  conn.write(`\r\n`);
});

/** 
 * HTTP Response
 * After request is made, the HTTP server should send us HTTP data via our TCP connection
 * Print the data to the screen, and end the connection
 */
conn.on('data', (data) => {
  writeFile(data);
  const size = countLtter(data);
  console.log(`Downloaded and saved ${size} to file`);
  conn.end();


});

const fs = require('fs')
const writeFile = (data) => {
  fs.writeFile(file, data, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
};

const countLtter = (data) => {
  return data.length;
};


