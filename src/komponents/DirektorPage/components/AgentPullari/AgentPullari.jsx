import axios from 'axios'
import React, { useEffect, useState } from 'react'


const AgentPullari = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://vallisbackend.backoffice.uz/a1/core/agent-cash-register-list/').then((res) => {
            setData(res.data.results);
            console.log(res);
        })
    }, [])


    return (
        <div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Агент</th>
                        <th>Жами доллaр</th>
                        <th>Жами сум</th>
                        <th>Жами карта</th>
                        <th>Жами перечесление</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td className=''>{item.name}</td>
                                    <td>{item.total_dollar} $</td>
                                    <td>{item.total_sum} сум</td>
                                    <td>{item.total_karta} сум</td>
                                    <td>{item.total_transfer}  сум</td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AgentPullari