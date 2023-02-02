import fs from 'fs';
import { parse } from 'csv-parse';
import { Ticket } from './ticketModel';
import { getProcessedTickets } from './processTickets';
import { generateTickets } from './generateTicket';

export const parsedTickets: Ticket[] = [];
const sampleFilePath: string = './Sample_ticket.csv';
const successRecords: string = 'Success_Records.csv';
const failedRecords: string = 'Failed_Records.csv';

// Read from the sample CSV file
export const readInputData = (filePath: string) => {
    return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return reject("Error in reading file");
        }
        parse(fileData, { delimiter: ",", from_line: 2 }, (err, rows: string[]) => {
            if (err || rows.length === 0) {
                return reject("Error in parsing CSV");
            }
            rows.forEach(row => {
                parsedTickets.push(new Ticket(row[0], row[1], row[2], row[3], row[4], Number(row[5]), row[6], row[7], Number(row[8]), row[9]));
            });
            return resolve("Parsing complete");
        });
    });
    });
}

readInputData(sampleFilePath).then((res) => {
    // Start processing the parsed input
    const {validTickets, invalidTickets } = getProcessedTickets(parsedTickets);
    // Generate the output files
    if (validTickets && validTickets.length) {
        generateTickets(validTickets, fs.createWriteStream(successRecords));
    }
    if (invalidTickets && invalidTickets.length) {
        generateTickets(invalidTickets, fs.createWriteStream(failedRecords));
    }
}).catch(err => {
    console.log(err);
});
