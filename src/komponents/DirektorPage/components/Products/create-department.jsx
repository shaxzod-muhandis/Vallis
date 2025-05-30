import React, { Component } from "react";
import instance from "../../../../baseUrl";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { PaginationContainer } from "../tables/PaginationStyle";
import ReactPaginate from "react-paginate";
class CreateDepartment extends Component {
  state = {
    name: "",
    departmentList: [],
    btn_type: "Қўшиш",
    update: false,
    table_update: false,
    updateData: false,
    count:0
  };
  componentDidMount() {
    this.getDepartmentList();
  }

  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getDepartmentList();
      this.setState({ updateData: false });
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlePagination = async (count) => {
    const { selected } = count;
    let offset = 10 * selected;
    let response = await instance.get("/product/department-list/", {
      params: {
        limit: 20,
        offset: offset,
      },
    });
    this.setState({
      departmentList: response.data.results,
    });
  };

  getDepartmentList = async () => {
    let departmentList = await instance.get(
      "/product/department-list/"
    );
    this.setState({
      departmentList: departmentList.data.results,
      count:departmentList.data.count
    });
  };

  ceateDepartment = (event) => {
    event.preventDefault();
    const url = "/product/department-list/";
    const { name } = this.state;
    instance.post(url, { name }).then((data) =>
      this.setState((prevState) => ({
        departmentList: [
          ...prevState.departmentList,
          {
            ...data.data,
          },
        ],
      }))
    );
    this.setState({ name: "" });
  };

  onDelete = (e) => {
    const url = `/product/department-detail/`;
    instance.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          departmentList: this.state.departmentList.filter(
            (data) => data.id != e
          ),
        });
      }
    });
  };

  onDeleteAlert = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => this.onDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };

  onEdit = (id) => {
    this.setState({ id });
    const url = "/product/department-detail/";
    instance.get(url + id).then((response) => {
      this.setState({
        name: response.data.name,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    const url = `/product/department-detail/${this.state.id}/`;
    const { name } = this.state;
    instance.put(url, { name }).then((data) => {
      this.setState(
        {
          updateData: true,
          btn_type: "Қўшиш",
          update: false,
          name: "",
          creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
        },
        () =>
          setTimeout(() => {
            this.setState({
              creditial: "",
            });
          }, 3000)
      );
    });
  };

  render() {
    let count = 0;
    // console.log(this.state.updateData);
    return (
      <div className="solary-box">
        <h4 className="mb-3">Департмент Қўшиш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.ceateDepartment}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
          />
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">Т/Р</td>
                <td scope="col">Номи</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.departmentList.map((data) => {
                count++;
                if (data !== undefined) {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.name}</td>
                      <td>
                        <i
                          className="fas fa-edit"
                          onClick={this.onEdit.bind(this, data.id)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={this.onDeleteAlert.bind(this, data.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                } else {
                  return <h1>Loading...</h1>;
                }
              })}
            </tbody>
          </table>
          <PaginationContainer>
            <ReactPaginate
              breakLabel="..."
              nextLabel="&raquo;"
              onPageChange={this.handlePagination}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(this.state.count / 10)}
              previousLabel="&laquo;"
              renderOnZeroPageCount={null}
            />
          </PaginationContainer>
        </div>
      </div>
    );
  }
}

export default CreateDepartment;
