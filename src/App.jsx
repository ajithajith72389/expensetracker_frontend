
import { useEffect, useState } from "react"
import ExpenseItem from "./component/ExpenseItem"
import Form from "./component/Form"
import axios from "axios";


const App =()=>{

  const [expense, setExpense] = useState([
    { id :1, title: "Biriyani", amount: 40 },
    { id: 2,title: "Pizza", amount: 140 },
    { id: 3, title: "Noodles", amount: -10 },
    { id: 4, title: "Roll", amount: -400 },
    { id: 5, title: "Dosa", amount: 17240 },
    { id: 6, title: "Burger", amount: -1000 },
    { id: 7, title: "Parotta", amount: 1440 },
    { id: 8, title: "Pongal", amount: -13000 }
  ])

  useEffect(()=>{
    axios.post("http://localhost:1817").then(res=>{
      console.log(res.data);
      setExpense(res.data)
    }).catch(err=>console.log(err))
  })

  

  

  const addExpense = (title, amount)=>{
    const nextId = expense[expense.length-1].id+1
    setExpense([...expense, { id:nextId, title: title, amount:amount}])
} 
  const deleteExpense =(id)=>{
    setExpense(expense.filter((exp)=>exp.id !==id))
  }

    let income =0 ,expense_amount=0

    expense.forEach((item)=>{
      if (item.amount>0){
        income += item.amount
      }
      else{
        expense_amount -=item.amount
      }
    })

    

  return(
    <>
      <div>
        <div className="balance">Expense Tracker</div>
        <div className="balance">Balance : {income - expense_amount} </div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>{income}</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>{expense_amount}</span>
          </div>

        </div>
        <Form addExpense={addExpense} />
      </div>

      {
        expense.map((item)=>{
          return(
            <ExpenseItem key={item.title} {...item} deleteExpense={deleteExpense}/>
          )
        })
      }
      
    </>
  )
}

export default App