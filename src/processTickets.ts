import { InvalidTicket, Ticket, ValidTicket } from "./ticketModel";

const mobilePhoneRegex = /^(\d{3})[-]?(\d{3})[-]?(\d{4})$/;
enum bookedCabin {
    Economy = 'Economy',
    Premium_Economy = 'Premium Economy',
    Business = 'Business',
    First = 'First'
};

export const getProcessedTickets = (parsedTickets: Ticket[]) => {
    const validTickets: ValidTicket[] = [];
    const invalidTickets: InvalidTicket[] = [];
    let errors: String[] = [];
    for(const ticket of parsedTickets) {
        errors = [];
        if (!ticket.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.push('Email is invalid');
        }
        if (!mobilePhoneRegex.test(ticket.mobilePhone.toString())) {
            errors.push('Mobile Number is invalid');
        }
        if (ticket.ticketDateTimeStamp > ticket.travelDateTimeStamp) {
            errors.push('Travel date should be after ticketing date');
        }
        if (ticket.pnr.length !== 6 || !ticket.pnr.match(/^[0-9a-zA-Z]{6}$/)) {
            errors.push('PNR is invalid');
        }
        if (!Object.values(bookedCabin).includes(ticket.bookedCabin as unknown as bookedCabin)) {
            errors.push('Booked Cabin is invalid');
        }
        if (!ticket.fareClass.match(/^[A-Z]{1}$/)) {
            errors.push('Fare Class is invalid');
        }
        if (ticket.pax <= 0) {
            errors.push('PAX is invalid');
        }

        //Check if errors array has any value.
        if(errors.length) {
            invalidTickets.push(new InvalidTicket(ticket, errors.toString()));
        } else {
            validTickets.push(new ValidTicket(ticket, findDiscount(ticket)));
        }
    }
    return {validTickets, invalidTickets};
}

const findDiscount = (ticket: Ticket ) : string => {
    if (ticket.fareClass.match(/^[A-E]{1}$/)) {
        return 'OFFER_20';
    } else if (ticket.fareClass.match(/^[F-K]{1}$/)) {
        return 'OFFER_30';
    } else if (ticket.fareClass.match(/^[L-R]{1}$/)) {
        return 'OFFER_25'
    } else {
        return '';
    }
}