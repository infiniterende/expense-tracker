"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

  const calculateTotal = (expenses: any) => {
    let total = expenses.reduce((acc: any, expense: any) => {
      acc += expense.amount;
      return acc;
    }, 0);
    return total;
  };

  const calculatedTotal = useMemo(() => calculateTotal(expenses), [expenses]);
  console.log(calculatedTotal);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/expenses");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse JSON here
      console.log("Data received:", data);
      setExpenses(data.expenses); // Return parsed data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse JSON here
      console.log("Data received:", data);
      setCategories(data.categories); // Return parsed data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };

  const categoryMap = categories.reduce((map: any, category: any) => {
    map[category.id] = category.title;
    return map;
  }, {});

  console.log(categoryMap);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div className="text-center m-8">
      <Link href="/expense-form">
        <button className="bg-teal-600 text-white font-medium p-4 rounded-xl">
          Add New Expense{" "}
        </button>
      </Link>

      <Table className="my-8">
        <TableCaption>Past Expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Vendor</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense: any) => (
            <TableRow>
              <TableCell className="font-medium">
                {expense.date.substring(5, 7)}/{expense.date.substring(8, 10)}/
                {expense.date.substring(0, 4)}
              </TableCell>
              <TableCell>{expense.vendor}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{categoryMap[expense.categoryId]}</TableCell>
              <TableCell>${parseFloat(expense.amount).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium"></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="font-bold">Total</TableCell>
            <TableCell>${calculatedTotal.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
