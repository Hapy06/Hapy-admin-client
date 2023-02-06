import { getProcessStored } from '../../../globals/GlobalVariables';
import { get } from './_http';
import { _ORDER_URL } from './_urls';

const getOrders = () =>
{
  try
  {
    return new Promise( async ( resolve, reject ) =>
    {
      await get(`${_ORDER_URL}?page=0&size=100&sort=asc`)
        .then( async ( response ) =>resolve( response.data ))
        .catch( err => reject( err ) );
    } );

  }
  catch ( err ) { return Promise.reject(err); }
}

const getCoupons = () => {
  try
  {
    return new Promise( async ( resolve, reject ) =>
    {
      let list = [];
      let ticketNumber = 0;
      const preparationProcess = getProcessStored('preparationProcess');
      console.log(preparationProcess);
      preparationProcess.orders.forEach((order:any)=>{
        let containCuisine = false;
        order.coupons.forEach( (coupon:any) =>{
          if(coupon.cookingStation.includes('Cuisine')){ list.push(coupon); containCuisine = true; }
        });
        if(containCuisine){ ticketNumber += 1; }
      });
      resolve( {coupons: list, ticketNumber} );
    } );
  }
  catch ( err ) { return Promise.reject(err); }
}

const getOrdersLocal = () => {
  try
  {
    return new Promise( async ( resolve, reject ) =>
    {
      let list = [];
      let ticketNumber = 0;
      const preparationProcess = getProcessStored('preparationProcess');
      preparationProcess.orders.forEach((order: any) => {
        let containCuisine = false;
        order.coupons.forEach( (coupon: any) => {
          if(coupon.cookingStation.includes('Cuisine')){ containCuisine = true; }
        });
        if(containCuisine){ list.push(order); }
      });
      resolve( {orders: list } );
    } );
  }
  catch ( err ) { return Promise.reject(err); }
}

export {
    getOrders,
    getCoupons,
    getOrdersLocal
}