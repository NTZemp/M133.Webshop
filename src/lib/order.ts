export default class Order {
    firstname:string;
    lastname:string;
    email:string;

    constructor() {
        this.firstname = "";
        this.lastname= "";
        this.email = "";
    }

     isValid():boolean{
        if(this.email === null || this.firstname === null || this.lastname === null ){
            return false;
        }

        var emailMatch  = (this.email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$") != null)
        var firstnameMatch= (this.firstname!= null && this.firstname != "");
        var lastnameMatch = (this.lastname != null && this.lastname != "");
        return (emailMatch && firstnameMatch && lastnameMatch);
    }
}