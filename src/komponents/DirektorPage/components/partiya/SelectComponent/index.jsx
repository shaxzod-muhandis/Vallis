import React from 'react';
import { useEffect } from 'react';
import instance from '../../../../../baseUrl';
import { useState } from 'react';
import Select from 'react-select';
const SelectComponent = () => {
  const [agentList, setAgentList] = useState([]);
  console.log(agentList);
  const getOtions = async () => {
    try {
      const res = await instance.get(
        'https://backend.classo.uz/a1/product/product-list/?limit=10000',
      );
      if (res.status == 200) {
        setAgentList(res?.data.products);
      }
    } catch (error) {}
  };
  const newArr = agentList?.map(({ name, id }) => ({
    label: name,
    id: id,
  }));
  const allOption = {
    label: 'Барчасини танлаш',
    value: '*',
  };
  const addKey = newArr?.map((item) => Object.assign(item, { value: item?.label }));
  useEffect(() => {
    getOtions();
  }, []);
  return (
    <>
      <Select
        className="react-select"
        options={[allOption, ...addKey]}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#707491',
            primary: '#36394c',
          },
        })}
      />
    </>
  );
};

export default SelectComponent;
