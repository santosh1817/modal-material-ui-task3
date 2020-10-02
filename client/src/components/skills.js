import axios from 'axios';
import index from '../index.css';
import Add from './Add';
import Edit from './Edit';
import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setModalwindow } from '../action/modalwindow';
import { useSelector } from 'react-redux';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Form1 = props => {
  const counter = useSelector(state => state.modalwindow.item);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const [data, setdata] = useState([]);
  const [showForm, setshowForm] = useState(false);
  const [showTable, setshowTable] = useState(true);

  const handleOpen = () => {
    props.setModalwindow(true);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Add />
    </div>
  );

  const body1 = (
    <div style={modalStyle} className={classes.paper}>
      <Edit />
    </div>
  );

  useEffect(() => {
    props.setModalwindow(false);
    axios
      .get('http://localhost:3005/data/all', {
        headers: {
          'x-auth': localStorage.getItem('token')
        }
      })
      .then(response => {
        setdata(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = () => {
    console.log('delete');
    const id = props.match.params.id;
    //   console.lo
    axios.delete(`http://localhost:3005/data/delete/${id}`);
  };

  //   const handleShowForm = () => {
  //     console.log('hello');
  //     return (
  //       <div>
  //         <h1>hello</h1>
  //       </div>
  //     );
  //   };

  const Table = () => {
    return (
      <div>
        <div>
          <button
            type='button'
            className='btn btn-primary'
            data-toggle='popover'
            color='blue'
            onClick={handleOpen}
          >
            <i className='fa fa-plus' aria-hidden='true'></i>Add new Record
          </button>
          <button className='btn btn-primary'>
            <i className='fa fa-search' aria-hidden='true'></i>Filter
          </button>
          <button type='button' className='btn btn-primary'>
            Primary
          </button>
          {/* {showForm ? handleShowForm : null} */}
        </div>
        <div>
          <table className='table'>
            <thead>
              <tr className='th'>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Stock</th>
                <th>gg</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="trbody"> */}
              {data.map(da => {
                return (
                  <>
                    <tr scope='row' key={da._id}>
                      <td>{da.num}</td>
                      <td>{da.title}</td>
                      <td>{da.author}</td>
                      <td>{da.publisher}</td>
                      <td>{da.stock}</td>
                      <td>
                        <button
                          className='btn btn-warning'
                          onClick={handleEdit}
                        >
                          <i className='fa fa-pencil' aria-hidden='true'></i>
                          Edit
                          <br />
                        </button>
                      </td>
                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={handleDelete}
                        >
                          <i className='fa fa-trash' aria-hidden='true'></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
              {/* </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  //   const handleAdd = () => {
  //     //this.setState({ showForm: true, showTable: false });
  //     console.log('data', data);
  //     setshowForm(true);
  //     setshowTable(false);
  //   };
  console.log('tt', counter);
  return (
    <div>
      {/* <h1>hello {counter} </h1> */}
      {console.log('props', props)}
      {showTable ? Table() : null}
      {/* {showForm ? handleShowForm() : null} */}

      <Modal
        open={counter}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>

      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body1}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    open: state.modalwindow.item
  };
};

export default connect(mapStateToProps, { setModalwindow })(Form1);

// import React ,{useState,useEffect}  from 'react'
// import axios from 'axios'
// import index from '../index.css'
// import Add from './Add'
// import Test from './test'

// const Form =(props)=>{
//     const classes = useStyles();

//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);

//     const [formdata,setData]=useState([])
//     const [showForm,setshowForm]=useState(false)
//     const [showTable,setshowTable]=useState(true)

//     const handleOpen = () => {
//         setOpen(true);
//         //setshowTable(false)
//     };

//     const handleClose = () => {
//         setOpen(false);
//         //setshowTable(true)

//     };

//     const body = (
//         <div style={modalStyle} className={classes.paper}>
//             <h2 id="simple-modal-title">Text in a modal</h2>
//             <p id="simple-modal-description">
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </p>
//             {/* <Form1 /> */}
//         </div>
//         );

//     useEffect(()=>{
//         axios.get(`http://localhost:3005/data/all`)
//         .then(response=>{
//         //    console.log(response.data)
//             setData(response.data);
//             // console.log(setData,'inset')
//             // console.log(data,'indata')
//             })
//         .catch(err=>console.log(err))

//     },[])

//     return(
//         <div>
//             <button type="button" className="btn btn-primary" data-toggle="popover" color="blue"  onClick={()=>({setModalShow:true})} ><i className="fa fa-plus" aria-hidden="true"></i>Add new Record</button>
//             <Add show={addModalShow} onHide={addModalClose}/>

//             <button className="btn btn-primary"><i className="fa fa-search" aria-hidden="true"></i>Filter</button>
//             <button type="button" className="btn btn-primary">Primary</button>
//            <table className="table">
//                <thead>
//                     <tr className="th">
//                     <th scope="col">#</th>
//                     <th scope="col">Title</th>
//                     <th scope="col">Author</th>
//                     <th scope="col">Publisher</th>
//                     <th scope="col">Stock</th>
//                     <th scope="col">gg</th>
//                     </tr>
//                </thead>
//                <tbody>
//                    {formdata.map(form=>{
//                        return(
//                            <tr key={form._id}>
//                                <td>{form.num}</td>
//                                <td>{form.title}</td>
//                                <td>{form.author}</td>
//                                <td>{form.publisher}</td>
//                                <td>{form.stock}</td>
//                                <td><button  className="btn btn-warning"><i className="fa fa-pencil" aria-hidden="true"></i>Edit</button><button className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i>Delete</button></td>

//                            </tr>
//                        )
//                    })}

//                </tbody>

//            </table>

//         </div>
//     )

// }

// export default Form
