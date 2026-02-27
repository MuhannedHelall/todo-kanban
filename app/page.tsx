import Board from "./_components/Board";
import Navbar from "./_components/Navbar";
import TanStackProvider from "./_providers/TanStackProvider";

export default function Home() {
  return (
    <TanStackProvider>
      <Navbar />
      <Board />
    </TanStackProvider>
  );
}
