export class Ticket {
    private FirstName: string;
    
    private LastName: string;

    private PNR: string;

    private FareClass: string;
   
    private TravelDate: string;
    
    private Pax: number;
   
    private TicketingDate: string;
    
    private Email: string;
    
    private MobilePhone: number;
   
    private BookedCabin: string;
    

    public constructor(firstName: string, lastName: string, pnr: string, fareClass: string, travelDate: string,
        pax: number, ticketingDate: string, email: string, mobilePhone: number, bookedCabin: string) {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.PNR = pnr;
            this.FareClass = fareClass;
            this.TravelDate = travelDate;
            this.Pax = pax;
            this.TicketingDate = ticketingDate;
            this.Email = email;
            this.MobilePhone = mobilePhone;
            this.BookedCabin = bookedCabin;
    }

    public get firstName(): string {
        return this.FirstName;
    }
    public set firstName(value: string) {
        this.FirstName = value;
    }

    public get lastName(): string {
        return this.LastName;
    }
    public set lastName(value: string) {
        this.LastName = value;
    }
    public get pnr(): string {
        return this.PNR;
    }
    public set pnr(value: string) {
        this.PNR = value;
    }
    public get fareClass(): string {
        return this.FareClass;
    }
    public set fareClass(value: string) {
        this.FareClass = value;
    }
    public get travelDate(): string {
        return this.TravelDate;
    }
    public get travelDateTimeStamp(): Date {
        return new Date(this.TravelDate);
    }
    public set travelDate(value: string) {
        this.TravelDate = value;
    }
    public get pax(): number {
        return this.Pax;
    }
    public set pax(value: number) {
        this.Pax = value;
    }
    public get ticketingDate(): string {
        return this.TicketingDate;
    }
    public get ticketDateTimeStamp(): Date {
        return new Date(this.TicketingDate);
    }
    public set ticketingDate(value: string) {
        this.TicketingDate = value;
    }
    public get email(): string {
        return this.Email;
    }
    public set email(value: string) {
        this.Email = value;
    }
    public get mobilePhone(): number {
        return this.MobilePhone;
    }
    public set mobilePhone(value: number) {
        this.MobilePhone = value;
    }
    public get bookedCabin(): string {
        return this.BookedCabin;
    }
    public set bookedCabin(value: string) {
        this.BookedCabin = value;
    }

}

export enum discounts {

}

export class ValidTicket extends Ticket{
    private Discount: string;

    public constructor (ticket: Ticket, discount: string) {
        super(ticket.firstName, ticket.lastName, ticket.pnr, ticket.fareClass, ticket.travelDate, ticket.pax, ticket.ticketingDate, ticket.email, ticket.mobilePhone, ticket.bookedCabin);
        this.Discount = discount;
    }
    public get discount(): string {
        return this.Discount;
    }
    public set discount(value: string) {
        this.Discount = value;
    }
}

export class InvalidTicket extends Ticket{
    private Error: string;
   
    public constructor (ticket: Ticket, error: string) {
        super(ticket.firstName, ticket.lastName, ticket.pnr, ticket.fareClass, ticket.travelDate, ticket.pax, ticket.ticketingDate, ticket.email, ticket.mobilePhone, ticket.bookedCabin);
        this.Error = error;
    }
    public get error(): string {
        return this.Error;
    }
    public set error(value: string) {
        this.Error = value;
    }
}