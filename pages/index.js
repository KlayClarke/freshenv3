import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <h1 className="text-4xl max-w-4xl text-center text-blue-500">
        Whether you are a customer searching for a new hairstylist or a
        hairstylist searching for new customers, freshen is the answer
      </h1>
      <div className="flex gap-5">
        <a
          href="/join"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-500 rounded"
        >
          Create New Account
        </a>
        <a
          href="/login"
          className="bg-white hover:bg-gray-50 text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
        >
          Log In Using Existing Account
        </a>
      </div>
    </div>
  );
}
