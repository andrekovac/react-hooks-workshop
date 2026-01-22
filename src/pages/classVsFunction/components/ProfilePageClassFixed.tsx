import React from "react";

export type ProfilePropsT = {
  user: string;
};

class ProfilePageClassFixed extends React.Component<ProfilePropsT> {
  showMessage = (user: string) => {
    alert("Followed " + user);
  };

  handleClick = () => {
    const user = this.props.user;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}

export default ProfilePageClassFixed;
