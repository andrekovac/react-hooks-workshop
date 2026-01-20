const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the React Hooks Workshop</h1>
      
      <section>
        <h2>Definition of React Hooks</h2>
        
        <p>
          React hooks give you the ability to use stateful logic or write lifecycle-dependent code inside functional components.
        </p>
        
        <p>
          It's not really easy to summarize the concept of React hooks. Let's look at some quotes:
        </p>
        
        <h3>React Hooks definitions</h3>
        
        <blockquote>
          <p>
            You "use" React features at the top of your component similar to how you "import" modules at the top of your file.
          </p>
          <footer>Simple definition.</footer>
        </blockquote>
        
        <blockquote>
          <p>
            Hooks are functions, but it's helpful to think of them as unconditional declarations about your component's needs.
          </p>
          <footer>
            Just as JSX code is a possibly conditional declaration about your UI tree, React hooks are unconditional declarations about the component's logic.
          </footer>
        </blockquote>
        
        <p>
          <em>Both above quotes taken from <a href="https://beta.reactjs.org/learn/state-a-components-memory" target="_blank" rel="noopener noreferrer">the new React docs</a>.</em>
        </p>
        
        <blockquote>
          <p>
            React hooks are the preferred way to touch React's internals.
          </p>
          <footer>
            This quote infers that inside of React hooks you have the ability to access React features in the core, whereas without them you are merely having control over variables which are detached from the React lifecycle. The only "React" feature you use is to declare the desired UI to render.
          </footer>
        </blockquote>
        
        <h3>Dependency injection?</h3>
        
        <p>
          React hooks are a form of dependency injection of state (or other hook related functionality).
        </p>
        
        <h3>Notes</h3>
        
        <ul>
          <li>
            Hooks can only be at the top-level of your component.
            <ul>
              <li>
                Particularly they cannot be called conditionally. That is because on each render, React requires the order of hooks to be the same.
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
