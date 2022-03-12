//1) node wcat.js filepath -> displays the content of a file in terminal
//2) node wcat.js filepath1 filepath2 filepath3 -> displays the content of all the files in terminal 
//   in concatenated form in given manner 
//3) node wcat.js -n file1 file2 file3 OR node wcat.js -n file1

// node wcat.js f1.txt f2.txt f3.txt
// let input=process.argv.slice(2);
// console.log(input);               //[ 'f1.txt', 'f2.txt', 'f3.txt' ]

const fs=require("fs");
let inputArr=process.argv.slice(2);
console.log(inputArr);
let filesArr=[];
let optionArr=[];

for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=='-'){
        optionArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}
//console.log("files to be read are"+filesArr);

//check if all files are present
for(let i=0;i<filesArr.length;i++){
    let doesExist=fs.existsSync(filesArr[i]);
    if(!doesExist){
        console.log("files does not exist");
        process.exit();
    }
}
 //content reading and appending starts
 let content="";
 for(let i=0;i<filesArr.length;i++){
     let fileContent=fs.readFileSync(filesArr[i]);
     content+=fileContent+"\r\n";

 }
 console.log(content);
 let ContentArr=content.split("\r\n");
 console.table(ContentArr);

//  -s implementation
let tempArr=[];
let isSPresent=optionArr.includes("-s");
if(isSPresent){
    for(let i=1;i<ContentArr.length;i++){
        if(ContentArr[i]=="" && ContentArr[i-1]==""){
            ContentArr[i]=null;
        }
        else if(ContentArr[i]==""&&ContentArr[i-1]==null){
            ContentArr[i]=null;
        }
    }
    console.table(ContentArr);
    
    //push everything in array except null
    for(let i=0;i<ContentArr.length;i++){
        if(ContentArr[i]!=null){
            tempArr.push(ContentArr[i]);
        }
    }
    console.log("Data after removing extra lines\n",tempArr);
}
ContentArr=tempArr;
let indexOfN=optionArr.indexOf("-n");
let indexOfB=optionArr.indexOf("-b");
//if -n or -b is not found it will return -1

let finalOption="";
// if both -n and -b are present
if(indexOfN!=-1 && indexOfB!=-1){
    if(indexOfN < indexOfB){
        finalOption="-n";
    }
    else{
        finalOption="-b";
    }
}
//either -n is present or -b is present
else{
    if(indexOfN!= -1){
        finalOption="-n";
    }
    else if(indexOfB!= -1){
        finalOption="-b";
    }
}
//calling of functions by evaluating final option
if(finalOption=="-n"){
    modifyContentByN();
}
else if(finalOption="-b"){
    modifyContentByB();
}

function modifyContentByN(){
    for(let i=0;i<ContentArr.length;i++){
        ContentArr[i]=(i+1)+") "+ContentArr[i];
    }

}

console.log(ContentArr);

function modifyContentByB(){
    let count=1;
    for(let i=0;i<ContentArr.length;i++){
        if(ContentArr[i]!=""){
            ContentArr[i]=count+") "+ContentArr[i];
            count++;
        }
    }

}

