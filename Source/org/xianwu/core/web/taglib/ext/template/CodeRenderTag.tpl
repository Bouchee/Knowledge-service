function ${field}Render(value) {
#foreach($code in $codeList)
    if (value == '${code.codedic}') return '${code.codedesc}';
#end 
else return value;
}
