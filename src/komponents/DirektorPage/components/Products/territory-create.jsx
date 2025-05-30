import axios from "axios";
import React, { Component } from "react";
import instance from "../../../../baseUrl";
import DataTable from "../tables/dataTable";
class CreateTerritory extends Component {
  state = {
    name: "",
    territoryList: [],
    btn_type: "Қўшиш",
    update: false,
    carLineList: [],
    agentList: [],
    agent: "",
    agent_name: "",
    car: "",
    car_name: "",
    id: "",
    updateTable: false,
  };
  componentDidMount() {
    this.getAgentList();
    this.getCarLine();
  }
  setFilterCar = (e) => {
    const { value } = e.target;
    this.setState({car:value});
  };
  setFilterAgent = (e) => {
    const { value } = e.target;
    this.setState({agent:value})
  
  };
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getAgentList = async () => {
    let agentList = await instance.get("/user/agent-list/");
    this.setState({
      agentList: agentList.data,
    });
  };
  getCarLine = async () => {
    let carLineList = await instance.get("/client/car-list-read/");
    this.setState({
      carLineList: carLineList.data.results,
    });
  };
  createTerritory = (event) => {
    event.preventDefault();
    const url = "/client/territory-list/";
    const { name, car, agent } = this.state;
    instance.post(url, { name, car, agent });
    this.setState({ name: "", car: "", agent: "", updateTable: !this.state.updateTable });
  };

  onEdit = (id) => {
    this.setState({ id });
    const url = "/client/territory-detail/";
    instance.get(url + id).then((response) => {
      this.setState({
        car: response.data.car.id,
        car_name: response.data.car.name,
        agent: response.data.agent.id,
        agent_name: response.data.agent.first_name,
        name: response.data.name,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/client/territory-detail/${this.state.id}/`;
    const { name, car, agent } = this.state;
    instance.put(url, { name, car, agent }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          update: false,
          updateTable: true,
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
  break = (childData) => {
    this.setState({ updateTable: childData });
  };
  render() {
    const { agentList, carLineList } = this.state;
    const name = "territoryList";
    const headers = ["Т/Р", "Номи", "Машрут номи", "Агент исми", "Таҳрирлаш"];
    console.log(this.props);
    return (
      <div className="solary-box">
        <div className="filter-box mb-4">
          <h4 style={{fontSize:"20px"}}>Ҳудуд Қўшиш</h4>
          <select onChange={this.setFilterCar}>
            <option value="all">Барча Машрут</option>
            {carLineList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
          <select onChange={this.setFilterAgent}>
            <option value="all">Барча Агент</option>
            {agentList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.first_name + " " + list.last_name}
                </option>
              );
            })}
          </select>
        </div>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createTerritory}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Территорй номи"
            onChange={this.handleInput}
          />
          <select onChange={this.handleInput} name="car">
            <option value={this.state.car}>
              {"Жорий Машрут " + this.state.car_name}
            </option>
            {carLineList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
          <select onChange={this.handleInput} name="agent">
            <option value={this.state.agent}>
              {"Жорий Агент  " + this.state.agent_name}
            </option>
            {agentList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.first_name + " " + list.last_name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>

        <DataTable
          name={name}
          headers={headers}
          onEdit={this.onEdit}
          url={"/client/territory-list/"}
          deleteUrl={"/client/territory-detail/"}
          updateTable={this.state.updateTable}
          break={this.break}
          agent={this.state.agent}
          car={this.state.car}
        />
      </div>
    );
  }
}

export default CreateTerritory;
