import moment from "moment";

class Order {
  constructor(id, items, totalSum, date) {
    this.id = id;
    this.items = items;
    this.totalSum = totalSum;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm").toString()
  }
}

export default Order;
