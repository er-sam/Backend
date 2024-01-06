const asyncHandler=(reqHandleFn)=>{
    return(req,res,next)=>{
        Promise.resolve(reqHandleFn(req,res,next))
        .catch((err)=>next(err))
    }
}

export {asyncHandler}