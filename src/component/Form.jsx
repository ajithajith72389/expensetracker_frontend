import { useState } from "react"


const Form = (props)=>{
    const {addExpense} =props
    const [title, setTitle]=useState('')
    const [amount, setAmount] = useState(0)
    const [errors, setErrors] = useState({})

    const handleSubmit=(e)=>{
        e.preventDefault()
        let err={}

        // if(title===''&& amount===0){
        //     alert('Please enter valid title and amount')
        //     return

        // }

        if (title.length < 3) {    // && amount===0
            err.title="title should be more than 3 letter"
           
        }

        if(!amount){
            err.amount= "Enter a valid amount"
            
        }

        if(Object.keys(err).length>0){
            setErrors({...err})
            return
        }


        addExpense(title, amount)
        setTitle('')
        setAmount(0)
    }

    const handleTitleChange = (e) =>{
        setTitle(e.target.value)
        setErrors({...errors, title:""})
    }

    const handleAmountChange = (e)=>{
        setAmount(parseInt(e.target.value))
        setErrors({...errors, amount:""})
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <label className="title">Title</label>
                <input type="text" placeholder="Enter the title" id="title" required value={title} onChange={handleTitleChange} />
            </div>

            <div className="input-container">
                <label className="amount">Amount</label>
                <input type="text" placeholder="Enter the Amount" id="amount" required  value={amount} onChange={handleAmountChange}/>
                {errors.title ? <div className="error">{errors.title}</div> : null}
            </div>
            <button className="button" type="submit">Add Transaction</button>
        </form>
    )
}

export default Form