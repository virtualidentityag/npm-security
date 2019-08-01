#!/usr/bin/env node
try {
    const childProcess = require('child_process');
    let checkCategoryOrHigher = '';
    
    process.argv.forEach(function (val, index, array) {
        if(index === 2) {
            checkCategoryOrHigher = val;
        }
    });
    
    childProcess.exec('npm audit --json', function (error, stdout, stderr){
        try{
            JSON.parse(stdout);
            if(typeof stderror == 'undefined') {
    
                console.log("\x1b[33m", '--> 👮  START THE SECURITY CHECK');
        
                const json = JSON.parse(stdout);

                objPaths = Object.values(json.metadata.vulnerabilities);

                let startIndex = 1;
                switch(checkCategoryOrHigher) {
                    case 'critical':
                        startIndex = 4; 
                        break;
                    case 'high':
                        startIndex = 3; 
                        break;
                    case 'moderate':
                        startIndex = 2; 
                        break;
                }
        
                for(var i = startIndex; i < objPaths.length; i++) {
                    if(objPaths[i]) {
                        console.error("\x1b[31m", '--> ✋ IS INSECURE FOR LEVEL ' + checkCategoryOrHigher.toUpperCase());
                        process.exit(1);
                    }
                }
            }
            console.log("\x1b[32m", '--> 👮  SECURE FOR ' + checkCategoryOrHigher.toUpperCase());
            process.exit();    
        }
        catch(e) {
            console.error(e);
            process.exit(1);
        }
    });
}
catch(error) {
    console.log(error);
    process.exit(1);
}