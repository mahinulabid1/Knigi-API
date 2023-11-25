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
        for( const prop in data ) {
            console.log(`From ${prop} :`);
            console.log(`${data [ prop ]}\n`);
        }
    }

}


class ExecutionDuration {
    constructor ( ) {
        this.executionStart = undefined;
        this.executionDuration = undefined;
        this.executionEnd = undefined;
    }

    begin() {
        this.executionStart = Date.now ( );
    }

    finish() {
        this.executionEnd = Date.now ( );
        this.executionDuration = this.executionEnd - this.executionStart;
        return this.executionDuration;
    }
}

module.exports = { Debugging, ExecutionDuration }