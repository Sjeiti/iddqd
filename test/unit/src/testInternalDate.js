/*global QUnit,test,ok*/
import * as date from './../../../src/internal/date';

QUnit.module('date',{setup:function(){
	this.date1 = new Date(2014,8-1,19,21,11,23);
	this.date2 = new Date(2014,8-1,19,11,59,59);
	this.date3 = new Date(2014,8-1,19,12,1,1);
}});
test('toFormatted', function() {
	var toFormatted = date.toFormatted;

	ok(toFormatted(this.date1)==='2014-08-19','toFormatted default');
	ok(toFormatted(this.date1,'d/m/Y')==='19/08/2014','toFormatted d/m/Y');
	ok(toFormatted(this.date1,'Y-m-d H:i:s')==='2014-08-19 21:11:23','toFormatted Y-m-d H:i:s');
	ok(toFormatted(this.date1,'ga')==='9pm','toFormatted ga:pm');
	ok(toFormatted(this.date3,'ga')==='12pm','toFormatted ga:pm');
	ok(toFormatted(this.date2,'ga')==='11am','toFormatted ga:am');
	ok(toFormatted().match(/^\d{4}-\d{2}-\d{2}$/),'toFormatted no param');
	//date.format = 'd/m/Y';//
	//ok(toFormatted(this.date1)==='19/08/2014','toFormatted set default');
});