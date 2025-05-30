import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AsosiyKassa = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://vallisbackend.backoffice.uz/a1/core/cash-register-list/').then((res) => {
            setData(res.data.results);

        })
    }, [])
    return (
        <div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Жами доллaр</th>
                        <th>Жами сум</th>
                        <th>Жами карта</th>
                        <th>Жами перечесление</th>
                        <th>Жами сумa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.total_dollar} $</td>
                                    <td>{item.total_sum} сум</td>
                                    <td>{item.total_karta} сум</td>
                                    <td>{item.total_transfer}  сум</td>
                                    <td>{item.total_kassa}  сум</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AsosiyKassa