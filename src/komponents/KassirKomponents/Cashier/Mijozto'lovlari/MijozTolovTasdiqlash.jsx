import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import instance from '../../../../baseUrl'


const MijozTolovTasdiqlash = () => {
    const [data, setData] = useState([])
    const [data2, setData2] = useState({})
    useEffect(() => {
        instance.get(`/core/agent-income-clients/?from_bot=True&&status=waiting`).then((res) => {
            setData(res.data.results);
            setData2(res.data.totals);
        })
    }, [])
    //?from_bot=True&client=267
    const funk = () => {
        instance.get(`/core/agent-income-clients/?from_bot=True&&status=waiting`).then((res) => {
            setData(res.data.results);
            setData2(res.data.totals);
        })
    }
    const Tasdiqlash = (id) => {
        instance.post(`/core/change-status/${id}/`, {
            status: 'accepted'
        }).then((res) => {
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tasdiqlandi!!!',

                })
                funk()
            }

        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Xatolik',
                text: 'Nimadir no\'to\'g\'ri iltimos qaytadan urinib ko\'ing',

            })
        })
    }
    const RadEtish = (id) => {
        instance.post(`/core/change-status/${id}/`, {
            status: 'rejected'
        }).then((res) => {
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Rad Etildi!!!',

                })
                funk()
            }
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Xatolik',
                text: 'Nimadir no\'to\'g\'ri iltimos qaytadan urinib ko\'ing',

            })
        })
    }

    return (
        <div>
            <div style={{ width: "100%", overflow: "scroll" }}>
                <div className="table-responsive">
                    <table className="table table-striped table-hover text-center  mb-0">
                        <thead>
                            <tr>
                                <td scope="col"> №</td>
                                <td scope="col"> Сана</td>
                                <td scope="col">Мижоз </td>

                                <td scope="col">Сумма  </td>
                                <td scope="col">Тўлов тури</td>
                                <td scope="col">Изоҳ </td>
                                <td scope="col">Тасдиқлаш, Бекор қилиш </td>

                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((iteam, index) => {

                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {iteam?.created_date.slice(0, 10)}{" "}
                                            {/* {iteam?.created_date.slice(11, 16)} */}
                                        </td>
                                        <td>{iteam?.client.name}</td>
                                        <td>{iteam?.payment?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                                        <td>{iteam?.payment_type}</td>
                                        <td>{iteam?.comment}</td>
                                        <td className="d-flex justify-content-center">
                                            <i
                                                className="fas fa-check-circle"
                                                onClick={() => Tasdiqlash(iteam.id)}
                                            ></i>
                                            <i
                                                className="fas fa-x"
                                                onClick={() => RadEtish(iteam.id)}
                                            ></i>
                                        </td>

                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                    <table className="table table-striped table-hover text-center  mb-0 mt-5">
                        <thead >
                            <tr>
                                <td scope="col"> </td>
                                <td scope="col"> </td>
                                <td scope="col"> </td>
                                <td scope="col"> </td>
                                <td scope="col">Банк</td>
                                <td scope="col"> Карта</td>
                                <td scope="col">Доллор </td>
                                <td scope="col">Сум </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="col"> </td>
                                <td scope="col"> </td>
                                <td scope="col"> </td>
                                <td scope="col"> </td>
                                <td scope="col">{data2.bank?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} cум</td>
                                <td scope="col"> {data2.karta?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} cум</td>
                                <td scope="col">{data2.dollar?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $</td>
                                <td scope="col">{data2.sum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} cум</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default MijozTolovTasdiqlash