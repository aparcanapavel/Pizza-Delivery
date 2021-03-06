const DeliveryAid = require('./DeliveryAid');

class Dispatcher {
  constructor(dispatchString) {
    this.dispatchString = dispatchString;
    this.totalDeliveries;
  }

  getDispatch(){ return this.dispatchString; }

  /**
   * dispatch();
   * determines what part to execute.
   * @param switchKey
   */
  dispatch(switchKey){
    const switchInt = parseInt(switchKey);

    if(switchInt === 1){
      this.dispatchDayOne(this.dispatchString);
      return true;
    } else if(switchInt === 2){
      this.dispatchDayTwo(this.dispatchString);
      return true;
    }

    return false;
  }

  /**
   * dispatchDayOne();
   * sends the driver all the dispatchs at ones
   * @param {string} dispatchStr
   */
  dispatchDayOne(dispatchStr){
    if(typeof dispatchStr !== "string") return false;
    
    const driver = new DeliveryAid();

    if(driver){
      driver.dispatch(dispatchStr);
      this.totalDeliveries = driver.getPizzasDelivered();// need test
    }
    
    return true;
  }

  dispatchDayTwo(dispatchStr){
    if(typeof dispatchStr !== "string") return false;

    const driver = new DeliveryAid();
    const goat = new DeliveryAid();

    if(driver && goat){
      this.dispatchDrivers(driver, goat, dispatchStr);
    }

    return true;
  }

  dispatchDrivers(driver, goat, string){
    if(!driver || !goat || !string) return;

    let idx = 0;
    for(const direction of string.split('')){
      if(idx%2){
        // odd 1,3,5...
        driver.move(direction);
      } else {
        // even 0,2,4...
        goat.move(direction);
      }
      
      idx += 1;
    }

    const driverDeliveries = driver.getHousesDelivered();
    const goatDeliveries = goat.getHousesDelivered();

    const totalDeliveries = Object.assign(driverDeliveries, goatDeliveries);

    this.totalDeliveries = Object.keys(totalDeliveries).length;
  }

  printTotals(){
    console.log('total houses delivered to: ', this.totalDeliveries);
  }

}

module.exports = Dispatcher;