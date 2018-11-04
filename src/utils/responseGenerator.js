const generator = {
    successResponse: (data) => {
        return {
            status:true,
            data
        }
    },
    errorResponse: (error) => {
        return {
            status:true,
            message:error
        }
    }
}

module.exports=generator;