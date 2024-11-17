import React, { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect } from 'react'

const Manager = () => {
    const completetask=useRef()
    const priorityorder={High:1, Medium:2,Low:3}
   
    const sortTable=()=>{
        const sortedData=[...TaskArray].sort((a,b)=>{
           
                return priorityorder[a.Task]-priorityorder[b.Task];
     }) 
     setTaskArray(sortedData)
    }
    const [form, setform] = useState({ site: "", Status: "Not Completed", Task: "High" })
    const [TaskArray, setTaskArray] = useState([])
    useEffect(() => {
        let Tasks = localStorage.getItem("Tasks");
        
        if (Tasks) {
            setTaskArray(JSON.parse(Tasks))
        }
    },
        [])
    const color = (e) => {
        switch(e){
            case 'High':
                return <span className='bg-red-700 px-3 rounded-xl'>High</span>
                case 'Medium':
                return <span className='bg-green-600  px-3 rounded-xl'>Medium</span>;
                case 'Low':
                return <span className='bg-blue-300  px-3 rounded-xl'>Low</span>;
        }
    }
    const colortext = (e) => {
        switch(e){
            case 'Not Completed':
                return <span className='bg-red-700 p-2 rounded-xl'>Not Completed</span>
                case 'Completed':
                    return <span className='bg-green-600  p-2 rounded-xl'>Completed</span>;
        }
    }
    const saveTask = () => {
        if(form.site.length>3&&form.Status.length>3){
        setTaskArray([...TaskArray, {...form, "id":uuidv4()}])
        localStorage.setItem("Tasks", JSON.stringify([...TaskArray, {...form, "id":uuidv4()}]))
        console.log([...TaskArray, form])
        setform({ site: "", Status: "Not Completed", Task: "High" })
        toast('Task Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",            
            });   
        }else{
            toast.error('Error Task not saved',{
                theme: "dark"
            });
            
        
        }
    }

    const deleteTask = (id) => {

        let c=confirm("Do you want to delete this Task?")
        if(c){
        console.log("Deleting Task with id", id)
        setTaskArray(TaskArray.filter(item=>item.id!==id))
        localStorage.setItem("Tasks", JSON.stringify(TaskArray.filter(item=>item.id!==id))) 
        toast('Task Deleted Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",            
            });   
        } 
    }
    const editTask = (id) => {
        console.log("Editing Task with id", id)
        setform(TaskArray.filter(i=>i.id===id)[0])
        setTaskArray(TaskArray.filter(item=>item.id!==id))  
         
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
        
    }
    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",            
            });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="p-2 md:p-0 md:mycontainer">
                
                <div className="text-4xl font-bold text-center">
                    <span className="text-purple-700"> &lt;</span>
                    <span className='text-white'>Task</span>
                    <span className="text-purple-700">OP/&gt;</span>
                    <p className='text-white text-lg gap-8 text-center'>Your Task Manager</p>
                </div>
                <div className='flex flex-col items-center p-4 text-purple gap-8'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Task' className='p-4 py-1 rounded-full border w-full border-purple-800' type="text" name="site" id="site" />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                        <select value={form.Status} onChange={handleChange} placeholder='Enter Status' className='p-4 py-1 rounded-full border w-full border-purple-800' type="text" name="Status" id="Status" >
                        
                            
                            <option value="Completed">Not Completed</option>
                            <option value="Not Completed">Completed</option>

                        
                            </select>
                        <div className="relative">

                            <select value={form.Task} onChange={handleChange} placeholder='Enter Task Priority' className='p-4 py-1 rounded-full border w-full border-purple-800' type="Task" name="Task" id="Task" >
                            
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        
                            </select>
                        </div>
                    </div>
                    <button onClick={saveTask} className=' font-semibold flex justify-center items-center bg-purple-400 border-2 border-purple-950 hover:bg-purple-300 rounded-full px-2 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon >
                        Save Task</button>

                </div>

                <div className="Tasks">
                    <h2 className='font-bold text-2xl py-4 flex text-white justify-center items-center'>Your Tasks</h2>
                    <button className='p-3 rounded-2xl bg-purple-400 font-bold border-2 hover:bg-purple-300 border-purple-800' onClick={sortTable}>Sort Task</button>
                    {TaskArray.length === 0 && <div className='text-white flex justify-center'>No Tasks to show</div>}
                    {TaskArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-purple-800 border-2 border-purple-950'>
                                <tr>
                                    <th className='py-2'>Task</th>
                                    <th className='py-2'>Status</th>
                                    <th className='py-2'>Priority</th>
                                    <th className='py-2'>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-purple-400'>
                                {TaskArray.map((items, index) => {
                                    return <tr key={index}>

                                        <td className='py-2 border border-white text-center w-32'><a href={items.site} target='_blank'>{items.site}</a>

                                            
                                            <span className='cursor-pointer ' onClick={() => { copytext(items.site) }}>
                                                <i className="fa fa-copy flex p-2"></i>      </span>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>{colortext(items.Status)}

                                            
                                            <span className='cursor-pointer' onClick={() => { copytext(items.Status) }}>
                                                <i className=" cursor-pointer fa fa-copy p-2"></i> </span>
                                                
                                        </td>
                                        <td className=' py-2 border border-white text-center w-32'>{color(items.Task)}
                                            
                                            
                                            <span className='cursor-pointer' onClick={() => { copytext(items.Task) }}>
                                                <i className="fa fa-copy p-2"></i> </span>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                        
                                         <i className="fa fa-edit cursor-pointer p-2" onClick={()=>{editTask(items.id)}}></i>
                                         <i className="fa fa-trash-o cursor-pointer" onClick={()=>{deleteTask(items.id)}}></i>
                                        </td>
                                    </tr>
                                }
                                )}

                            </tbody>
                        </table>}

                </div>
            </div>
        </>
    )

}

export default Manager
