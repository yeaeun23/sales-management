import React, { Component } from 'react';
import Customer from '../components/Customer';
import CustomerAdd from '../components/CustomerAdd';
import '../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Table from 'react-bootstrap/Table';

class TGPList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.tgp_id} id={c.tgp_id} name={c.name} status={c.status} update_time={c.update_time} />
      });
    }

    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <IconButton className="menuButton" color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className="title" variant="h6" color="inherit" noWrap>
              Sales Master
            </Typography>
            <div className="grow" />
            <div className="search">
              <div className="searchIcon">
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                className="inputRoot"
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>

        <div className="paper">
          <Table striped hover>
            <colgroup>
              <col width="10%" />
              <col width="30%" />
              <col width="15%" />
              <col width="25%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }} >No</th>
                <th>TGP</th>
                <th style={{ textAlign: 'center' }} >상태</th>
                <th style={{ textAlign: 'center' }} >수정한 날짜</th>
                <th style={{ textAlign: 'center' }} ></th>
                <th style={{ textAlign: 'center' }} ><CustomerAdd stateRefresh={this.stateRefresh} /></th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers ?
                filteredComponents(this.state.customers) :
                <tr>
                  <td colSpan="6" align="center">
                    <CircularProgress className="progress" variant="determinate" value={this.state.completed} />
                  </td>
                </tr>
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default TGPList;
//export default withStyles(styles)(TGPList);