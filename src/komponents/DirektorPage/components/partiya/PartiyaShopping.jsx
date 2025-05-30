import { Box, Fade, Modal } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Backdrop from '@mui/material/Backdrop';
import { PaginationContainer } from '../tables/PaginationStyle';
import instance from '../../../../baseUrl';

import SelectComponent from './SelectComponent';
export default function PartiyaShopping() {
  const [hide, setHide] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState();
  const [reportList, setReportList] = useState([]);


  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
 
  const handlePagination = async (count) => {
    const { selected } = count;
    let offset = 10 * selected;
    let response = await instance.get('report/income/', {
      params: {
        limit: 20,
        offset: offset,
      },
    });
    setReportList(response.data.results);
  };
  const getReportList = async () => {
    try {
      const res = await instance.get('report/income/');
      if (res.status == 200) {
        setReportList(res.data.results);
        setCount(res.data.count);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getReportList();
  }, []);
  return (
    <div className="adding-staff-box adding-staff">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-primary btn-plus" onClick={() => setHide(!hide)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div
        className={hide ? 'form-box m-0 toggle' : 'form-box m-0 '}
        style={hide ? { height: '35vh' } : {}}
      >
        <form>
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <select value={''} name="warehouse">
                <option selected hidden>
                  Омбор
                </option>
              </select>
              <select value={''} name="provider">
                <option selected hidden>
                  Провайдер
                </option>
              </select>
              <SelectComponent />
            </div>
            <div className="col-md-4 col-lg-4">
              <input type="text" name="price" placeholder="Махсулот таннархи (долларда)" />
              <button className="btn btn-primary" type="submit">
                {true ? 'Таҳрирлаш' : 'Тасдиқлаш'}
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
              <td scope="col">Маҳсулот номи</td>
              <td scope="col">Келиш сони</td>
              <td scope="col">Факт сони</td>
              <td scope="col">Келиш нархи</td>
              <td scope="col">Ҳаражат сумма</td>
              <td scope="col">Таннархи</td>
              <td scope="col">Жами сумма</td>
              <td scope="col">Партй</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          {reportList.map((reports, index) => {
            const {
              id,
              income_count,
              fakt_count,
              income_price,
              expanse,
              cost,
              total_price,
              party,
              product,
            } = reports;
            return (
              <tbody key={id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{product?.name}</td>
                  <td>{income_count}</td>
                  <td>{fakt_count}</td>
                  <td>{income_price}</td>
                  <td>{expanse} $</td>
                  <td>{cost} $</td>
                  <td>{total_price} $</td>
                  <td>{party === null ? '-' : party}</td>
                  <td>
                    <i className="fas fa-edit"></i>
                    <i className="fas fa-trash"></i>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <h3 className="h2 text-white mt-3 float-right">Жами:$</h3>
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
                {[]?.map((item, index) => {
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
                {[]?.map((item, index) => {
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
