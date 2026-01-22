import React from "react";

export type ProfilePropsT = {
  user: string;
};

class ProfilePageClass extends React.Component<ProfilePropsT> {
  showMessage = () => {
    alert("Followed " + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}

export default ProfilePageClass;
