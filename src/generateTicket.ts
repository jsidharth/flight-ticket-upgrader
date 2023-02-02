import fs from 'fs';
import { InvalidTicket, ValidTicket } from "./ticketModel";
import { stringify, Stringifier } from 'csv-stringify';

export const generateTickets = async (tickets: ValidTicket[]| InvalidTicket[], writableStream: fs.WriteStream ) => {
    let stringifier: Stringifier = stringify({header: true, columns: Object.keys(tickets[0])});
    for(const ticket of tickets) {
        stringifier.write(ticket);
    } 
    await stringifier.pipe(writableStream);
}