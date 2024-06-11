class ApiError extends Error{
    constructor(status,message="something went wrong ",errors=[],stack=""){
        super(message);
        this.statusCode=status;
        this.data=null;
        this.message=message;
        this.success=false;
        this.errors=errors
           
    if(stack){
        this.stack=stack;
    }
    else{
        Error.captureStackTrace(this,this.constructor)
    }
    }//constructor overwrite 
 
}

export {ApiError}