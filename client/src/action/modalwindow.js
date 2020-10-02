import { SET_OPEN } from './types';

export const setModalwindow=(booleanValue)=>dispatch=>{
    //return {type:'SET_MODALWINDOW',payload:modalwindow}

    dispatch({
        type:SET_OPEN,
        payload:booleanValue

    })

}
// export const logoutUser=()=>dispatch=>{

//     localStorage.removeItem('token')
//     dispatch({
//           type: LOGOUT_USER,
//           payload: {}
//     })
// }