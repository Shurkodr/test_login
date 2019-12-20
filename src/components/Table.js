import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react'

class Table extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: null,
      wantDelete: false,
      idToDelete: null,
      passwordServer: '123456',
      passwordUser: '',
    };
    this.loadData = this.loadData.bind(this);
    this.wantTodeleteElement = this.wantTodeleteElement.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.doNotDelete = this.doNotDelete.bind(this);
  }

  async loadData() {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink'
    );
    const contentObj = await response.json();
    const contentArr = contentObj.drinks;
    const content = contentArr.map(item => item.strDrink);

    this.setState({
      content, isLoading: false,
    });
  }

  componentDidMount() {
    this.loadData();
  }

  wantTodeleteElement(action) {
    const toDelete = action.target.value;
    this.setState({ wantDelete: true, idToDelete: toDelete });
  }

  changePassword (action) {
    const pass = action.target.value;
    this.setState({ passwordUser: pass });
  }

  deleteItem(action) {
    action.preventDefault();
    const { passwordServer, passwordUser } = this.state;

    if (passwordServer === passwordUser) {
      this.setState((prevState) => {
        return (
          {
            content: prevState.content.filter(item => item !== prevState.idToDelete),
            wantDelete: false,
            passwordUser: ''
          }
        );
      });
    } else {
      this.doNotDelete();
    }
  }

  doNotDelete(){
    this.setState({wantDelete: false, passwordUser: ''});
  }


  render() {
    let { isLoading } = this.state;

    if (isLoading) {
      return(
          <div className="ui active centered inline loader"></div>
      );
    } else {
      const displaySubmitFormToDelete = { "display": "block"};
      const opasityWhenSubmitToDelete = { "opacity": "0.3"}
      const { content, wantDelete, passwordUser } = this.state;
      return (
        <>
          {
            content.map(item =>
              <div style={wantDelete ? opasityWhenSubmitToDelete : {}} key={item}>
                {item}
                <button value={item} onClick={this.wantTodeleteElement} type="button">Delete</button>
              </div>
            )
          }
          <form className="submit-form" onSubmit={this.deleteItem} style={wantDelete ? displaySubmitFormToDelete : {}}>
            <span>Please, submit to delete</span>
            <input  onChange={this.changePassword} type="password" value={passwordUser}/>
            <button onClick={this.deleteItem} type="submit">OK</button>
          </form>
        </>
      );
    }
  }
}

export default Table;
