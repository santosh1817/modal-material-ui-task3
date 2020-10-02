
import React,{useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux';
import  {setModalwindow}  from '../action/modalwindow';
import { useSelector } from 'react-redux'

const Add=(props)=>{
  const [data,setdata]=useState([])
  const  [num,setnum]=useState('');
  const [title,settitle]=useState('')
  const [author,setauthor]=useState('')
  const [publisher,setpublisher]=useState('')
  const [stock,setstock]=useState('')


  //const counter = useSelector(state => state.modalwindow.item)
  const handleClose=(e)=>{
    e.preventDefault()
    props.setModalwindow(false)
    
  }

  const handleSubmit=(e)=>{
      e.preventDefault()
      const formData={
        num:num,
        title:title,
        author:author,
        publisher:publisher,
        stock:stock

      }
    
    axios.post('http://localhost:3005/data/add',formData)
    .then(response=>{
      setdata(response.data)
      props.history.push('/all')
    })
    .catch(err=>console.log(err))
  }
    return(
        <Form onSubmit={handleSubmit}>
            <h2>Add New Record</h2>
            <FormGroup>
              <Label>Num</Label>
              <Input type="text" name="num"  value={num} onChange={e=>setnum(e.target.value)}/>
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
            <Button className="btn btn-success"> Save</Button> 
            <Button className="btn btn-danger" onClick={handleClose}>Close</Button>
        </Form>
    )
}

const mapStateToProps = state => {
  return {
      
      open: state.modalwindow.item
  };
}

export default connect(mapStateToProps,{setModalwindow})(Add);
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));


// export default function Add() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [firstName,setfirstName]=React.useState(null)

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div>
//       <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
//       <i className="fa fa-plus" aria-hidden="true"></i>
//       Add Record
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         <Typography className={classes.typography}>
//           <div>
//           <div className="input-field">
//                         <input type="text" 
//                         name="firstName"
//                          value={firstName} 
//                          onChange={e=>setfirstName(e.target.value)}
//                          />
//                         <label htmlFor="firstName" className="active">
//                            Title
//                         </label>

//                     </div>
                    

//           </div>
//         </Typography>
//       </Popover>
//     </div>
//   );
// }





// // import React from 'react'
// // import {Modal,Button,Row,Col,Form} from 'react-bootstrap'


// // const Add=()=>{

// // }
// // // class Add extends React.Component{

// // //     constructor(props){
// // //         super(props)
// // //         this.state={

// // //         }

// // //       } 
// // //         render()
// // //         {
// // //             return(
// // //                 <div>
// // //                      <Modal
// // //       {...this.props}
// // //       size="lg"
// // //       aria-labelledby="contained-modal-title-vcenter"
// // //       centered
// // //     >
// // //       <Modal.Header closeButton>
// // //         <Modal.Title id="contained-modal-title-vcenter">
// // //                 Add Skills 
// // //         </Modal.Title>
// // //       </Modal.Header>
// // //       <Modal.Body>
// // //         <div className="container">
// // //             Add Form Fields for Skills

// // //         </div>
       
// // //       </Modal.Body>
// // //       <Modal.Footer>
// // //         <Button  varient ="primary" onClick={this.props.onHide}>Close</Button>
// // //       </Modal.Footer>
// // //     </Modal>
// // //                 </div>
// // //             )
// // //         }
    
// // // }
// // export default Add