
# Flight Ticket Upgrader

A major airline wants to send an email, offering a discount on upgrade to a higher class, to all
the passengers who have booked tickets on its flights. For this, the data will be received in a file
at a particular time.

The program needs to read this data, perform some validations and then write it to a different
file. The records that fail the validation, need to be put into a different file so that someone can
look at them and fix the problem. Each failing record should have an additional field that will
contain the reason(s) for the validation failure.

Input data will contain the following fields:
* First name
* Last name
* PNR
* Fare class (Single character A - Z only)
* Travel date
* Pax (no of passengers)
* Ticketing date (the date of booking)
* Email
* Mobile phone
* Booked cabin (Economy, Premium Economy, Business, First)

Validations:
* Email ID is valid
* The mobile phone is valid
* Ticketing date is before travel date
* PNR is 6 characters and Is alphanumeric
* The booked cabin is valid (one of Economy, Premium Economy, Business, First)

Apart from the validation, we need to add a new column called discount code to the processed
records file whose value will be calculated based on the fare class field in the input record. Fare
class A - E will have discount code OFFER_20, F - K will have discount code OFFER_30, L - R
will have OFFER_25; rest will have no offer code

The input is provided as a CSV file name `Sample_ticket.csv`. The processed records that pass the validations would be present in `Success_Records.csv` and the records that fail the validation would be present in `Failed_Records.csv`.

The project is implemented using `Node/Typescript` and used a library called `node-csv` for csv parsing. 

In order to run the project

    1. Clone the repo to local machine
    2. Run npm install
    3. Run npm run start - This should create two new files.
    4. To run unit test, run npm run test
 
