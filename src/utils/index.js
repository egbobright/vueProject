const CAPITALIZE_STR = (str) => { // CAPITALIZE STRING 
    let res = '';
    (str == null || str == undefined || str == '') ? res = '' : res = str[0].toUpperCase() + str.substring(1); 
    return res; 
} 

const CHECK_VOWEL = (str) => { // CHECK VOWEL STATUS OF A WORD 
    let res = ['a','e','i','o','u'].indexOf(str[0].toLowerCase()) !== -1;
        return res ? `an ${str}` : `a ${str}` ;
}  

const GENERATE_RAND_STRING = (length) => { // GENERATE RANDOM STRING
    
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let characterLength = characters.length;

    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characterLength))+Date.now().toString(36);
    }

    return result
}
 
const CHECK_PLURAL = (num) => {  // CHECK PLURAL STATUS OF AN ARRAY 
    return num > 1 ? 's' : '';
} 
 
const THOUSAND_SEPARATOR = (num) => { // CALIBRATE INTEGERS INTO THOUSANDS, TENS OF THOUSANDS OR HUNDREDS OF THOUSANDS
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

const CALCU_PERCENTAGE = (percent, price) => { // CALCULATE PERCENTAGE
    let res = Number(percent) / 100 * Number(price);
    return `₦` + THOUSAND_SEPARATOR(res);
}

const GET_INITIAL = (str) => { // GET TWO FIRST CHARACTERS OF A WORD
    if(str !== null){ 
        if (str.length > 1) {
            return str.slice(0, 2) + "";
        } else {
            return str;
        }
    }
} 

const TRUNCATE_STRING = (str, num) => { // TRUNCATE A STRING TO A DESIRED NUMBER WITH A TRAILING "...""
    if(str !== null){ 
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }
}

const TRUNCATE_BEFORE_CHARC = (str, char) => { // TRUNCATE A STRING BEFORE A PARTICULAR CHARACTER
    return str.substr(str.lastIndexOf(char) + 1);
}
 
const PUNCTUATE = (total, num) => {
    if (total == num) {
        return ".";
    } else {
        return ", ";
    }
}  
  
const STRIP_STRING = (str) => { // STRIP A STRING
    return str.replace(/(<([^>]+)>)/gi, "");
}

const REMOVE_CHARC = (str, charc) => { // REMOVE A PARTICULAR CHARACTER FROM A STRING 
    return str.replace(charc, "");
}

const IS_EMPTY = (payload) => { // CHECK IF A VARIABLE / CONSTANT IF EMPTY
    return (payload === [] || payload === null || payload === '' || payload === undefined)  ? true : false; 
}
 
const READABLE_DATE = (d) => { // CONVERT A TIMESTAMP TO A HUMAN REDABLE DATE
    const dd = new Date(`${d}`) 
    return dd.toDateString();
} 
  
 const RANDOM_STRING = (len) => { // GENERATE A RANDOM STRING  
     let text = '';
     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
     for( let i=0; i < len; i++ )
       text += possible.charAt(Math.floor(Math.random() * possible.length));
     return text;
 }
 
const EVEN_NUMBER = (num) => { // CHECK IF NUMBER IS EVEN OR ODD
    return ( num % 2 == 0 ) ? true : false; 
}
 
const CHECK_EMAIL_PATTERN = (email) => {  // CONFIRM IF STRING IS AN EMAIL
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
const CHECK_IF_EMPTY = (v) => { // CHECK IF DATA IS EMPTY 
          let type = typeof v;
          if (type === 'undefined') {
              return true;
          }
          if (type === 'boolean') {
              return !v;
          }
          if (v === null) {
              return true;
          }
          if (v === undefined) {
              return true;
          }
          if (v instanceof Array) {
              if (v.length < 1) {
                  return true;
              }
          } else if (type === 'string') {
              if (v.length < 1) {
                  return true;
              }
              if (v === '0') {
                  return true;
              }
          } else if (type === 'object') {
              if (Object.keys(v).length < 1) {
                  return true;
              }
          } else if (type === 'number') {
              if (v === 0) {
                  return true;
              }
          }
          return false;
}



const SEARCH_ARR = (arr, str) => { // SERACH THROUGH AN ARRAY TO FILER BY A SPECIFIED LETTER
    let chkStatus;
    let newArr = [];
    for (let element of arr) { 
        let x = element.username.toUpperCase()
        chkStatus = x.includes(str);
        if(chkStatus){
            newArr.push(element)
        } 

    } 

    return newArr;
}





module.exports = { 
	CAPITALIZE_STR, CHECK_VOWEL, GENERATE_RAND_STRING, CHECK_PLURAL, THOUSAND_SEPARATOR,
	CALCU_PERCENTAGE, GET_INITIAL, TRUNCATE_STRING, TRUNCATE_BEFORE_CHARC, PUNCTUATE,STRIP_STRING, REMOVE_CHARC, IS_EMPTY,
	READABLE_DATE, RANDOM_STRING, EVEN_NUMBER, CHECK_EMAIL_PATTERN, CHECK_IF_EMPTY, SEARCH_ARR
}