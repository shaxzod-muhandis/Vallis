 handlePagination = async (count) => {
  let offset = this.state.limit * (count - 1);
  let response = await instance.get(this.props.url, {
    params: {
      limit: this.state.limit,
      offset: offset,
    },
  });
  this.setState({
    orderList: response.data,
    next: response.data.next,
    previous: response.data.previous,
  });
};

  handlePages = () => {
    let count = Math.ceil(this.state.count / this.state.limit);
    return Array.from(Array(count), (e, i) => {
      return (
        <li key={i} className="page-item">
          <Link
            className="page-link"
            onClick={() => this.handlePagination(i + 1)}
            to="#"
          >
            {i + 1}
          </Link>
        </li>
      );
    });
  };
  handleNext = async () => {
    let response = await instance.get(this.state.next);
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handlePrevious = async () => {
    let response = await instance.get(this.state.previous);
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };

<div className="pagination-container">
<ul className="pagination">
  {this.state.previous === null ? (
    <div></div>
  ) : (
    <li className="page-item">
      <Link
        className="page-link"
        to="#"
        onClick={this.handlePrevious}
        aria-label="Previous"
      >
        <span aria-hidden="true">&laquo;</span>
      </Link>
    </li>
  )}

  {this.handlePages()}
  {this.state.next === null ? (
    <div></div>
  ) : (
    <li className="page-item">
      <Link
        className="page-link"
        to="#"
        onClick={this.handleNext}
        aria-label="Next"
      >
        <span aria-hidden="true">&raquo;</span>
      </Link>
    </li>
  )}
</ul>
</div>