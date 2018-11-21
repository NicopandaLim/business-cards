export class BusinessCard {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    extraText: string;
    imageUri: string;

   /*  constructor(firstName: string,
                lastName: string,
                email: string,
                phoneNumber: string,
                extraText: string,
                imageUri: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.extraText = extraText;
        this.imageUri = imageUri;            

    } */
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phoneNumber = "";
        this.extraText = "";
        this.imageUri = "";            

    }

}