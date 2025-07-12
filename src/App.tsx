import { Route, Routes } from "react-router";
import { About, AdminPanel, Home, Login, SignUp } from "./pages";
import EditProblem from "./components/EditProblem";
import SubmitCode from "./components/SubmitCode";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
const App = () => {
  return (
    <ThemeProvider>
      <div className=" relative z-0 dark:selection:bg-white dark:selection:text-black selection:bg-black selection:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/edit/:slug" element={<EditProblem />} />
          <Route path="/submit" element={<SubmitCode />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Toaster/>
      </div>
    </ThemeProvider>
  );
};

export default App;
