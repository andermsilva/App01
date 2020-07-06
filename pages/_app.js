import React from 'react'
import '../css/styles.css'
import Layout from '../components/Layuot/indexs'


const MyApp = ({Component,pageProps})=>{
    return (
         
        <Layout>
           <Component {...pageProps}/>
        </Layout>
    )}


export default MyApp