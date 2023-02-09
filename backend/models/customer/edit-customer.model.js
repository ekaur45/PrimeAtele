class EditCustomerModel{
    constructor(obj={}){
        this.id = obj.id??0;
        this.name = obj.name??"";
        this.email = obj.email??"";
        this.phone = obj.phone??"";
        this.note = obj.note??"";
        this.todaysPickup = obj.todaysPickup??"";
        this.meals = obj.meals??"";
        this.userId = 0;
        this.validate = function(){
            return this.name && this.email && this.phone && this.note && this.todaysPickup && this.meals;
        }
        this.params =[this.name,this.email,this.phone,this.note,this.todaysPickup,this.meals,this.id];

    }
}
module.exports = {EditCustomerModel};