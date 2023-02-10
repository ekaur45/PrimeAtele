class CustomerModel{
    constructor(obj={}){
        this.name = obj.name??"";
        this.email = obj.email??"";
        this.phone = obj.phone??"";
        this.note = obj.note??"";
        this.todaysPickup = obj.todaysPickup??"";
        this.meals = obj.meals??"";
        this.userId = obj.id??0;
        this.validate = function(){
            return this.name && this.email && this.phone && this.note && this.todaysPickup && this.meals && this.userId;
        }
        this.params =[this.name,this.email,this.phone,this.note,this.todaysPickup,this.meals,this.userId];

    }
}
module.exports = {CustomerModel};