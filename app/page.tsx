import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpenseTable from "./components/ExpenseTable";

export default function Home() {
  return (
    <div className="container mx-auto px-32">
      <nav className="flex">
        <h1 className="pt-8 text-2xl font-extrabold text-slate-600">
          <span className="text-teal-700">smart</span>financier
        </h1>
      </nav>
      <i className="fab fa-chart-line"></i>

      <h1 className="pt-24 text-4xl font-extrabold text-slate-800 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 mx-auto my-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
        Managing <span className="text-teal-600">finances</span> has never been
        easier
      </h1>
      <h3 className="text-center text-2xl p-4">
        {" "}
        Track your expenses and export Excel sheets
      </h3>
      <ExpenseTable />
    </div>
  );
}
