import { format, parseISO } from 'date-fns'
import React from 'react'
import {useDispatch} from 'react-redux';
import { markAsPaid,deleteInvoice, setSelectedInvoice,updateInvoice, toggleForm } from '../store/InvoiceSlice';

function InvoiceDetails({invoice}) {
  const dispatch = useDispatch();

  const handleMarkAsPaid=()=>{
    dispatch(markAsPaid(invoice.id))
  }
  const handleEdit=()=>{
    dispatch(toggleForm());
  }
  const handleDelete =()=>{
    dispatch(deleteInvoice(invoice.id));
    dispatch(setSelectedInvoice(null));
  }
    const formatDate=(dateString)=>{
    try{
      return format(parseISO(dateString),'dd MM yyyy')
    }catch(err)
    {
      return "Invalid Date";
    }
  }
  return (
    <div className='bg-slate-800 rounded-lg p-8'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center space-x-4'>
          <span>Status</span>
          <div className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${invoice.status === "paid" ? "bg-green-900/20 text-green-50" : invoice.status === "pending" ? "bg-orange-900/20 text-orange-500" : "bg-slate-700 text-slate-400"}`}>
              <div className={`w-2 h-2 rounded-full ${invoice.status === "paid" ? "bg-green-500" : invoice.status === "pending" ? "bg-orange-500" : "bg-slate-400"}`} />
              <span className='capitalize'>
                {invoice.status}
              </span>
            </div>
        </div>
        <div className='flex space-x-4'>
         
          <button className='px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600'
          onClick={handleEdit}
          >Edit</button>
          <button className='px-6 py-3 rounded-full bg-red-500 hover:bg-red-600' onClick={handleDelete}>Delete</button>
          <button className='px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-600' onClick={handleMarkAsPaid}>Mark as read</button>

        </div>
      </div>
<div className='bg-slate-900 rounded-lg p-8'>
  <div className='flex justify-between mb-8'>
    <div>
      <h2 className='text-xl font-bold mb-2'>#{invoice.id}</h2>
      <p className='text-slate-400'>#{invoice.ProjectDescription}</p>

    </div>
    <div className='text-right text-slate-400'>
      <p>{invoice.billFrom.streetAddress}</p>
      <p>{invoice.billFrom.city}</p>
      <p>{invoice.billFrom.postcode}</p>
      <p>{invoice.billFrom.country}</p>
    </div>
  </div>
    <div className='grid grid-cols-3 gap-8 mb-8'>
      <div >
      <p className='text-slate-400 mb-2'>Invoice Date</p>
      <p className='font-bold'>{formatDate(invoice.invoiceDate)}</p>
      <p className='text-slate-400 mb-2'>Payment Due</p>
      <p className='font-bold'>{formatDate(invoice.dueDate)}</p>

      </div>
      <div>
      <p className='text-slate-400 mb-2'>Bill To</p>
      <p className='font-bold mb-2'>{invoice.clientName}</p>
      <p className='text-slate-400 mb-2'>{invoice.billTo.streetAddress}</p>
      <p className='text-slate-400'>{invoice.billTo.city}</p>
      <p className='text-slate-400'>{invoice.billTo.postcode}</p>
      <p className='text-slate-400'>{invoice.billTo.country}</p>
      </div>
      <div>
      <p className='text-slate-400 mb-2'>Sent To</p>
      <p className='font-bold mb-2'>{invoice.billTo.clientEmail}</p>
      </div>
    </div>
    <div className='bg-slate-800 rounded-lg overflow-hidden'>
      <div className='p-8'>
        <table className='w-full'>
          <thead>
            <tr className='text-slate-400'>
            <th className='text-left'>Item Name</th>
            <th className='text-center'>Qty</th>
            <th className='text-right'>price</th>
            <th className='text-right'>Total</th>
            </tr>
          </thead>
          <tbody>
          {invoice.items.map((item,index)=>(
            <tr className=' text-white' key={index}>
            <td className='text-left'>{item.name}</td>
            <td className='text-center'>{item.quantity}</td>
            <td className='text-right'>{item.price.toFixed(2)}</td>
            <td className='text-right'>{item.total.toFixed(2)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className='bg-slate-900 p-8 flex justify-between items-center'>
        <span className='text-white'>Amount Due</span>
        <span className='text-3xl font-bold'>${invoice.amount.toFixed(2)}</span>
      </div>
    </div>
</div>

    </div>
  )
}

export default InvoiceDetails