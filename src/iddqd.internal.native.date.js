// todo: document
/**
 * @namespace iddqd.internal.native.date
 */
iddqd.ns('iddqd.internal.native.date',(function(rv){
	'use strict';
	var oDateProto = Date.prototype
		,fnOldToString = oDateProto.toString
		,aDay = ['Sunday','Monday','Thuesday','Wednesday','Thursday','Friday','Saturday']
		,aDayAbbr = ['Sun','Mon','Thu','Wed','Thu','Fri','Sat']
		,aMonth = ['January','February','March','April','May','June','July','August','September','October','November','December']
		,aMonthAbbr = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']
		,aDayMonthSuffix = ['st','nd','rd','th']
		,oExtendDate = {
			format: 'Y-m-d' // ISO 8601
			,overrideToString: overrideToString
			,toYYMMDD: toYYMMDD
		}
		,oExtendProto = {
			toFormatted: toFormatted
		}
		,iSecond = 1000
		,iMinute = iSecond*60
		,iHour = iMinute*60
		,iDay = iHour*24
	;
	function toYYMMDD(date,reverse){//this?
		var aDate = date.split('-');
		if (aDate.length===(reverse?2:4)) {
			aDate.reverse();
		}
		return aDate.join('-');
	}
//	function getDate(YYMMDDorDDMMYY){ // todo: implement (is in fcvr)
//		var a = YYMMDDorDDMMYY.split('-');
//		if (a[0].length===2) a.reverse();
//		return new Date(a.join('/')); // expect yyyy/MM/dd
//	}
	function overrideToString(toFormat){
		if (toFormat===true||toFormat===undefined) {
			oDateProto.toString = toFormatted;
		} else if (toFormat===false) {
			oDateProto.toString = fnOldToString;
		}
	}
	function toFormatted(format){
		// getDate				Returns the day of the month (1-31) for the specified date according to local time.
		// getDay				Returns the day of the week (0-6) for the specified date according to local time.
		// getFullYear			Returns the year (4 digits for 4-digit years) of the specified date according to local time.
		// getHours				Returns the hour (0-23) in the specified date according to local time.
		// getMilliseconds		Returns the milliseconds (0-999) in the specified date according to local time.
		// getMinutes			Returns the minutes (0-59) in the specified date according to local time.
		// getMonth				Returns the month (0-11) in the specified date according to local time.
		// getSeconds			Returns the seconds (0-59) in the specified date according to local time.
		// getTime				Returns the numeric value of the specified date as the number of milliseconds since January 1, 1970, 00:00:00 UTC (negative for prior times).
		// getTimezoneOffset	Returns the time-zone offset in minutes for the current locale.
		// getUTCDate			Returns the day (date) of the month (1-31) in the specified date according to universal time.
		// getUTCDay			Returns the day of the week (0-6) in the specified date according to universal time.
		// getUTCFullYear		Returns the year (4 digits for 4-digit years) in the specified date according to universal time.
		// getUTCHours			Returns the hours (0-23) in the specified date according to universal time.
		// getUTCMilliseconds	Returns the milliseconds (0-999) in the specified date according to universal time.
		// getUTCMinutes		Returns the minutes (0-59) in the specified date according to universal time.
		// getUTCMonth			Returns the month (0-11) in the specified date according to universal time.
		// getUTCSeconds		Returns the seconds (0-59) in the specified date according to universal time.

		// d	Day of the month, 2 digits with leading zeros	01 to 31
		// D	A textual representation of a day, three letters	Mon through Sun
		// j	Day of the month without leading zeros	1 to 31
		// l (lowercase 'L')	A full textual representation of the day of the week	Sunday through Saturday
		// N	ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)	1 (for Monday) through 7 (for Sunday)
		// S	English ordinal suffix for the day of the month, 2 characters	st, nd, rd or th. Works well with j
		// w	Numeric representation of the day of the week	0 (for Sunday) through 6 (for Saturday)
		// z	The day of the year (starting from 0)	0 through 365
		// Week	---	---
		// W	ISO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0)	Example: 42 (the 42nd week in the year)
		// Month	---	---
		// F	A full textual representation of a month, such as January or March	January through December
		// m	Numeric representation of a month, with leading zeros	01 through 12
		// M	A short textual representation of a month, three letters	Jan through Dec
		// n	Numeric representation of a month, without leading zeros	1 through 12
		// t	Number of days in the given month	28 through 31
		// Year	---	---
		// L	Whether it's a leap year	1 if it is a leap year, 0 otherwise.
		// o	ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)	Examples: 1999 or 2003
		// Y	A full numeric representation of a year, 4 digits	Examples: 1999 or 2003
		// y	A two digit representation of a year	Examples: 99 or 03
		// Time	---	---
		// a	Lowercase Ante meridiem and Post meridiem	am or pm
		// A	Uppercase Ante meridiem and Post meridiem	AM or PM
		// B	Swatch Internet time	000 through 999
		// g	12-hour format of an hour without leading zeros	1 through 12
		// G	24-hour format of an hour without leading zeros	0 through 23
		// h	12-hour format of an hour with leading zeros	01 through 12
		// H	24-hour format of an hour with leading zeros	00 through 23
		// i	Minutes with leading zeros	00 to 59
		// s	Seconds, with leading zeros	00 through 59
		// u	 Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds.	Example: 654321
		// Timezone	---	---
		// e	Timezone identifier (added in PHP 5.1.0)	Examples: UTC, GMT, Atlantic/Azores
		// I (capital i)	Whether or not the date is in daylight saving time	1 if Daylight Saving Time, 0 otherwise.
		// O	Difference to Greenwich time (GMT) in hours	Example: +0200
		// P	Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)	Example: +02:00
		// T	Timezone abbreviation	Examples: EST, MDT ...
		// Z	Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.	-43200 through 50400
		// Full Date/Time	---	---
		// c	ISO 8601 date (added in PHP 5)	2004-02-12T15:19:21+00:00
		// r	» RFC 2822 formatted date	Example: Thu, 21 Dec 2000 16:01:07 +0200
		// U	Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)	See also time()
		// Day	---	---
		if (format===undefined) format = Date.format;
		var sFormatted = '';
		for (var i=0,l=format.length;i<l;i++) {
			var s = format[i]
				,iYear = this.getFullYear()
				,iMonth = this.getMonth()
				,iDate = this.getDate()
				,iWeekDay = this.getDay()
				,iYearDay = Math.floor(new Date(this-new Date(iYear,0,0)).getTime()/iDay)
				,iHours = this.getHours()
				,iHoursMod = iHours%12
				,iHours12 = iHoursMod===0?12:iHoursMod
				,iMinutes = this.getMinutes()
				,iSeconds = this.getSeconds()
				,iWeek = Math.ceil((iYearDay-4)/7)//?
				,bLeapYear = (iYear%4===0&&iYear%100!==0)||(iYear%400===0)
				,pad = function pad(a,b){return(1e15+a+"").slice(-b);}
			;
			switch (s) {
				// day
				case 'd': sFormatted += pad(iDate,2); break;
				case 'D': sFormatted += aDayAbbr[iWeekDay]; break;
				case 'j': sFormatted += iDate; break;
				case 'l': sFormatted += aDay[iWeekDay]; break;
				case 'N': sFormatted += iWeekDay===0?7:iWeekDay; break;
				case 'S': sFormatted += iDate>aDayMonthSuffix.length?aDayMonthSuffix[aDayMonthSuffix.length-1]:aDayMonthSuffix[iDate-1]; break;
				case 'w': sFormatted += iWeekDay; break;
				case 'z': sFormatted += iYearDay; break;
				// week
				case 'W': sFormatted += iWeek===0?52:iWeek; break;
				// month
				case 'F': sFormatted += aMonth[iMonth]; break;
				case 'm': sFormatted += pad(iMonth+1,2); break;
				case 'M': sFormatted += aMonthAbbr[iMonth]; break;
				case 'n': sFormatted += iMonth+1; break;
				case 't': sFormatted += iMonth===1&&!bLeapYear?28:(iMonth>5?iMonth+1:iMonth)%2?29:30; break;
				// year
				case 'L': sFormatted += bLeapYear?1:0; break;
				case 'o': sFormatted += iWeek===0?iYear-1:iYear; break;//?
				case 'Y': sFormatted += iYear; break;
				case 'y': sFormatted += String(iYear).substr(2,2); break;
				// time
				case 'a': sFormatted += iHours>12?'am':'pm'; break;
				case 'A': sFormatted += iHours>12?'AM':'PM'; break;
				case 'B': sFormatted += ''; break;
				case 'g': sFormatted += iHours12; break;
				case 'G': sFormatted += iHours; break;
				case 'h': sFormatted += pad(iHours12,2); break;
				case 'H': sFormatted += pad(iHours,2); break;
				case 'i': sFormatted += pad(iMinutes,2); break;
				case 's': sFormatted += pad(iSeconds,2); break;
				case 'u': sFormatted += ''; break;
				// timezone



				default:
					sFormatted += s;
			}
		}
		return sFormatted;
	}
	return {
		init: function(){
			rv.date.init = rv.fn;
			rv.extend(Date,oExtendDate);
			rv.extend(oDateProto,oExtendProto);
		}
	};
})(iddqd));