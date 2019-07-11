var ${field}Store = new Ext.data.ArrayStore({
autoLoad : true,
fields : ['value', 'text'],
data : [
#set($size = $codeList.size())
#foreach($code in $codeList)
    ['${code.codedic}', '#if(${showCode}=="true")${code.codedic} #end${code.codedesc}']
    #if($velocityCount != $size),
    #end
#end
]
});