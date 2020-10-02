import React,{useState,useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'


const Edit=(props)=>{
  const [data,setdata]=useState([])
  const [num,setnum]=useState('');
  const [title,settitle]=useState('')
  const [author,setauthor]=useState('')
  const [publisher,setpublisher]=useState('')
  const [stock,setstock]=useState('')


  useEffect(()=>{
    //const id=props.match.params.id
    //console.log(id,'in id')
    axios.get(`http://localhost:3005/data/`,{
        headers:{
            'x-auth':localStorage.getItem('token')
        }
    })
    .then((response)=>{
        
        setdata(response.data)
        console.log('res',response.data)
    })
    .catch(err=>console.log(err))
  },[])


  const handleSubmit=(e)=>{
      e.preventDefault()
      const formData={
        num:num,
        title:title,
        author:author,
        publisher:publisher,
        stock:stock

      }
    
   axios.put(`/edit/${data._id}`,formData,{
    headers:{
        'x-auth':localStorage.getItem('userAuthToken')
    }
   })
   .then(form=>{
       console.log('here')
       props.history.push('/data/:id')
   })
}
    return(
        <Form onSubmit={handleSubmit}>
            <h2>Edit Record</h2>
            <FormGroup>
              <Label>Num</Label>
              <Input type="text" name="num" value={num} onChange={e=>setnum(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label>Title</Label>
              <Input type="text"  name="title" value={title} onChange={e=>settitle(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label>Author</Label>
              <Input type="text" name="author" value={author} onChange={e=>setauthor(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label>Publishers</Label>
              <Input type="text" name="publisher"  value={publisher} onChange={e=>setpublisher(e.target.value)}/>
            </FormGroup>

            <FormGroup>
              <Label>Stock</Label>
              <Input type="number" name="stock"  value={stock} onChange={e=>setstock(e.target.value)}/>
            </FormGroup>
            <Button className="btn btn-success"> Save</Button> <Button className="btn btn-danger">Close</Button>
        </Form>
    )
}
export default Edit
