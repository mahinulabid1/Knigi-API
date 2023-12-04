class Debugging {

    console ( data ) {
        // data should be an object
        // it will tested by logging into the console
        /*
            {
                FunctionName : "String: the function you're in",
                DataFromRequest : req.body,
                passwordFromForm: req.body.data
            }
        */
       console.log("\n\nDEBUG RESULT:\n-----------------------")
        for( const prop in data ) {         //looping through the OBJECT
            console.log(`From ${prop} : ${data [ prop ]}\n`);
            // console.log(`${data [ prop ]}\n`);
        }
    }

    // input array of elements, checks array elementss have undefined function
    // output : true/false, true= valid, false = not valid;
    fieldInputValidation (arrayInput) {
        for(let i = 0; i < arrayInput.length; i++ ) {
            if( arrayInput[i] === undefined ) {
                return false;
            }
        }
    }

}


class ExecutionDuration {
    constructor ( ) {
        this.executionStart = undefined;
        this.executionDuration = undefined;
        this.executionEnd = undefined;
    }

    monitorBegin() {
        this.executionStart = Date.now ( );
    }

    monitorEnd() {
        this.executionEnd = Date.now ( );
        this.executionDuration = this.executionEnd - this.executionStart;
        return this.executionDuration;
    }
}

module.exports = { Debugging, ExecutionDuration }