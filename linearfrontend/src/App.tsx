import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Tailwind CSS v4 + shadcn/ui
          </h1>
          <p className="text-xl text-slate-300">✅ Setup successful! 🎉</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Button Component Test
          </h2>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg">Default Button</Button>
            <Button variant="secondary" size="lg">
              Secondary
            </Button>
            <Button variant="outline" size="lg">
              Outline
            </Button>
            <Button variant="ghost" size="lg">
              Ghost
            </Button>
            <Button variant="destructive" size="lg">
              Destructive
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="text-sm text-slate-400 space-y-2">
          <p>✅ TypeScript configured</p>
          <p>✅ React 19.2.0 running</p>
          <p>✅ Tailwind CSS v4 with Vite plugin</p>
          <p>✅ shadcn/ui components ready</p>
        </div>
      </div>
    </div>
  );
}

export default App;
