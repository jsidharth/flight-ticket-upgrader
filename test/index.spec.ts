import fs from 'fs';
import {assert} from 'chai';
import {readInputData, parsedTickets} from '../src/index';
import { getProcessedTickets } from '../src/processTickets';
import { Ticket } from '../src/ticketModel';

const validFilePath: string = './Sample_ticket.csv';
const invalidFilePath: string = './Sampl_ticket.csv';

describe('Reading input file',  () => {
    it('Invalid File Path', async () => {
        await readInputData(invalidFilePath).catch((err: string) => {
            assert.equal('Error in reading file', err);
        })
    });
    it('Valid file read', async () => {
        await readInputData(validFilePath).then((res: string) => {
            assert.equal('Parsing complete', res);
            assert.isNotEmpty(parsedTickets);
        });
    });
});

describe('Processing the parsed input file',  () => {
    const parsedTicket: Ticket[] = [];
    let mockTicket = new Ticket('ABC', 'XYZ', 'AB1', '1', '2019-08-04', -1, '2019-08-14', 'xyz@cc', 232323, 'Normal');
    before(() => {
        parsedTicket.push(mockTicket);
    });

    it('Email is invalid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(invalidTickets);
        assert.isTrue(invalidTickets[0].error.includes('Email is invalid'));
        mockTicket.email = 'xyz@ccc.com';
        
    });

    it('Mobile is invalid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(invalidTickets);
        assert.isTrue(invalidTickets[0].error.includes('Mobile Number is invalid'));
        mockTicket.mobilePhone = 9876543210;
    });

    it('Travel date is invalid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(invalidTickets);
        assert.isTrue(invalidTickets[0].error.includes('Travel date should be after ticketing date'));
        mockTicket.ticketingDate = '2019-08-02';
    });

    it('PNR is invalid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(invalidTickets);
        assert.isTrue(invalidTickets[0].error.includes('PNR is invalid'));
        mockTicket.pnr = 'ABC123';
    });

    it('Booking Cabin is invalid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(invalidTickets);
        assert.isTrue(invalidTickets[0].error.includes('Booked Cabin is invalid'));
        mockTicket.bookedCabin = 'Business';
    });

    it('Fare Class is invalid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(invalidTickets);
        assert.isTrue(invalidTickets[0].error.includes('Fare Class is invalid'));
        mockTicket.fareClass = 'F';
    });

    it('PAX is invalid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(invalidTickets);
        assert.isTrue(invalidTickets[0].error.includes('PAX is invalid'));
        mockTicket.pax = 4;
    });

    it('Ticket is valid', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(validTickets);
        assert.equal(validTickets[0].discount, 'OFFER_30');
        assert.isEmpty(invalidTickets);
    });

    it('Invalid Discount', async () => {
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(validTickets);
        assert.notEqual(validTickets[0].discount, 'OFFER_20');
    });
    
    it('Valid Discount for A-E fare class', async () => {
        mockTicket.fareClass = 'C';
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(validTickets);
        assert.equal(validTickets[0].discount, 'OFFER_20');
    });

    it('Valid Discount for F-K fare class', async () => {
        mockTicket.fareClass = 'G';
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(validTickets);
        assert.equal(validTickets[0].discount, 'OFFER_30');
    });

    it('Valid Discount for L-R fare class', async () => {
        mockTicket.fareClass = 'N';
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(validTickets);
        assert.equal(validTickets[0].discount, 'OFFER_25');
    });

    it('Valid Discount for S-Z fare class', async () => {
        mockTicket.fareClass = 'S';
        const {validTickets, invalidTickets} = getProcessedTickets(parsedTicket);
        assert.isNotEmpty(validTickets);
        assert.equal(validTickets[0].discount, '');
    });
});

describe('Generating new files', () => {
    beforeEach(() => {
        readInputData('./../Sample_ticket.csv');
    });

    it('Success records generated', () => {
        assert.isOk(fs.existsSync('./Success_Records.csv'));
    });

    it('Failed records generated', () => {
        assert.isOk(fs.existsSync('./Failed_Records.csv'));
    });

    it('Only 2 files are created', () => {
        assert.equal(['./Success_Records.csv','./Failed_Records.csv' ].map(path => fs.existsSync(path)).length, 2);
    });
})