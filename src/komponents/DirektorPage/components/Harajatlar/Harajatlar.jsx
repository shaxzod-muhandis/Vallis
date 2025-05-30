import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Harajatlar = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [search2, setSearch2] = useState('')
    useEffect(() => {
        axios.get(`https://vallisbackend.backoffice.uz/a1/salary/agent-salary-percent/`).then((res) => {
            setData(res.data.data);
            console.log(res);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://vallisbackend.backoffice.uz/a1/salary/agent-salary-percent/?year=${search}&&month=${search2}`).then((res) => {
            setData(res.data.data);
            console.log(res);
        })
    }, [search, search2])
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1 className='text-white'>Ҳодимлар ойлик ҳисоб китоби</h1>
                <select onClick={(e)=>{setSearch(e.target.value)}} className='form-control' style={{ width: '150px' }}>
                    <option value="">йил филтер</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>

                </select>
                <select onClick={(e)=>{setSearch2(e.target.value)}} className='form-control' style={{ width: '150px' }}>
                    <option value="">oй филтер</option>
                    <option value="1">yanvar</option>
                    <option value="2">fevral</option>
                    <option value="3">mart</option>
                    <option value="4">aprel</option>
                    <option value="5">may</option>
                    <option value="6">iyun</option>
                    <option value="7">iyul</option>
                    <option value="8">avgust</option>
                    <option value="9">sentiyabr</option>
                    <option value="10">oktiyabr</option>
                    <option value="11">noyabr</option>
                    <option value="12">dekabr</option>
                </select>
            </div>
            <table className='table table-bordered mt-3'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Ходим</th>
                        <th>Ойлик суммаси</th>
                        <th>% KPI</th>
                        <th>Жами</th>
                        {/* <th>Олди</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item?.name} </td>
                                    <td>{item?.salary} </td>
                                    <td>{item?.profit}</td>
                                    <td>{item?.total_profit}</td>
                                    {/* <td>{item?.total_kassa}</td> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Harajatlar