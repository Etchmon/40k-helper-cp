import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="landing-header">
          In the grim darkness of the far future there is only war...
        </h1>
      </header>
      <main>
        <Button variant="default" size="default">
          Start Game
        </Button>
      </main>
    </div>
  );
}

export default App;
