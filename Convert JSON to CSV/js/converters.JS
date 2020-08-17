// MAIN FUNCTION
function convertFileContent(fileContent, fileType) {
    if (fileType === JSON_TYPE) return convertToCsv(fileContent);
    else if (fileType === CSV_TYPE) return convertToJson(fileContent);
  }
  
  function convertToCsv(fileContent) {
    const jsonParse = typeof fileContent != 'object' ? JSON.parse(fileContent) : fileContent;
    var array = Array.isArray(jsonParse) ? jsonParse : [jsonParse];
    

    var head = array[0];
    var str = '';
    var line = '';
      
  
    for (var index in array[0]) {
      line += index + ',';
    }
  
    line = line.slice(0, -1);
    str += line + '\r\n';
  
    for (var i = 0; i < array.length; i++) {
        var line = '';
  
        for (var index in array[i]) {
          line += array[i][index] + ',';
        }
  
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    
    console.log(str);
      
    return str;
  }
  
  function convertToJson(fileContent) {
    var array = CSVToArray(fileContent);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }
  
    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");
  
    return str;
  }
  
  function CSVToArray(strData, strDelimiter) {
    // CHECK DELIMITER
    strDelimiter = (strDelimiter || ",");
    // CREATE A REGULA EXPRESSION CSV FOR DELIMITAR
    var objPattern = new RegExp((
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            var strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
   
    return (arrData);
  }
  
  