import React from 'react';
import ReactDOM from 'react-dom';


class Title extends React.Component{
  render(){
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

class UserInput extends React.Component{

  onAddClick(){

    let eUserName = ReactDOM.findDOMNode(this.refs.username);
    let username = eUserName.value;
    eUserName.value = '';

    this.props.handleAddUser(username);
  }

  onDeleteClick(){

    let eUserName = ReactDOM.findDOMNode(this.refs.username);
    let username = eUserName.value;
    eUserName.value = '';

    this.props.handleDeleteUser(username);
  }

  render(){
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" type="text" id="sample3" ref="username" placeholder="facebook" />
          <label className="mdl-textfield__label" htmlFor="sample3">Github user</label>
        </div>
        <button onClick={this.onAddClick.bind(this)} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
          Add
        </button>
        <button onClick={this.onDeleteClick.bind(this)} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
          Delete
        </button>
      </div>
    );
  }
}



class User extends React.Component{
  onDeleteUser(e){
    console.log(e.target.id)
  }
  render(){
    return(
      <span className="mdl-chip mdl-chip--contact mdl-chip--deletable">
        <a href={this.props.user.html_url} ><img className="mdl-chip__contact" src={this.props.user.avatar_url} /> </a>
        <span className="mdl-chip__text">{this.props.user.name}</span>
        <span className="mdl-chip__action"><i id={this.props.user.login} onClick={this.onDeleteUser.bind(this)} className="material-icons">cancel</i></span>
      </span>
    );
  }
}



class ListUser extends React.Component{

  render(){
    let users = this.props.users.map((user,id) => <User key={id} user={user} />);
    return(
      <div className="mdl-cell mdl-cell--12-col">
          {users}
      </div>
    );
  }
}


class App extends React.Component{

  constructor() {
    super();

    this.state = {
      users: []
    }
    
  }

  addNewUser(username){
    let that = this;
    $.get("https://api.github.com/users/"+username,function(data){
      var users = that.state.users;
      users.push(data);
      that.setState({users:users});
    }).fail(function() {
      alert( "Data not found !" );
    })
  }

  deleteUser(username){

    let users = this.state.users;
    
    for(var i =0;i<users.length; i++){
      if(users[i].login === username){
        users.splice(i,1);
        break;
      }
    }
    this.setState({users:users});
  }

  render(){
    return (
      <div className="mdl-grid">
        <Title title="Github user chip" /> 
        <UserInput handleAddUser={this.addNewUser.bind(this)} handleDeleteUser={this.deleteUser.bind(this)} />
        <ListUser users={this.state.users} />
      </div>
    );
  }
}


export default App;
