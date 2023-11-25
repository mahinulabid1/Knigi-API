class Debugging {
    

    
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