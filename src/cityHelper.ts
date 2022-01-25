import React from 'react';

//  export class Provider {  
	  /** 
	   * Gets the weather for a given city 
	   */  
		  export function getWeather(city: string) {  
	    return Promise.resolve(`The weather of ${city} is Cloudy`)  
	  };  
	  /** 
	   * Gets the weather for a given city 
  	   */  
		 export function getLocalCurrency(city: string) {  
  	    return Promise.resolve(`The local currency of ${city} is GBP`)  
  	  };  
  	  /** 
  	   * Given Longtitude and latitude, this function returns a city 
  	   */  
			 export function findCity(long: number, lat: number) {  
  	    return Promise.resolve(`London`)  
  	  };  
  	/*};*/  
  