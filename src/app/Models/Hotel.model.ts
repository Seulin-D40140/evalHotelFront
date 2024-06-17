import { City } from "./City.model";

export class Hotel {
    id : number ;
    name : string;
    description : string;
    address : string;
    price : number;
    nbPlace : number;
    imgName : string;
    city : City;

    constructor(id :number , name : string , description : string , address : string ,
                price : number , nbPlace : number , imgName : string , city : City)
                {
                    this.id = id;
                    this.name = name;
                    this.description = description;
                    this.address = address;
                    this.price = price;
                    this.nbPlace = nbPlace;
                    this.imgName = imgName;
                    this.city = city;
                }
}