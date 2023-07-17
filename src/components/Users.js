import React, { Component } from 'react'
import axios from 'axios';
export default class Users extends Component {
  constructor(props){
    super(props)
    this.state = {
        UsersList:[],
        Search:"",
    }
  }

  apiData=()=>{
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((response) => {
        this.setState({
          UsersList: response.data,
        });
      });
  }
  componentDidMount(){
    this.apiData()
  }

  
    render() {
      const handleSearch = (e) => {
        this.setState({
          UsersList: this.state.UsersList.filter((Product) =>
            Product.fullName
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ),
        });
      };
      return (
        <div className="PageWrapper">
        {console.log(this.state)}
        <h1 className="MainHeading">Users</h1>
        <div className>
          <div className="UserSearchbox">
            <input
            onChange={handleSearch}
              className="SearchBox"
              type="search"
              placeholder="Search by Name"
              id="searchBox"
            />
            <input
              type="reset"
              id="reset"
              className="Button"
              defaultValue="Reset"
            />
          </div>
          <div>
            <table className="OrderTable">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>User Avatar</th>
                  <th>Full Name</th>
                  <th style={{ minWidth: "100px" }}>DoB</th>
                  <th>Gender</th>
                  <th>Current Location</th>
                </tr>
              </tbody>
              <tbody id="User-data">
                {this.state.UsersList?.length > 0  && this.state.UsersList.map((user)=>{
                  return(
                  <tr class="TableRow">
            <td className="SecondaryText">{user.id}</td>
            <td className="PrimaryText">
                <img
                src={user.profilePic}
                alt="Profile Pic"
                />
            </td>
            <td className="SecondaryText">
                {user.fullName}
            </td>
            <td className="PrimaryText">{user.dob}</td>
            <td className="SecondaryText">{user.gender}</td>
            <td className="SecondaryText">
                {user.currentCity} {user.currentCountry}
            </td>
            </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
