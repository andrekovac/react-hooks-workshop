import { useState } from "react";
import ProfilePageFunction from "./components/ProfilePageFunction";
import ProfilePageClass from "./components/ProfilePageClass";
import ProfilePageClassFixed from "./components/ProfilePageClassFixed";
import './ClassVsFunctionPage.css';

const ClassVsFunctionPage = () => {
  const [user, setUser] = useState<string>("Andre");

  const profiles: Record<string, string> = {
    Andre: "https://randomuser.me/api/portraits/men/35.jpg",
    Sophie: "https://randomuser.me/api/portraits/women/88.jpg",
    Lisa: "https://randomuser.me/api/portraits/women/11.jpg",
  };

  return (
    <div className="class-vs-fn-page">
      <header>
        <h1>Function vs. Class Components</h1>
        <p>Comparing how closures capture props differently.</p>
      </header>

      <div className="controls">
        <label>
          <b>Choose profile to view: </b>
          <select value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="Andre">André</option>
            <option value="Sophie">Sophie</option>
            <option value="Lisa">Lisa</option>
          </select>
        </label>
      </div>

      <div className="profile-header">
        <img alt={user} src={profiles[user]} />
        <h2>
          Welcome to <span className="user-name">{user}</span>’s profile!
        </h2>
      </div>

      <div className="info-box">
        <h3>Try this experiment:</h3>
        <ol>
          <li>Click the "Follow" button on any of the examples below.</li>
          <li>Quickly, within 3 seconds, change the profile to someone else using the dropdown.</li>
          <li>Observe the `alert()` message that pops up. Which user does it say you followed?</li>
        </ol>
      </div>

      <div className="comparison-grid">
        <div className="comparison-column">
          <h3>Function Component</h3>
          <p>
            <ProfilePageFunction user={user} />
          </p>
          <div className="explanation">
            <p><strong>Behavior:</strong> Correctly alerts the user you clicked "Follow" on, thanks to closures capturing the `user` prop from that specific render.</p>
          </div>
        </div>
        <div className="comparison-column">
          <h3>Class Component (Buggy)</h3>
          <p>
            <ProfilePageClass user={user} />
          </p>
          <div className="explanation">
            <p><strong>Behavior:</strong> Incorrectly alerts the *current* user. It reads from `this.props.user` after the timeout, which has already changed.</p>
          </div>
        </div>
        <div className="comparison-column">
          <h3>Class Component (Fixed)</h3>
          <p>
            <ProfilePageClassFixed user={user} />
          </p>
          <div className="explanation">
            <p><strong>Behavior:</strong> Correctly alerts the original user. The fix involves reading `this.props.user` *before* the timeout and passing it into the timeout's callback.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassVsFunctionPage;
