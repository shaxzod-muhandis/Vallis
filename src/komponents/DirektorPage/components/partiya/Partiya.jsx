import { Box, Fade, Modal } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import instance from '../../../../baseUrl';
import Backdrop from '@mui/material/Backdrop';

import { PaginationContainer } from '../tables/PaginationStyle';
import { Link } from 'react-router-dom';

export default function Partiya() {
  const [hide, setHide] = useState(false);
  const [rashod, setRashod] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [warehouseList, setWarehouseList] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [total_expanse, setTotal_expanse] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const [data, setData] = useState({
    number: '',
    warehouse: '',
    provider: '',
  });
  const [count, setCount] = useState();
  const initialData = {
    number: '',
    warehouse: '',
    provider: '',
  };
  const getReportList = async () => {
    try {
      const res = await instance.get('report/party/');
      if (res.status == 200) {
        setReportList(res.data.results);
        setCount(res.data.count);
        setTotal_expanse(res.data.total_expanse);
      }
    } catch (error) {}
  };

  const handlePagination = async (count) => {
    const { selected } = count;
    let offset = 10 * selected;
    let response = await instance.get('report/party/', {
      params: {
        limit: 20,
        offset: offset,
      },
    });
    setReportList(response.data.results);
  };
  const getWarehouses = async () => {
    try {
      const res = await instance.get('warehouse/warehouses/');
      if (res.status == 200) {
        const { results } = res.data;
        setWarehouseList(results);
      }
    } catch (error) {}
  };

  const getProviders = async () => {
    try {
      const res = await instance.get('provider/provider-list/');
      if (res.status == 200) {
        const { providers } = res.data;
        setProviderList(providers);
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post('report/party/', data);
      getReportList();
      if (res.status == 201) {
        setData(initialData);
      }
    } catch (error) {}
  };

  const deleteParty = async (id) => {
    let del = window.confirm('Учиришни тасдиқласизми ?');
    if (del) {
      try {
        const res = await instance.delete(`report/party/${id}/`);
        if (res.status == 204) return getReportList();
        return;
      } catch (error) {}
    }
  };

  const getEditedUser = async (id) => {
    setConfirmed(true);
    setHide(true);
    const getById = reportList.filter((item) => item.id == id);
    for (let el in getById[0]) {
      setData((prev) => ({ ...prev, [el]: getById[0][el] }));
    }
  };

  const editParty = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.patch(`report/party/${data?.id}/`, {
        number: data.number,
        cost: data.cost ? data.cost : undefined,
        price: data.price ? data.price : undefined,
        warehouse: data.warehouse.id ?? data.warehouse,
        provider: data.provider.id ?? data.provider,
      });
      getReportList();
      if (res.status == 200) {
        setData(initialData);
        setConfirmed(!confirmed);
      }
    } catch (error) {}
  };

  const handleselect = (e) => {
    instance.get(`report/party/?party=${e.target.value}`).then((res) => {
      if (res.status == 200) {
        setReportList(res.data.results);
        setCount(res.data.count);
        setTotal_expanse(res.data.total_expanse);
      }
    });
  };
  const handleselect2 = (e) => {
    instance.get(`report/party/?provider=${e.target.value}`).then((res) => {
      if (res.status == 200) {
        setReportList(res.data.results);
        setCount(res.data.count);
        setTotal_expanse(res.data.total_expanse);
      }
    });
  };

  const onSetstartDate = (e) => {
    setStart_date(e.target.value);
  };
  const onSetendDate = (e) => {
    setEnd_date(e.target.value);
    setToggle(false);
  };

  useEffect(() => {
    getWarehouses();
    getProviders();
    getReportList();
  }, []);
  useEffect(() => {
    instance.get(`report/party/?start_date=${start_date}&end_date=${end_date}`).then((res) => {
      if (res.status == 200) {
        setReportList(res.data.results);
        setCount(res.data.count);
        setTotal_expanse(res.data.total_expanse);
      }
    });
  }, [start_date, end_date]);

  const rasxod = (id) => {
    instance.get(`/report/party-expanse/?party=${id}`).then((res) => {
      if (res.status == 200) {
        setRashod(res.data.results);
        handleOpen();
      }
    });
  };

  const nimadir = (id) => {
    handleOpen2();
    // instance.get(`/report/party-expanse/?party=${id}`).then((res) => {
    //   if (res.status == 200) {
    //     setRashod(res.data.results)
    //     handleOpen()
    //   }
    // })
  };

  return (
    <div className="adding-staff-box adding-staff">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-primary btn-plus" onClick={() => setHide(!hide)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="col-8 d-flex justify-content-end">
          {/* <select style={{ marginRight: '20px', width: '200px' }} name="party" className="selectStyle" onChange={(e) => handleselect(e)}>
            <option value="">Партия рақами</option>
            {reportList?.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list?.number}
                </option>
              );
            })}
          </select> */}
          <select
            style={{ marginRight: '20px', width: '200px' }}
            name="provider"
            className="selectStyle"
            onChange={(e) => handleselect2(e)}
          >
            <option value="">Провайдер</option>
            {reportList?.map((list) => {
              return (
                <option key={list.id} value={list.provider.id}>
                  {list?.provider.name}
                </option>
              );
            })}
          </select>

          <div className="filter-box float-right" style={{ width: '137px', height: '50px' }}>
            {/* <span className="today" >
              Кун
            </span>
            <span className="weekly">
              Ҳафта
            </span>
            <span className="monthly" >
              Ой
            </span> */}
            <span onClick={() => setToggle(!toggle)}>Оралиқ-сана</span>
            <div className={toggle ? 'date-range toggle' : 'date-range '}>
              <input type="date" name="startDate" onChange={onSetstartDate} />
              <input type="date" name="endDate" onChange={onSetendDate} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={hide ? 'form-box m-0 toggle' : 'form-box m-0 '}
        style={hide ? { height: '35vh' } : {}}
      >
        <form onSubmit={confirmed ? editParty : handleSubmit}>
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <input
                type="text"
                name="number"
                value={data.number}
                placeholder="Партия рақами"
                required
                onChange={handleChange}
              />
              <select value={data.warehouse} name="warehouse" onChange={handleChange}>
                {data.warehouse.id ? (
                  <option value={data.warehouse.id}>{data.warehouse.name}</option>
                ) : (
                  <option selected hidden>
                    Омбор
                  </option>
                )}
                {warehouseList.map((item) => {
                  const { id, name } = item;
                  return <option value={id}>{name}</option>;
                })}
              </select>
              <select value={data.provider} name="provider" onChange={handleChange}>
                {data.provider.id ? (
                  <option value={data.provider.id}>{data.provider.name}</option>
                ) : (
                  <option selected hidden>
                    Провайдер
                  </option>
                )}
                {providerList.map((item) => {
                  const { id, name } = item;
                  return <option value={id}>{name}</option>;
                })}
              </select>
            </div>
            <div className="col-md-4 col-lg-4">
              <input
                type="text"
                name="price"
                value={data.price}
                placeholder="Махсулот таннархи (долларда)"
                onChange={handleChange}
              />
              <input
                type="text"
                name="cost"
                value={data.cost}
                placeholder="Харажат (долларда)"
                onChange={handleChange}
              />
              <button className="btn btn-primary" type="submit">
                {confirmed ? 'Таҳрирлаш' : 'Тасдиқлаш'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="register-table-box table-responsive p-0">
        <table className="table table-striped table-hover text-center  m-0">
          <thead>
            <tr>
              <td scope="col">T/R</td>
              <td scope="col">Партия рақами</td>
              <td scope="col">Омбор</td>
              <td scope="col">Провайдер</td>
              <td scope="col">Тан нархи</td>
              <td scope="col">Харажат</td>
              <td scope="col">Жами сўмма</td>
              <td scope="col">Вақти</td>
              <td scope="col">Қушимча</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          {reportList.map((reports, index) => {
            const {
              cost,
              created_date,
              id,
              number,
              price,
              provider,
              updated_date,
              warehouse,
              expanse,
            } = reports;
            return (
              <tbody key={id}>
                <tr>
                  <td>{index + 1}</td>
                  <td onClick={() => rasxod(id)}>{number}</td>
                  <td onClick={() => nimadir(id)}>{warehouse?.name}</td>
                  <td>{provider?.name}</td>
                  <td>{cost} $</td>
                  <td>{expanse} $</td>
                  <td>{+expanse + +price} $</td>
                  <td>{created_date.slice(0, created_date.indexOf('T'))}</td>
                  <td>
                    <Link to={'/director/partiya-shopping'}>
                      <i className="fa-solid fa-cart-shopping shopping-icon__td"></i>
                    </Link>
                    <i
                      className="fa-solid fa-money-bill-1-wave money-icon__td"
                      onClick={() => rasxod(id)}
                    ></i>
                  </td>
                  <td>
                    <i className="fas fa-edit" onClick={() => getEditedUser(id)}></i>
                    <i className="fas fa-trash" onClick={() => deleteParty(id)}></i>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <h3 className="h2 text-white mt-3 float-right">
        Жами: {total_expanse.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}$
      </h3>
      <PaginationContainer>
        <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          onPageChange={handlePagination}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(count / 10)}
          previousLabel="&laquo;"
          renderOnZeroPageCount={null}
        />
      </PaginationContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1>Партияга харажатлар</h1>
            <div className="register-table-box table-responsive p-0">
              <table className="table table-striped table-hover text-center  m-0">
                <thead>
                  <tr>
                    <td scope="col">T/R</td>
                    <td scope="col">Партия рақами</td>
                    <td scope="col">Сўммаи</td>
                    <td scope="col">Тулов тури</td>
                    <td scope="col">Вакти</td>
                    <td scope="col">Изох</td>
                  </tr>
                </thead>
                {rashod?.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.party}</td>
                        <td>{item?.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                        <td>{item?.type}</td>
                        <td>{item?.created_date} $</td>
                        <td>{item?.comment} $</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <h1>Бошка харажатлар</h1>
            <div className="register-table-box table-responsive p-0">
              <table className="table table-striped table-hover text-center  m-0">
                <thead>
                  <tr>
                    <td scope="col">T/R</td>
                    <td scope="col">Партия рақами</td>
                    <td scope="col">Сўммаи</td>
                    <td scope="col">Тулов тури</td>
                    <td scope="col">Вакти</td>
                    <td scope="col">Изох</td>
                  </tr>
                </thead>
                {rashod?.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.party}</td>
                        <td>{item?.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                        <td>{item?.type}</td>
                        <td>{item?.created_date} $</td>
                        <td>{item?.comment} $</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height: 450 || 'auto',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};
