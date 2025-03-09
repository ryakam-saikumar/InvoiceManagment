import React from 'react'
import Header from './Header'
import InvoiceList from './InvoiceList'
import Invoiceform from './Invoiceform'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../store/InvoiceSlice'
import InvoiceDetails from './InvoiceDetails'

function AppContent() {
const dispatch=useDispatch();
const {isFormOpen,selectedInvoice} = useSelector((state)=>state.invoices);

  const handleNewInvoice=()=>{
    dispatch(toggleForm());
  };
  return <div className='bg-slate-900 text-white min-h-screen'>
    <div className='max-w-5xl mx-auto py-12 px-4'>
      <Header onNewInvoice={handleNewInvoice} />
      {selectedInvoice ? <InvoiceDetails invoice={selectedInvoice} /> : <InvoiceList />}
  
      {isFormOpen && <Invoiceform  invoice={selectedInvoice}/>}

    
    </div>
  </div>
}

export default AppContent