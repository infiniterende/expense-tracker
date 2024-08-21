"use client";

import React, { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import Select from "react-select";
import prisma from "@/prisma/client";

const AddExpenseForm = () => {
  const [formData, setFormData] = useState<any>();
  const [categories, setCategories] = useState<any>();

  const getCategories = async () => {
    const response = await prisma.category.findMany();
    setCategories(response);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const options = categories.map((category: any) => ({
    value: category.id,
    label: category.title,
  }));
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    console.log(data);
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-TYpe": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }
      const resData = await response.json();
      console.log(resData.body);
    } catch (error) {
      console.log(error);
    }
  };

  return;
  <div className="w-full max-w-xl mx-auto">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-teal-500 text-lg font-bold mb-2"
          htmlFor="vendor"
        >
          Vendor
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="frm-email"
          type="text"
          name="vendor"
          required
          onChange={handleChange}
        />
      </div>
      <div className="flex">
        <div className="mb-6 w-6/12">
          <label
            className="block text-teal-500 text-lg font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            name="description"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6 mx-4 w-6/12">
          <label
            className="block text-teal-500 text-lg font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="date"
            name="date"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="message block mb-4">
        <Select options={options} onChange={handleChange} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          type="submit"
          className="rounded-lg bg-teal-500 text-white py-2 px-6"
        >
          Submit
        </button>
      </div>
    </form>
  </div>;
};

export default AddExpenseForm;
