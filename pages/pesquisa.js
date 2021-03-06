import React,{useState} from 'react'

import PageTitle from '../components/PageTitle'
const Pesquisa =()=>{
   const cor ='bg-red-200'
    const [ form ,setForm ]=useState({
        Nome:'',
        Email: '',
        Whatsapp:'',
        Nota:0

    })
     
    
    const notas=[0,1,2,3,4,5]
    const [sucess,setSucess]= useState(false)
    const [retorno, setRetorno]= useState({})
   //validar dados!!
    const save = async ()=>{

      const string = form.Whatsapp
       
     const  msm =''
        
      if(isNaN(form.Whatsapp)){

        form.Whatsapp = string.replace(/\D+/g ,'')
      }

     

        
        if(form.Nome !=='' && form.Email!=='' && form.Whatsapp !==''){
                try{
                const response = await fetch('/api/save',{
                        method: 'POST',
                        body: JSON.stringify(form)
                    })
                    const data = await response.json()

                    setSucess(true)
                    setRetorno(data)
                    
                }catch(err){

                }
           

        }  else{
                alert('Preencha todos os campos')
                
        }
    }

   const onChange = evt =>{
       const value= evt.target.value
       const key = evt.target.name
        
       setForm(old=>({
            ...old,
            [key] :value
       }))
       
   }
    return(

        <div className='pt-6'>
            <PageTitle title='Pesquisa'/>
            <h1 className='text-center font-bold my-4 text-2xl'> Criticas e sugestões</h1>

            <p className='text-center mb-6'>
                O restaurante X sempre busca atender melhor seus Clientes.<br/>
                Por isso estamos sempre abertossa ouvir sua opinião.
            </p>
            {!sucess &&
            <div className='w-1/5 mx-auto'>
                <label className='font-bold'>Seu Nome:</label>
                <input className='p-4 block  bg-blue-100  shadow rounded-lg my-2' type='text' placeholder='Nome' name='Nome' 
                       onChange={onChange} value={form.Nome}/>

                <label className='font-bold'>E-mail:</label>
                <input className='p-4 block bg-blue-100 shadow rounded-lg my-2' type='text' placeholder='Email' name='Email' 
                       onChange={onChange} value={form.Email}/>

                <label className='font-bold'>Whatsapp:</label>
                <input className='p-4 block bg-blue-100 shadow rounded-lg my-2' type='text'  placeholder='Whatsapp' name='Whatsapp'
                         onChange={onChange} value={form.Whatsapp}/>

                <label className='font-bold'>Sua Nota:</label>
                <div className='flex py-6'>
                {
                   
                    notas.map( nota =>{
                        return(
                        <label className='w-1/6 block text-center'>
                            {nota}<br /><input type='radio' name = 'Nota' value={nota} onChange={onChange}/> 
                        </label> )
                    })
                    
                }
                </div>
                <pre>{
                    
                    
                       // JSON.stringify(form,null,2) 
                       // retorno.Nome
                }</pre>
                <button onClick={save} className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow  my-2'> Enviar</button>
            </div>
            }
            {sucess && <div className='w-1/5 mx-auto'>
                <p className=' mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'>
                    Obrigado por contribuir com sua opinião
                </p>
                {
                    retorno.showCoupon && <div className='text-center border p-4 mb-4'>
                        Seu Cupom: <br />
                      <span className='font-bold text-2xl'>  {retorno.Cupom}</span>
                        </div>
                }
                 {
                    retorno.showCoupon && 
                    <div className='text-center border p-4 mb-4'>
                        
                      <span className='font-bold'>  {retorno.Promo}</span>
                      <br />
                      <span className='italic'> Tire uma foto desse Cupom e apresente ao garçom.</span>
                       
                    </div>
                }
               
               </div>}

        </div>
     
)}

export default Pesquisa